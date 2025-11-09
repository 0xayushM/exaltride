"use client";

import { useState, useEffect, useTransition, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product/ProductCard";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchResult {
  products: Array<{
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
    category: string;
  }>;
  total: number;
  query: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
      performSearch(q);
    }
  }, [searchParams]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(null);
      return;
    }

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      startTransition(() => {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      });
    }
  };

  return (
    <div className="container px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Search Products</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </form>

      {isPending ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          ))}
        </div>
      ) : results ? (
        <>
          <p className="mb-6 text-muted-foreground">
            Found {results.total} {results.total === 1 ? "result" : "results"} for &quot;
            {results.query}&quot;
          </p>
          {results.products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    description: "",
                    stock: 10,
                    featured: false,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">
                No products found. Try a different search term.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">Enter a search term to find products.</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container px-4 py-8"><Skeleton className="h-96 w-full" /></div>}>
      <SearchContent />
    </Suspense>
  );
}
