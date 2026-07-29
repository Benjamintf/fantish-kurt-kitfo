import { notFound } from "next/navigation";
import { OrderTracking } from "@/components/OrderTracking";
import { getTrackingOrder } from "@/lib/public-data";

export default async function OrderPage({ params }: { params: Promise<{ trackingToken: string }> }) {
  const { trackingToken } = await params;
  const order = await getTrackingOrder(trackingToken);
  if (!order) notFound();
  return <OrderTracking initialOrder={order} />;
}
