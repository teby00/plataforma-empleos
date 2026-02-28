import { Navbar } from "@/components/navbar";

export default function SiteLayout(props: LayoutProps<"/">) {
  return (
    <main className="min-h-screen">
      <Navbar />
      {props.children}
    </main>
  );
}
