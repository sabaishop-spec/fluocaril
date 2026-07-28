import { pgTable, serial, text, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  imageUrl: text('image_url'),
  category: text('category'),
  badge: text('badge'),
  categoryId: integer('category_id').references(() => categories.id),
  isFeatured: boolean('is_featured').default(false),
  status: text('status').default('Active'),
  shopeeUrl: text('shopee_url'),
  ingredients: text('ingredients'),
  productSpecifications: text('product_specifications'),
  usageInstructions: text('usage_instructions'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const productVariants = pgTable('product_variants', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  swatchColor: text('swatch_color').notNull(),
  imageUrl: text('image_url'),
  shopeeUrl: text('shopee_url'),
  isDefault: boolean('is_default').default(false),
  sortOrder: integer('sort_order').default(0),
  status: text('status').default('Active'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const productVariantsRelations = relations(productVariants, ({ one }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
}));

export const productDescriptionImages = pgTable('product_description_images', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  imageUrl: text('image_url').notNull(),
  altText: text('alt_text'),
  sortOrder: integer('sort_order').default(0),
  status: text('status').default('Active'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const productDescriptionImagesRelations = relations(productDescriptionImages, ({ one }) => ({
  product: one(products, {
    fields: [productDescriptionImages.productId],
    references: [products.id],
  }),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  categoryRel: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  variants: many(productVariants),
  descriptionImages: many(productDescriptionImages),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const articleCategories = pgTable('article_categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const articleCategoriesRelations = relations(articleCategories, ({ many }) => ({
  posts: many(posts),
}));

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content'),
  author: text('author'),
  thumbnail: text('thumbnail'),
  metaDescription: text('meta_description'),
  status: text('status').default('Draft'),
  categoryId: integer('category_id').references(() => articleCategories.id),
  views: integer('views').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  categoryRel: one(articleCategories, {
    fields: [posts.categoryId],
    references: [articleCategories.id],
  }),
}));

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  message: text('message'),
  status: text('status').default('New'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const siteSettings = pgTable('site_settings', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: jsonb('value'),
  createdAt: timestamp('created_at').defaultNow(),
});
