"use client";

import { useCallback, useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { StaffGate, StaffHeader } from "@/components/StaffGate";
import { formatETB } from "@/lib/currency";
import type { OrderStatus, StaffOrder, StaffRole } from "@/lib/types";

const columns: Array<{ status: OrderStatus; title: string; accent: string }> = [
  { status: "new", title: "New", accent: "bg-[#cc9a43]" },
  { status: "preparing", title: "Preparing", accent: "bg-[#a83e25]" },
  { status: "ready", title: "Ready", accent: "bg-[#4d7660]" },
  { status: "served", title: "Served", accent: "bg-[#856d5a]" },
];

type ServiceRequest = { id: string; note: string | null; status: string; createdAt: string; tableLabel: string; serviceName: string };

export default function StaffOrdersPage() { return <StaffGate>{(client, role) => <OrderBoard client={client} role={role} />}</StaffGate>; }

function OrderBoard({ client, role }: { client: SupabaseClient; role: StaffRole }) {
  const [orders, setOrders] = useState<StaffOrder[]>([]); const [requests, setRequests] = useState<ServiceRequest[]>([]); const [error, setError] = useState(""); const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    const [ordersResult, requestsResult] = await Promise.all([
      client.from("orders").select("id,status,subtotal_etb,guest_note,created_at,restaurant_tables(label),order_items(item_name_en,quantity,preparation_note)").order("created_at", { ascending: false }),
      client.from("service_requests").select("id,note,status,created_at,restaurant_tables(label),hotel_services(title_en)").neq("status", "completed").order("created_at", { ascending: false }).limit(8),
    ]);
    if (ordersResult.error) setError("Unable to load orders. Please refresh the page.");
    else setOrders((ordersResult.data || []).map((order) => ({
      id: order.id, status: order.status, subtotalEtb: Number(order.subtotal_etb), guestNote: order.guest_note, createdAt: order.created_at,
      tableLabel: (order.restaurant_tables as unknown as { label: string } | null)?.label || "Table",
      items: ((order.order_items || []) as unknown as Array<{ item_name_en: string; quantity: number; preparation_note: string | null }>).map((item) => ({ name: item.item_name_en, quantity: item.quantity, note: item.preparation_note })),
    })));
    setRequests((requestsResult.data || []).map((request) => ({ id: request.id, note: request.note, status: request.status, createdAt: request.created_at, tableLabel: (request.restaurant_tables as unknown as { label: string } | null)?.label || "Table", serviceName: (request.hotel_services as unknown as { title_en: string } | null)?.title_en || "Guest service" })));
    setLoading(false);
  }, [client]);
  useEffect(() => { refresh(); const channel = client.channel("fantish-staff-board").on("postgres_changes", { event: "*", schema: "public", table: "orders" }, refresh).on("postgres_changes", { event: "*", schema: "public", table: "service_requests" }, refresh).subscribe(); return () => { client.removeChannel(channel); }; }, [client, refresh]);
  async function updateStatus(id: string, status: OrderStatus) { const { error: updateError } = await client.from("orders").update({ status }).eq("id", id); if (updateError) setError("Status could not be updated. Please try again."); else refresh(); }
  async function completeRequest(id: string) { await client.from("service_requests").update({ status: "completed" }).eq("id", id); refresh(); }
  return <main className="min-h-screen bg-[#eee5d9]"><StaffHeader role={role} /><section className="mx-auto max-w-7xl px-5 py-8 sm:px-8"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow text-[var(--terracotta)]">Live kitchen board</p><h1 className="font-display mt-2 text-4xl leading-none">Today’s orders</h1></div><button onClick={refresh} className="focus-ring rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-bold">Refresh</button></div>{error && <p role="alert" className="mt-5 rounded-xl bg-[#f8ddd5] p-3 text-sm text-[var(--terracotta-deep)]">{error}</p>}<section className="mt-8 grid gap-3 rounded-2xl bg-white p-4 shadow-sm sm:grid-cols-2"><div><p className="eyebrow text-[var(--terracotta)]">Reception requests</p><p className="mt-1 text-sm text-[var(--muted)]">Hotel and lounge requests appear here in real time.</p></div><div className="max-h-40 space-y-2 overflow-auto">{requests.length ? requests.map((request) => <div key={request.id} className="flex items-center justify-between gap-3 rounded-xl bg-[#f7eddd] p-3 text-sm"><span><strong>{request.tableLabel}</strong> · {request.serviceName}{request.note && <small className="block pt-1 text-[var(--muted)]">{request.note}</small>}</span><button onClick={() => completeRequest(request.id)} className="focus-ring rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-bold">Done</button></div>) : <p className="text-sm text-[var(--muted)]">No open guest requests.</p>}</div></section><div className="mt-8 grid gap-5 xl:grid-cols-4">{columns.map((column) => <section key={column.status} className="min-h-72 rounded-2xl bg-[#e3d6c5] p-3"><div className="mb-3 flex items-center justify-between px-1"><h2 className="font-display text-2xl">{column.title}</h2><span className={`h-2.5 w-2.5 rounded-full ${column.accent}`} /></div><div className="space-y-3">{loading ? <p className="p-3 text-sm text-[var(--muted)]">Loading…</p> : orders.filter((order) => order.status === column.status).map((order) => <OrderCard key={order.id} order={order} status={column.status} onMove={updateStatus} />)}{!loading && !orders.some((order) => order.status === column.status) && <p className="rounded-xl border border-dashed border-[#c4b199] p-4 text-center text-xs text-[var(--muted)]">No orders here.</p>}</div></section>)}</div></section></main>;
}

function OrderCard({ order, status, onMove }: { order: StaffOrder; status: OrderStatus; onMove: (id: string, status: OrderStatus) => void }) { const next: Record<Exclude<OrderStatus, "served" | "cancelled">, OrderStatus> = { new: "preparing", preparing: "ready", ready: "served" }; return <article className="rounded-xl bg-white p-4 shadow-sm"><div className="flex items-start justify-between gap-2"><div><p className="eyebrow text-[var(--terracotta)]">{order.tableLabel}</p><p className="mt-1 text-xs text-[var(--muted)]">{new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p></div><strong className="text-sm">{formatETB(order.subtotalEtb)}</strong></div><ul className="mt-4 space-y-2 border-y border-[var(--line)] py-3 text-sm">{order.items.map((item, index) => <li key={`${item.name}-${index}`}><span className="font-bold">{item.quantity}×</span> {item.name}{item.note && <small className="block pl-5 text-xs leading-5 text-[var(--terracotta)]">↳ {item.note}</small>}</li>)}</ul>{order.guestNote && <p className="mt-3 rounded-lg bg-[#fff1d9] p-2 text-xs leading-5 text-[var(--muted)]"><strong>Guest note:</strong> {order.guestNote}</p>}{status !== "served" && <button onClick={() => onMove(order.id, next[status as Exclude<OrderStatus, "served" | "cancelled">])} className="focus-ring mt-4 w-full rounded-full bg-[var(--ink)] py-2.5 text-xs font-bold text-white">{status === "new" ? "Start preparing" : status === "preparing" ? "Mark ready" : "Mark served"}</button>}</article>; }
