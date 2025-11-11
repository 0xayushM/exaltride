"use client";

import { ShoppingCart } from "lucide-react";

export default function CartIcon() {
  return (
    <div className="relative flex items-center cursor-pointer hover:text-gray-900 transition-colors">
      <ShoppingCart className="h-5 w-5 text-gray-800" />
      <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[11px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
        3
      </span>
    </div>
  );
}
