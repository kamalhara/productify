"use strict";

import express from "express";
import { ENV } from "./config/env.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();

app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ENV.FRONTEND_URL,
  }),
);
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Productify API - powered by PostgreSQL , drizzle ORM , clerk Auth",
    endPoint: {
      user: "/api/user",
      product: "/api/product",
      comment: "/api/comment",
    },
  });
});

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/comment", commentRoutes);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
