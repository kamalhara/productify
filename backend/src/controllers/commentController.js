import { getAuth } from "@clerk/express";
import * as queries from "../db/queries.js";

export const createComment = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { content } = req.body;
    const { productId } = req.params;

    if (!content || !productId) {
      return res
        .status(400)
        .json({ error: "Content and product id are required" });
    }
    const product = await queries.getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const comment = await queries.createComment({
      content,
      productId,
      userId,
    });

    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({
      error: "Failed to create comment",
      err,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { commentId: id } = req.params;

    const existingComment = await queries.getCommentById(id);

    if (!existingComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (existingComment.userId !== userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const comment = await queries.deleteComment(id);

    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({
      error: "Failed to delete comment",
      err,
    });
  }
};
