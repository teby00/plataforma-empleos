"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Route = {
  label: string;
  href: string;
};

const routes: Route[] = [
  {
    label: "Users",
    href: "/dashboard/users",
  },
  {
    label: "Employements",
    href: "/dashboard/employements",
  },
  {
    label: "Aplications",
    href: "/dashboard/aplications",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white p-4">
      <strong className="text-xl font-bold mb-6">Dashboard</strong>

      <nav className="flex flex-col gap-2">
        {routes.map((route) => {
          const active = pathname === route.href;

          return (
            <Link
              key={route.href}
              href={route.href}
              className={`px-3 py-2 rounded-md text-sm transition-colors
              ${active ? "bg-black text-white" : "hover:bg-gray-100"}`}
            >
              {route.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
