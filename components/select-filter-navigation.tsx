"use client";
import { useRouter } from "next/navigation";

export default function FilterNavigation() {
  const router = useRouter();

  const buildQuery = (value: string) => {
    const query = new URLSearchParams();

    if (value) {
      query.set("name", value);
    }

    return query.toString();
  };

  const search = (value: string) => {
    router.push(`/dashboard?${buildQuery(value)}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar"
        onChange={(e) => search(e.target.value)}
      />
    </div>
  );
}
