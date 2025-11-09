import { getCartItems } from "@/lib/cart-actions";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default async function CheckoutPage() {
  const cartItems = await getCartItems();

  if (cartItems.length === 0) {
    redirect("/cart");
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = 10;
  const total = subtotal + tax + shipping;

  return (
    <div className="container px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="mb-6 text-xl font-bold">Shipping Information</h2>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <Input id="firstName" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <Input id="lastName" required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Address
                </label>
                <Input id="address" required />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium">
                    City
                  </label>
                  <Input id="city" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="state" className="text-sm font-medium">
                    State
                  </label>
                  <Input id="state" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="zip" className="text-sm font-medium">
                    ZIP Code
                  </label>
                  <Input id="zip" required />
                </div>
              </div>

              <div className="pt-6">
                <h2 className="mb-4 text-xl font-bold">Payment Information</h2>
                <p className="text-sm text-muted-foreground">
                  Payment integration would go here (Stripe, PayPal, etc.)
                </p>
              </div>
            </form>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20 p-6">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

            <div className="mb-4 space-y-4 border-b pb-4">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-b pb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Button size="lg" className="mt-6 w-full">
              Place Order
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
