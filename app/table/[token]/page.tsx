import { TableMenu } from "@/components/TableMenu";
import { getPublicMenu, getTable } from "@/lib/public-data";

export default async function TablePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  
  const menu = await getPublicMenu();
  
  let table: any = await getTable(token);
  if (!table) {
    table = { id: token, name: `Table ${token}`, isActive: true };
  }

  return <TableMenu table={table} {...menu} />;
}