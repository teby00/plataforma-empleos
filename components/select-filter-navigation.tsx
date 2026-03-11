"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FilterNavigation() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const buildQuery = (value: string) => {
    const query = new URLSearchParams();
    if (value) query.set("name", value);
    return query.toString();
  };

  const search = (value: string) => {
    router.push(`/dashboard/users?${buildQuery(value)}`);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          search(e.target.value);
        }}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
}
