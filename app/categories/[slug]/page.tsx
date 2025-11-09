import { notFound } from "next/navigation";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const revalidate = 60; // ISR

function ProductsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      ))}
    </div>
  );
}

async function CategoryContent({ slug }: { slug: string }) {
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">{category.name}</h1>
        {category.description && (
          <p className="mt-2 text-lg text-muted-foreground">{category.description}</p>
        )}
        <p className="mt-4 text-sm text-muted-foreground">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <CategoryContent slug={slug} />
    </Suspense>
  );
}
