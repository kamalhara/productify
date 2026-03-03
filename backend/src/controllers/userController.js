import { getAuth } from "@clerk/express";
import * as queries from "../db/queries.js";

export const syncUser = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { email, name, imageUrl } = req.body;

    if (!email || !name || !imageUrl) {
      return res
        .status(400)
        .json({ error: "Name, email and image url are required" });
    }
    const user = await queries.upsertUser({
      id: userId,
      email,
      name,
      imageUrl,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
