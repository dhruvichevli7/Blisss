import { useEffect, useState } from "react";
import axios from "axios";

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  if (!isOpen) return null;

  const titleMap = {
    login: "Welcome Back",
    signup: "Create Account",
    forgot: "Reset Password",
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔥 STOPS PAGE REFRESH

    try {
      if (mode === "signup") {
        await axios.post("http://localhost:5000/api/auth/signup", {
          username,
          email,
          password,
        });

        alert("Signup successful. Please login.");
        setMode("login");
        return;
      }

      if (mode === "login") {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });

        localStorage.setItem("token", res.data.token);

        if (onSuccess) {
          onSuccess();
        } else {
          onClose();
        }
        return;
      }

      if (mode === "forgot") {
        await axios.post("http://localhost:5000/api/auth/forgot-password", {
          email,
        });

        alert("Reset link sent");
        setMode("login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          className="bg-main w-full max-w-xl min-h-[420px] p-6 rounded-lg shadow-xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-xl leading-none"
          >
            X
          </button>
          <h2 className="text-3xl font-medium text-center mb-8">
            {titleMap[mode]}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 mx-4"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 mx-4"
              required
            />

            {(mode === "login" || mode === "signup") && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 mx-4"
                required
              />
            )}

            <button
              type="submit"
              className="bg-brown text-main w-2/3 mx-auto py-2 mt-4"
            >
              {mode === "login" && "Login"}
              {mode === "signup" && "Sign Up"}
              {mode === "forgot" && "send Reset Link"}
            </button>
          </form>

          <div className="text-sm text-center mt-6 space-y-2">
            {mode === "login" && (
              <>
                <button
                  type="button"
                  className="underline mb-4"
                  onClick={() => setMode("forgot")}
                >
                  Forgot Password?
                </button>

                <p>
                  Don't have an account?
                  <button
                    type="button"
                    className="underline ml-1"
                    onClick={() => setMode("signup")}
                  >
                    Sign Up
                  </button>
                </p>
              </>
            )}

            {mode === "signup" && (
              <p>
                Already have an account?
                <button
                  type="button"
                  className="underline ml-1"
                  onClick={() => setMode("login")}
                >
                  Login
                </button>
              </p>
            )}

            {mode === "forgot" && (
              <button
                type="button"
                className="underline"
                onClick={() => setMode("login")}
              >
                Back to Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
