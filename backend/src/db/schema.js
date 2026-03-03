import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const product = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const comment = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  productId: text("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const userRelations = relations(user, ({ many }) => ({
  product: many(product),
  comment: many(comment),
}));

export const productRelations = relations(product, ({ one, many }) => ({
  comment: many(comment),
  user: one(user, { fields: [product.userId], references: [user.id] }),
}));

export const commentRelations = relations(comment, ({ one }) => ({
  product: one(product, {
    fields: [comment.productId],
    references: [product.id],
  }),
  user: one(user, { fields: [comment.userId], references: [user.id] }),
}));

export const User = user.$inferSelect;
export const newUser = user.$inferInsert;

export const Product = product.$inferSelect;
export const newProduct = product.$inferInsert;

export const Comment = comment.$inferSelect;
export const newComment = comment.$inferInsert;
