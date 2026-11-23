/* Contact details and shared helpers used across the site. */
export const PHONE = "+91 99897 24320";
export const PHONE_TEL = PHONE.replace(/\s/g, "");
export const WA = "919989724320";
export const INSTAGRAM = "https://www.instagram.com/importnow.in/";

export const fmtDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export type QuoteFields = {
  name: string;
  city: string;
  cat: string;
  qty: string;
  budget: string;
  msg: string;
};

export function buildQuoteMessage(f: QuoteFields) {
  return `Hi ImportNow, I'd like a sourcing quote.\n\nName: ${f.name}\nCity: ${f.city}\nCategory: ${f.cat}\nQuantity: ${f.qty}\nBudget: ${f.budget}\nDetails: ${f.msg}`;
}

export function buildQuoteUrl(f: QuoteFields) {
  return "https://wa.me/" + WA + "?text=" + encodeURIComponent(buildQuoteMessage(f));
}
