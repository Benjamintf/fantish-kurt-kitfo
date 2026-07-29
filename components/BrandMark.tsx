import Link from "next/link";

export function BrandMark({ light = false, href = "/" }: { light?: boolean; href?: string }) {
  return (
    <Link href={href} className={`focus-ring inline-flex items-center gap-2.5 ${light ? "text-[#fff9ed]" : "text-[var(--ink)]"}`} aria-label="Fantish Kurt and Kitfo home">
      <span className={`grid h-9 w-9 place-items-center rounded-full border text-xs ${light ? "border-white/60" : "border-[var(--terracotta)]"}`} aria-hidden="true">✦</span>
      <span className="leading-none">
        <strong className="font-display block text-lg tracking-tight">Fantish</strong>
        <small className="font-am block pt-1 text-[.6rem] font-semibold tracking-wide">ፋንትሽ ቁርጥ እና ክትፎ</small>
      </span>
    </Link>
  );
}
