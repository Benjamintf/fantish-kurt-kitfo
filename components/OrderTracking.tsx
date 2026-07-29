"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { formatETB } from "@/lib/currency";
import { statusLabel } from "@/lib/i18n";
import type { Language, TrackingOrder } from "@/lib/types";

const steps = ["new", "preparing", "ready", "served"] as const;

export function OrderTracking({ initialOrder }: { initialOrder: TrackingOrder }) {
  const [order, setOrder] = useState(initialOrder); const [language, setLanguage] = useState<Language>("en");
  useEffect(() => { const timer = window.setInterval(async () => { const response = await fetch(`/api/order-status/${order.trackingToken}`, { cache: "no-store" }); if (response.ok) setOrder(await response.json()); }, 10000); return () => window.clearInterval(timer); }, [order.trackingToken]);
  const activeIndex = steps.indexOf(order.status as (typeof steps)[number]);
  return <main className="paper-grain grid min-h-screen place-items-center p-4 sm:p-8"><section className="w-full max-w-xl rounded-3xl border border-[var(--line)] bg-[var(--cream)] p-6 shadow-xl sm:p-10"><div className="flex items-start justify-between gap-3"><BrandMark /><div className="flex rounded-full border border-[var(--line)] p-1 text-xs font-bold"><button onClick={() => setLanguage("en")} className={`focus-ring rounded-full px-2 py-1 ${language === "en" ? "bg-[var(--ink)] text-white" : ""}`}>EN</button><button onClick={() => setLanguage("am")} className={`focus-ring font-am rounded-full px-2 py-1 ${language === "am" ? "bg-[var(--ink)] text-white" : ""}`}>አማ</button></div></div><div className="mt-12 text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e7c078] text-2xl">✓</div><p className="eyebrow mt-6 text-[var(--terracotta)]">{language === "am" ? "ትዕዛዝ ተቀብለናል" : "Order received"}</p><h1 className="font-display mt-3 text-4xl leading-none">{language === "am" ? "ወደ ወጥ ቤታችን ደርሷል።" : "It’s with our kitchen."}</h1><p className="mt-4 text-sm leading-6 text-[var(--muted)]">{language === "am" ? `${order.tableLabel} ላይ ያሉትን ማስታወሻዎች ተቀብለናል።` : `We have your notes for ${order.tableLabel}. Your server will help when the order is ready.`}</p></div><div className="mt-10 grid grid-cols-4 gap-1">{steps.map((step, index) => <div key={step} className="text-center"><div className={`mx-auto h-2 w-full rounded-full ${index <= activeIndex ? "bg-[var(--terracotta)]" : "bg-[#e7dac7]"}`} /><span className={`mt-2 block text-[.6rem] font-bold uppercase tracking-wide ${index <= activeIndex ? "text-[var(--terracotta)]" : "text-[var(--muted)]"}`}>{statusLabel(step, language)}</span></div>)}</div><div className="mt-10 flex items-center justify-between rounded-2xl bg-[#f1e4cf] p-4"><div><p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">{language === "am" ? "ጠረጴዛ" : "Table"}</p><strong className="font-display text-xl">{order.tableLabel}</strong></div>{order.subtotalEtb > 0 && <strong>{formatETB(order.subtotalEtb)}</strong>}</div><p className="mt-6 text-center text-xs text-[var(--muted)]">{language === "am" ? "ይህ ገጽ በራስ-ሰር ይዘምናል።" : "This page refreshes your order status automatically."}</p><Link className="focus-ring mt-7 block text-center text-sm font-bold text-[var(--terracotta)]" href="/">Back to Fantish</Link></section></main>;
}
