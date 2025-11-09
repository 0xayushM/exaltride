import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductBySlug, getProducts } from "@/lib/products";
import { AddToCart } from "@/components/product/AddToCart";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export const revalidate = 60; // ISR: revalidate every 60 seconds

// Generate static params for all products
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - ExaltRide`,
    description: product.description,
  };
}

function ProductSkeleton() {
  return (
    <div className="container px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

async function ProductContent({ slug }: { slug: string }) {
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <Card className="overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </Card>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
            <div className="mt-4 flex items-center gap-3">
              <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
              <Badge variant={product.stock > 0 ? "default" : "secondary"}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium capitalize">{product.category}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Availability</span>
              <span className="font-medium">{product.stock} units</span>
            </div>
          </div>

          <div className="mt-auto">
            <AddToCart
              productId={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              disabled={product.stock === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent slug={slug} />
    </Suspense>
  );
}
