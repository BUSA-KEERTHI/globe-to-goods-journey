import { describe, expect, it } from "vitest";

import { buildQuoteUrl } from "@/lib/site";

describe("quote form → WhatsApp", () => {
  it("sends the quote to ImportNow's WhatsApp number 919989724320", () => {
    const url = buildQuoteUrl({ name: "Ravi", city: "Hyderabad", cat: "Lighting", qty: "1 container", budget: "₹5–25 lakh", msg: "LED panels" });
    expect(url.startsWith("https://wa.me/919989724320?text=")).toBe(true);
    const text = decodeURIComponent(url.split("?text=")[1] ?? "");
    expect(text).toContain("Name: Ravi");
    expect(text).toContain("Budget: ₹5–25 lakh");
  });
});
