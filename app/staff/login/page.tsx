"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { createBrowserSupabase } from "@/lib/supabase";

export default function StaffLoginPage() {
  const router = useRouter(); const [error, setError] = useState(""); const [pending, setPending] = useState(false);
  async function login(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setPending(true); setError(""); const form = new FormData(event.currentTarget); const client = createBrowserSupabase(); if (!client) { setError("Supabase has not been configured yet."); setPending(false); return; } const { error: signInError } = await client.auth.signInWithPassword({ email: String(form.get("email")), password: String(form.get("password")) }); if (signInError) { setError("We could not sign you in. Please check your email and password."); setPending(false); return; } router.replace("/staff/orders"); }
  return <main className="paper-grain grid min-h-screen place-items-center p-5"><form onSubmit={login} className="w-full max-w-md rounded-3xl border border-[var(--line)] bg-[var(--cream)] p-7 shadow-xl sm:p-9"><BrandMark /><p className="eyebrow mt-12 text-[var(--terracotta)]">Staff access</p><h1 className="font-display mt-3 text-4xl">Welcome back.</h1><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Sign in with your Fantish staff account to view live orders.</p><label className="mt-7 block text-sm font-bold">Email<input required name="email" type="email" autoComplete="email" className="focus-ring mt-2 w-full rounded-xl border border-[var(--line)] bg-white px-3 py-3 font-normal" /></label><label className="mt-4 block text-sm font-bold">Password<input required name="password" type="password" autoComplete="current-password" className="focus-ring mt-2 w-full rounded-xl border border-[var(--line)] bg-white px-3 py-3 font-normal" /></label>{error && <p role="alert" className="mt-4 rounded-xl bg-[#f8ddd5] p-3 text-sm text-[var(--terracotta-deep)]">{error}</p>}<button disabled={pending} className="focus-ring mt-6 w-full rounded-full bg-[var(--ink)] py-3.5 text-sm font-bold text-white disabled:opacity-60">{pending ? "Signing in…" : "Sign in"}</button></form></main>;
}
