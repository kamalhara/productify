"use strict";

import express from "express";
import { ENV } from "./config/env.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();

// CORS configuration that works for local testing and Vercel deployment
const corsOptions = {
  origin: function (origin, callback) {
    const allowedPatterns = [
      /^http:\/\/localhost:\d+$/, // Allow any localhost port
      /^http:\/\/127\.0\.0\.1:\d+$/, // Allow 127.0.0.1
      /\.vercel\.app$/, // Allow any Vercel URL
      ENV.FRONTEND_URL, // Allow env-configured frontend URL
    ];

    if (
      !origin ||
      allowedPatterns.some((pattern) => {
        if (pattern instanceof RegExp) {
          return pattern.test(origin);
        }
        return origin === pattern;
      })
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

const PORT = process.env.PORT || ENV.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
