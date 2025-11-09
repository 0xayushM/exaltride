import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="flex flex-col gap-16 pb-16">
          {/* Hero Section */}
          <section className="relative flex min-h-[500px] items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-background">
            <div className="container px-4 text-center">
              <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                Welcome to ExaltRide
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                Discover premium products for your lifestyle. High-quality, fast delivery, and
                exceptional customer service.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/products">
                  <Button size="lg" className="gap-2">
                    Shop Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/categories/electronics">
                  <Button size="lg" variant="outline">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="container px-4">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
                <p className="mt-2 text-muted-foreground">Handpicked items just for you</p>
              </div>
              <Link href="/products">
                <Button variant="ghost" className="gap-2">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="container px-4">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Shop by Category</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Link
                href="/categories/electronics"
                className="group relative overflow-hidden rounded-lg bg-muted p-8 transition-shadow hover:shadow-lg"
              >
                <h3 className="text-2xl font-semibold">Electronics</h3>
                <p className="mt-2 text-muted-foreground">Latest gadgets and devices</p>
                <ArrowRight className="absolute bottom-8 right-8 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Link>
              <Link
                href="/categories/furniture"
                className="group relative overflow-hidden rounded-lg bg-muted p-8 transition-shadow hover:shadow-lg"
              >
                <h3 className="text-2xl font-semibold">Furniture</h3>
                <p className="mt-2 text-muted-foreground">Modern and comfortable furniture</p>
                <ArrowRight className="absolute bottom-8 right-8 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </section>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ExaltRide. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
