import { Product } from "./products";
import { z } from "zod";

export const SearchResultSchema = z.object({
  products: z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      name: z.string(),
      price: z.number(),
      image: z.string(),
      category: z.string(),
    })
  ),
  total: z.number(),
  query: z.string(),
});

export type SearchResult = z.infer<typeof SearchResultSchema>;

/**
 * Search products by query
 * This is called from the Edge Route Handler
 */
export async function searchProducts(
  query: string,
  limit: number = 10
): Promise<SearchResult> {
  // Simulate search delay
  await new Promise((resolve) => setTimeout(resolve, 50));

  // In production, this would call a search service (Algolia, ElasticSearch, etc.)
  // For now, we'll do simple string matching
  const MOCK_PRODUCTS = [
    {
      id: "1",
      slug: "premium-wireless-headphones",
      name: "Premium Wireless Headphones",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      category: "electronics",
    },
    {
      id: "2",
      slug: "ergonomic-office-chair",
      name: "Ergonomic Office Chair",
      price: 449.99,
      image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80",
      category: "furniture",
    },
    {
      id: "3",
      slug: "mechanical-keyboard",
      name: "Mechanical Keyboard",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
      category: "electronics",
    },
    {
      id: "4",
      slug: "smart-watch",
      name: "Smart Watch Pro",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      category: "electronics",
    },
  ];

  const lowerQuery = query.toLowerCase();
  const filteredProducts = MOCK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  ).slice(0, limit);

  return {
    products: filteredProducts,
    total: filteredProducts.length,
    query,
  };
}
