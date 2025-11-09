import { getCartItems } from "@/lib/cart-actions";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { CartActions } from "./CartActions";
import { RemoveFromCartButton } from "./RemoveFromCartButton";

export default async function CartPage() {
  const cartItems = await getCartItems();

  if (cartItems.length === 0) {
    return (
      <div className="container px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <h1 className="mb-4 text-3xl font-bold">Your Cart is Empty</h1>
          <p className="mb-8 text-muted-foreground">
            Add some products to your cart to see them here.
          </p>
          <Link href="/">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="container px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.productId} className="p-4">
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="mt-1 text-lg font-bold">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <CartActions productId={item.productId} quantity={item.quantity} />
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <p className="text-lg font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <RemoveFromCartButton productId={item.productId} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20 p-6">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

            <div className="space-y-2 border-b pb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link href="/checkout" className="mt-6 block">
              <Button size="lg" className="w-full">
                Proceed to Checkout
              </Button>
            </Link>

            <Link href="/" className="mt-4 block">
              <Button variant="outline" size="lg" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
