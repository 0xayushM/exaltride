import Image from "next/image";
import SearchBar from "./SearchBar";
import LocationSelector from "./LocationSelector";
import CartIcon from "./CartIcon";
import { User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import CarSelector from "./CarSelector";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-2.5 px-6 gap-6 font-sans text-[15px] text-gray-800">
        
        {/* Left: Logo + Add Car */}
        <div className="flex items-center gap-3">
          {/* <Image
            src="/images/logo.png"
            alt="ExaltRide Logo"
            width={110}
            height={40}
            priority
            className="object-contain"
          /> */}
          EXALTRIDE LOGO
          <CarSelector/> 
          
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-5">
          <LocationSelector />

        <div className="flex items-center gap-10">
          {/* Login */}
          <button className="flex flex-col items-center justify-center text-gray-700 hover:text-gray-900 transition-colors">
            <User size={22} className="mb-1" />
            <span className="text-sm font-medium">Login</span>
          </button>

          {/* Cart */}
          <button className="relative flex flex-col items-center justify-center text-gray-700 hover:text-gray-900 transition-colors">
            <div className="relative mb-1">
              <CartIcon />
              <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-[11px] font-semibold rounded-full w-4.5 h-4.5 flex items-center justify-center">
                3 
              </span>
            </div>
            <span className="text-sm font-medium">Cart</span>
          </button>
        </div>


          {/* Deals */}
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors">
            <Tag className="h-4 w-4" />
            Deals
          </Button>
        </div>
      </div>
    </header>
  );
}
