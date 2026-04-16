import mongoose, { Types } from "mongoose";
import Counter from "./Counter.js";

const productSchema = new mongoose.Schema(
    {
        productId : {
            type : Number,
            unique: true,
        },
        name : {
            type : String,
            required : true,
        },

        price : {
            type : Number,
            required : true,   
        },

        images : [
            {
                type : String,
            }
        ],

        nutrition : {
            type : String,
            required : false,
        },

        description : {
            type : String,
            required : false,
        },
    },
    {
        timestamps: true
    }
);

//Auto Increment productIs before saving
productSchema.pre("save", async function (next) {
    if(this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { id : "productId" },
            { $inc : { seq: 1} },
            { new: true, upsert: true }
        );
        
        this.productId = counter.seq;
    }
    next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;