"use client";

import { useEffect, useState } from "react";

export default function CarSelector() {
  const [cars, setCars] = useState<any[]>([]);
  const [selectedCar, setSelectedCar] = useState<string>("Add your Car");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetch("/api/cars")
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(() => setCars([]));
  }, []);

  const handleSelect = (car: any) => {
    setSelectedCar(`${car.make} ${car.model} (${car.year})`);
    setShowMenu(false);
  };

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setShowMenu(prev => !prev)}
        className="flex items-center gap-2 text-gray-700 font-medium hover:text-gray-900 transition-colors"
      >
        {selectedCar} <span className="text-[13px]">▼</span>
      </button>

      {/* Dropdown */}
      {showMenu && (
        <div className="absolute left-0 mt-2 w-60 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
          <ul className="max-h-60 overflow-y-auto">
            {cars.map(car => (
              <li
                key={car.id}
                onClick={() => handleSelect(car)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {car.make} {car.model} {car.variant} ({car.year})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
