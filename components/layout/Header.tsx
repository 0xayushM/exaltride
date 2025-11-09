import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartBadge } from "@/components/cart/CartBadge";
import { Suspense } from "react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">ExaltRide</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="transition-colors hover:text-foreground/80">
              Home
            </Link>
            <Link
              href="/products"
              className="transition-colors hover:text-foreground/80"
            >
              Products
            </Link>
            <Link
              href="/categories/electronics"
              className="transition-colors hover:text-foreground/80"
            >
              Electronics
            </Link>
            <Link
              href="/categories/furniture"
              className="transition-colors hover:text-foreground/80"
            >
              Furniture
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/search">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              <Suspense fallback={null}>
                <CartBadge />
              </Suspense>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
