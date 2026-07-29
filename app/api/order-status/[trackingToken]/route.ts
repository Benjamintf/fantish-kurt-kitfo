import { NextResponse } from "next/server";
import { getTrackingOrder } from "@/lib/public-data";

export async function GET(_: Request, { params }: { params: Promise<{ trackingToken: string }> }) {
  const { trackingToken } = await params;
  const order = await getTrackingOrder(trackingToken);
  return order ? NextResponse.json(order) : NextResponse.json({ error: "Order not found." }, { status: 404 });
}
