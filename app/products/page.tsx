import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";

export const revalidate = 60; // ISR

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">All Products</h1>
        <p className="mt-2 text-muted-foreground">Browse our complete collection</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
