import { z } from "zod";

// Product schema
export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  category: z.string(),
  stock: z.number(),
  featured: z.boolean().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

// Category schema
export const CategorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
});

export type Category = z.infer<typeof CategorySchema>;

// Mock data - replace with actual database/API calls
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "premium-wireless-headphones",
    name: "Premium Wireless Headphones",
    description:
      "High-quality wireless headphones with active noise cancellation and 30-hour battery life.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    category: "electronics",
    stock: 50,
    featured: true,
  },
  {
    id: "2",
    slug: "ergonomic-office-chair",
    name: "Ergonomic Office Chair",
    description:
      "Comfortable office chair with lumbar support and adjustable armrests.",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80",
    category: "furniture",
    stock: 25,
    featured: true,
  },
  {
    id: "3",
    slug: "mechanical-keyboard",
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with Cherry MX switches and programmable keys.",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
    category: "electronics",
    stock: 75,
  },
  {
    id: "4",
    slug: "smart-watch",
    name: "Smart Watch Pro",
    description: "Fitness tracking smartwatch with heart rate monitor and GPS.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    category: "electronics",
    stock: 100,
    featured: true,
  },
];

const MOCK_CATEGORIES: Category[] = [
  {
    id: "1",
    slug: "electronics",
    name: "Electronics",
    description: "Latest gadgets and electronic devices",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
  },
  {
    id: "2",
    slug: "furniture",
    name: "Furniture",
    description: "Modern and comfortable furniture for your home",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },
];

/**
 * Fetch all products with ISR
 */
export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // In production, this would be:
  // const res = await fetch(`${process.env.API_URL}/products`, {
  //   next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
  // });
  // return res.json();

  return MOCK_PRODUCTS;
}

/**
 * Fetch a single product by slug with ISR
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  return product || null;
}

/**
 * Fetch featured products
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return MOCK_PRODUCTS.filter((p) => p.featured);
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return MOCK_PRODUCTS.filter((p) => p.category === categorySlug);
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return MOCK_CATEGORIES;
}

/**
 * Fetch a single category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);
  return category || null;
}
