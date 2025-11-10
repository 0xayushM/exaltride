"use client";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

export default function LocationSelector() {
  const [location, setLocation] = useState<string>("Loading...");

  useEffect(() => {
    fetch("/api/addresses")
      .then(res => res.json())
      .then(data => {
        const defaultAddr = data.find((addr: any) => addr.is_default);
        setLocation(`${defaultAddr.city} ${defaultAddr.pincode}`);
      })
      .catch(() => setLocation("Unavailable"));
  }, []);

  return (
    <div className="flex items-center space-x-1 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">
      <MapPin className="h-4 w-4" />
      <div className="flex flex-col leading-tight">
        <span className="text-xs text-gray-500">Deliver to</span>
        <span className="font-medium text-sm flex items-center gap-1">
          {location} <span className="text-[11px]">▼</span>
        </span>
      </div>
    </div>
  );
}
