import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export default function InvalidTablePage() {
  return <main className="paper-grain grid min-h-screen place-items-center p-6"><div className="max-w-md text-center"><BrandMark /><p className="eyebrow mt-14 text-[var(--terracotta)]">Table link unavailable</p><h1 className="font-display mt-3 text-4xl">This table code is no longer active.</h1><p className="mt-4 leading-7 text-[var(--muted)]">Please ask a member of the Fantish team for a fresh QR code before placing an order.</p><Link className="focus-ring mt-8 inline-block rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-bold text-white" href="/">Return home</Link></div></main>;
}
