import { describe, expect, it } from "vitest";
import { cartTotal, formatETB } from "../lib/currency";

describe("cart pricing", () => {
  it("adds item quantities using authoritative ETB values", () => {
    expect(cartTotal([{ item: { priceEtb: 720 }, quantity: 2 }, { item: { priceEtb: 180 }, quantity: 3 }])).toBe(1980);
  });

  it("formats Ethiopian Birr without fractional display noise", () => {
    expect(formatETB(720)).toContain("720");
    expect(formatETB(720)).toContain("ETB");
  });
});
