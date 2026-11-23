import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { PostCard } from "@/components/site/PostCard";
import { Link } from "@tanstack/react-router";
import { usePageMotion } from "@/lib/motion";
import { POSTS } from "@/lib/posts";

const TITLE = "Import Guides & Blogs | ImportNow";
const DESCRIPTION =
  "Practical guides on importing from China to India: sourcing, wholesale markets, shipping, customs duty and business ideas.";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

const PER = 6;
const CATS = ["All", ...new Set(POSTS.map((p) => p.cat))];

function BlogPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [pg, setPg] = useState(1);

  const term = q.trim().toLowerCase();
  const list = useMemo(
    () =>
      POSTS.filter(
        (p) =>
          (cat === "All" || p.cat === cat) &&
          (!term || (p.title + " " + p.excerpt + " " + p.cat).toLowerCase().includes(term)),
      ),
    [cat, term],
  );
  const pages = Math.max(1, Math.ceil(list.length / PER));
  const page = Math.min(pg, pages);
  const shown = list.slice((page - 1) * PER, page * PER);

  usePageMotion([cat, term, page]);

  return (
    <>
      <Header home={false} />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="crumbs">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Blog</span>
            </div>
            <h1>
              <span className="grad-blue">
                Import Guides <em>&amp;</em> Blogs
              </span>
            </h1>
            <p>
              Everything we've learned from hundreds of shipments: sourcing in China, choosing
              markets, shipping, customs and business ideas for India.
            </p>
          </div>
        </section>

        <section style={{ padding: "10px 0 110px" }}>
          <div className="wrap">
            <div className="blog-tools" id="posts-top">
              <div className="cats" id="cats">
                {CATS.map((c) => (
                  <button
                    key={c}
                    className={`cat-btn${c === cat ? " on" : ""}`}
                    onClick={() => {
                      setCat(c);
                      setPg(1);
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <label className="search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
                <input
                  id="q"
                  type="search"
                  placeholder="Search articles"
                  aria-label="Search articles"
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setPg(1);
                  }}
                />
              </label>
            </div>
            <div className="post-grid" id="post-grid">
              {shown.length ? (
                shown.map((p, i) => <PostCard key={p.slug} post={p} index={i} />)
              ) : (
                <div className="empty" style={{ gridColumn: "1/-1" }}>
                  No articles match “{term}”.
                </div>
              )}
            </div>
            <div className="pager" id="pager">
              {pages > 1
                ? Array.from({ length: pages }, (_, i) => (
                    <button
                      key={i}
                      className={i + 1 === page ? "on" : ""}
                      aria-label={`Page ${i + 1}`}
                      onClick={() => {
                        setPg(i + 1);
                        document.getElementById("posts-top")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {i + 1}
                    </button>
                  ))
                : null}
            </div>
          </div>
        </section>
      </main>
      <Footer home={false} />
    </>
  );
}
