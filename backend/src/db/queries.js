import { db } from "./index.js";
import {
  users,
  product,
  comment,
  newUser,
  newProduct,
  newComment,
} from "./schema.js";
import { eq } from "drizzle-orm";

//User queries

export const createUser = async (data) => {
  const [user] = await db.insert(users).values(data).returning();
  return user;
};

export const getUserById = async (id) => {
  return db.query.users.findFirst({ where: eq(users.id, id) });
};

export const updateUser = async (id, data) => {
  const [user] = await db.update(users).set(data).where(eq(users.id, id));
  return user;
};

export const upsertUser = async (data) => {
  const existingUser = await getUserById(data.id);
  if (existingUser) {
    return updateUser(data.id, data);
  } else {
    return createUser(data);
  }
};

//Product queries

export const createProduct = async (data) => {
  const [product] = await db.insert(product).values(data).returning();
  return product;
};

export const getAllProducts = async () => {
  return db.query.product.findMany({
    with: {
      user: true,
      orderBy: (product, { desc }) => [desc(product.createdAt)],
    },
  });
};

export const getProductById = async (id) => {
  return db.query.product.findFirst({
    where: eq(product.id, id),
    with: { user: true },
    orderBy: (product, { desc }) => [desc(product.createdAt)],
  });
};

export const getProductsByUserId = async (userId) => {
  return db.query.product.findMany({
    where: eq(product.userId, userId),
    with: { user: true },
    orderBy: (product, { desc }) => [desc(product.createdAt)],
  });
};

export const updateProduct = async (id, data) => {
  const [product] = await db
    .update(product)
    .set(data)
    .where(eq(product.id, id));
  return product;
};

export const deleteProduct = async (id) => {
  const [product] = await db
    .delete(product)
    .where(eq(product.id, id))
    .returning();
  return product;
};

//Comment queries

export const createComment = async (data) => {
  const [comment] = await db.insert(comment).values(data).returning();
  return comment;
};

export const getCommentById = async (id) => {
  return db.query.comment.findFirst({
    where: eq(comment.id, id),
    with: { user: true },
  });
};

export const updateComment = async (id, data) => {
  const [comment] = await db
    .update(comment)
    .set(data)
    .where(eq(comment.id, id));
  return comment;
};

export const deleteComment = async (id) => {
  const [comment] = await db
    .delete(comment)
    .where(eq(comment.id, id))
    .returning();
  return comment;
};
