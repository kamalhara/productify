import { getAuth } from "@clerk/express";
import * as queries from "../db/queries.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await queries.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({
      error: "Failed to get products",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await queries.getProductById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({
      error: "Failed to get product",
    });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const products = await queries.getProductsByUserId(userId);

    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({
      error: "Failed to get products",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl) {
      return res
        .status(400)
        .json({ error: "Title, description and image url are required" });
    }

    const product = await queries.createProduct({
      title,
      description,
      imageUrl,
      userId,
    });

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({
      error: "Failed to create product",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const id = req.params;

    const { title, description, imageUrl } = req.body;

    const existingProduct = await queries.getProductById(id);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (existingProduct.userId !== userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!title || !description || !imageUrl) {
      return res
        .status(400)
        .json({ error: "Title, description and image url are required" });
    }

    const product = await queries.updateProduct(id, {
      title,
      description,
      imageUrl,
      userId,
    });

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({
      error: "Failed to update product",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const id = req.params;

    const existingProduct = await queries.getProductById(id);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (existingProduct.userId !== userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const product = await queries.deleteProduct(id);

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({
      error: "Failed to delete product",
    });
  }
};
