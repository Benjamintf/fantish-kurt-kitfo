"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { BrandMark } from "@/components/BrandMark";
import { createBrowserSupabase } from "@/lib/supabase";
import type { StaffRole } from "@/lib/types";

export function StaffGate({ children, administratorOnly = false }: { children: (client: SupabaseClient, role: StaffRole) => React.ReactNode; administratorOnly?: boolean }) {
  const [state, setState] = useState<{ client: SupabaseClient; role: StaffRole } | "loading" | "denied" | "setup">("loading");
  useEffect(() => {
    const client = createBrowserSupabase();
    if (!client) { setState("setup"); return; }
    const activeClient: SupabaseClient = client;
    let active = true;
    async function verify() {
      const { data: { user } } = await activeClient.auth.getUser();
      if (!user) { if (active) setState("denied"); return; }
      const { data } = await activeClient.from("profiles").select("role").eq("id", user.id).maybeSingle();
      const role = data?.role as StaffRole | undefined;
      if (!role || (administratorOnly && role !== "admin")) { if (active) setState("denied"); return; }
      if (active) setState({ client: activeClient, role });
    }
    verify();
    return () => { active = false; };
  }, [administratorOnly]);
  if (state === "loading") return <main className="paper-grain grid min-h-screen place-items-center"><p className="text-sm text-[var(--muted)]">Opening staff workspace…</p></main>;
  if (state === "setup") return <main className="paper-grain grid min-h-screen place-items-center p-6"><div className="max-w-md text-center"><BrandMark /><h1 className="font-display mt-10 text-4xl">Connect Supabase to open staff tools.</h1><p className="mt-4 leading-7 text-[var(--muted)]">Add the project URL and keys in <code>.env.local</code>, then follow the setup guide to provision the first administrator.</p></div></main>;
  if (state === "denied") return <main className="paper-grain grid min-h-screen place-items-center p-6"><div className="max-w-md text-center"><BrandMark /><h1 className="font-display mt-10 text-4xl">Staff sign-in required.</h1><p className="mt-4 leading-7 text-[var(--muted)]">This page is available only to an approved Fantish team account.</p><Link className="focus-ring mt-8 inline-block rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-bold text-white" href="/staff/login">Sign in</Link></div></main>;
  return <>{children(state.client, state.role)}</>;
}

export function StaffHeader({ role }: { role: StaffRole }) {
  return <header className="border-b border-white/10 bg-[var(--ink)] text-[#fff9ed]"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8"><BrandMark light /><nav className="flex flex-wrap items-center gap-3 text-xs font-bold"><Link className="focus-ring rounded-full px-3 py-2 hover:bg-white/10" href="/staff/orders">Orders</Link>{role === "admin" && <><Link className="focus-ring rounded-full px-3 py-2 hover:bg-white/10" href="/staff/menu">Menu</Link><Link className="focus-ring rounded-full px-3 py-2 hover:bg-white/10" href="/staff/tables">Tables</Link></>}<span className="rounded-full border border-white/20 px-3 py-1.5 uppercase tracking-wide text-[#efca82]">{role}</span></nav></div></header>;
}
