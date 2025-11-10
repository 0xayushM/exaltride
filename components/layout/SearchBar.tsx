"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    const res = await fetch("/api/products");
    const products = await res.json();
    const results = products.filter((p: any) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
    console.log("🔎 Search Results:", results);
    alert(`${results.length} results found for "${query}"`);
  };

  return (
    <div className="flex items-center w-full max-w-xl border border-[#004AAD] rounded-full overflow-hidden shadow-sm bg-white">
      <div className="flex items-center pl-3">
        <Search className="h-5 w-5 text-gray-500" />
      </div>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search accessories..."
        className="border-none focus:ring-0 flex-1 px-2 text-gray-700 placeholder:text-gray-400"
      />
      <Button
        onClick={handleSearch}
        className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-none rounded-r-full px-6 font-medium transition-colors"
      >
        Search
      </Button>
    </div>
  );
}
