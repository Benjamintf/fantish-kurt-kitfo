export function formatETB(value: number) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);
}

export function cartTotal(lines: Array<{ item: { priceEtb: number }; quantity: number }>) {
  return lines.reduce((sum, line) => sum + line.item.priceEtb * line.quantity, 0);
}
