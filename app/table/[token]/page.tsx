import { notFound } from "next/navigation";
import { TableMenu } from "@/components/TableMenu";
import { getPublicMenu, getTable } from "@/lib/public-data";

export default async function TablePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const [table, menu] = await Promise.all([getTable(token), getPublicMenu()]);
  if (!table) notFound();
  return <TableMenu table={table} {...menu} />;
}
