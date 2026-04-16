// import jwt from 'jsonwebtoken';
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {

//     const authHeader = req.headers.authorization;

//     if(!authHeader || !authHeader.startsWith("Bearer ")){
//         return res.status(401).json({ message: "Unauthorized, no token" });
//     }

//     try{
//         const token = authHeader.split(" ")[1];

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = await User.findById(decoded.userId).select("-password");

//         if (!req.user) {
//             return res.status(401).json({ message: "User not found" });
//         }

//         next();
        
//     }catch(err){
//         res.status(401).json({ message: "Invalid token" });
//     }
// };

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👇 THIS is the key line
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // now req.user._id exists
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid" });
  }
};
