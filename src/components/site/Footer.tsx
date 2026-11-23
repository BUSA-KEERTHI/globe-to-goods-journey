import { Link } from "@tanstack/react-router";

import { POSTS } from "@/lib/posts";
import { INSTAGRAM, PHONE, PHONE_TEL, WA } from "@/lib/site";
import { HomeLink, Logo } from "./Header";

const WA_PATH =
  "M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2z";

export function Footer({ home }: { home: boolean }) {
  const latest = POSTS.slice(0, 5);
  const services = ["Product sourcing", "Factory inspection", "Quality control", "Shipping & logistics", "Customs clearance", "Doorstep delivery"];
  const products = ["Furniture & interiors", "Electronics & tech", "EV & automotive", "Lighting", "Supermarket goods"];
  return (
    <>
      <footer className="footer">
        <div className="wrap">
          <div className="ft-top">
            <div className="ft-brand">
              <Logo home={home} />
              <p>End-to-end imports from China to India: sourcing, factory inspection, shipping and customs. Save time. Reduce costs.</p>
              <div className="ft-social">
                <a href={INSTAGRAM} target="_blank" rel="noopener" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
                </a>
                <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d={WA_PATH} /></svg>
                </a>
                <a href={`tel:${PHONE_TEL}`} aria-label="Call">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" /></svg>
                </a>
              </div>
            </div>
            <div>
              <h4>Our services</h4>
              <ul>{services.map((s) => <li key={s}><HomeLink home={home} hash="services">{s}</HomeLink></li>)}</ul>
            </div>
            <div>
              <h4>What we import</h4>
              <ul>
                {products.map((s) => <li key={s}><HomeLink home={home} hash="products">{s}</HomeLink></li>)}
                <li><HomeLink home={home} hash="trips">Canton Fair trips</HomeLink></li>
              </ul>
            </div>
            <div>
              <h4>Import guides</h4>
              <ul>
                {latest.map((p) => <li key={p.slug}><Link to="/post" search={{ p: p.slug }}>{p.title}</Link></li>)}
                <li><Link to="/blog" className="ft-all">All articles →</Link></li>
              </ul>
            </div>
            <div className="ft-contact">
              <h4>Get in touch</h4>
              <ul>
                <li><b>Call / WhatsApp</b><br /><a href={`tel:${PHONE_TEL}`}>{PHONE}</a></li>
                <li><b>India</b><br />Hyderabad, Telangana</li>
                <li><b>China</b><br />Shanghai Shengqiao Chain Trading Co., Ltd., Shanghai</li>
                <li><b>Instagram</b><br /><a href={INSTAGRAM} target="_blank" rel="noopener">@importnow.in</a></li>
              </ul>
            </div>
          </div>
          <div className="ft-bottom">
            <span>© {new Date().getFullYear()} ImportNow.in · All rights reserved.</span>
            <span className="concept">Concept design · preview prepared for ImportNow</span>
          </div>
        </div>
      </footer>
      <a className="wa" href={`https://wa.me/${WA}`} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.2c0-.1-.2-.2-.5-.3z" /></svg>
      </a>
    </>
  );
}
