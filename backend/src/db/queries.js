import { db } from "./index.js";
import { user, product, comment } from "./schema.js";
import { eq } from "drizzle-orm";

//User queries

export const createUser = async (data) => {
  const [result] = await db.insert(user).values(data).returning();
  return result;
};

export const getUserById = async (id) => {
  return db.query.user.findFirst({ where: eq(user.id, id) });
};

export const updateUser = async (id, data) => {
  const [result] = await db
    .update(user)
    .set(data)
    .where(eq(user.id, id))
    .returning();
  return result;
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
  const [result] = await db.insert(product).values(data).returning();
  return result;
};

export const getAllProducts = async () => {
  return db.query.product.findMany({
    with: { user: true, comment: true },
    orderBy: (product, { desc }) => [desc(product.createdAt)],
  });
};

export const getProductById = async (id) => {
  return db.query.product.findFirst({
    where: eq(product.id, id),
    with: { user: true, comment: { with: { user: true } } },
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
  const [result] = await db
    .update(product)
    .set(data)
    .where(eq(product.id, id))
    .returning();
  return result;
};

export const deleteProduct = async (id) => {
  const [result] = await db
    .delete(product)
    .where(eq(product.id, id))
    .returning();
  return result;
};

//Comment queries

export const createComment = async (data) => {
  const [result] = await db.insert(comment).values(data).returning();
  return result;
};

export const getCommentById = async (id) => {
  return db.query.comment.findFirst({
    where: eq(comment.id, id),
    with: { user: true },
  });
};

export const updateComment = async (id, data) => {
  const [result] = await db
    .update(comment)
    .set(data)
    .where(eq(comment.id, id))
    .returning();
  return result;
};

export const deleteComment = async (id) => {
  const [result] = await db
    .delete(comment)
    .where(eq(comment.id, id))
    .returning();
  return result;
};
