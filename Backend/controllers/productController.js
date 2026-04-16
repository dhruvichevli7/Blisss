import Product from "../models/Product.js";

//Get All Products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    }catch (error) {
        res.status(500).json({ error : error.message });
    }
};

//Get Singal Product
export const getProductsById = async (req, res) => {
    try {
        const productId = Number(req.params.id);
        const product = await Product.findOne({ productId });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    }catch (error) {
        res.status(500).json({ error : error.message });
    }
};

//Add New Product
export const addProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    }catch (error) {
        res.status(500).json({ error : error.message });
    }
};