import { getCartCount } from "@/lib/cart-actions";

export async function CartBadge() {
  const count = await getCartCount();

  if (count === 0) return null;

  return (
    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
      {count > 9 ? "9+" : count}
    </span>
  );
}
