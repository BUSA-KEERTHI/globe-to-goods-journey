import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Cover, PostCard } from "@/components/site/PostCard";
import { usePageMotion } from "@/lib/motion";
import { POSTS, type Post } from "@/lib/posts";
import { fmtDate } from "@/lib/site";

type Search = { p?: string };

function findPost(slug: string | undefined): Post {
  return POSTS.find((x) => x.slug === slug) ?? (POSTS[0] as Post);
}

/** Gives each h2 an id (s1, s2, …) and returns the headings for the table of contents. */
function withHeadingIds(body: string) {
  const heads: Array<{ id: string; text: string }> = [];
  const html = body.replace(/<h2>([\s\S]*?)<\/h2>/g, (_m, inner: string) => {
    const id = "s" + (heads.length + 1);
    heads.push({ id, text: inner.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&") });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html, heads };
}

export const Route = createFileRoute("/post")({
  validateSearch: (s: Record<string, unknown>): Search =>
    typeof s["p"] === "string" ? { p: s["p"] } : {},
  loaderDeps: ({ search }) => ({ p: search.p }),
  loader: ({ deps }) => ({ slug: findPost(deps.p).slug }),
  head: ({ loaderData }) => {
    const post = findPost(loaderData?.slug);
    const title = post.title + " | ImportNow";
    return {
      meta: [
        { title },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { slug } = Route.useLoaderData();
  const p = findPost(slug);
  const { html, heads } = withHeadingIds(p.body);
  const others = POSTS.filter((x) => x !== p);
  const rel = others
    .filter((x) => x.cat === p.cat)
    .concat(others.filter((x) => x.cat !== p.cat))
    .slice(0, 3);

  const [url, setUrl] = useState("");
  useEffect(() => setUrl(location.href), [slug]);
  const u = encodeURIComponent(url);
  const tt = encodeURIComponent(p.title);

  usePageMotion([slug]);

  return (
    <>
      <Header home={false} />
      <main>
        <div className="wrap article-wrap">
          <article className="article" id="article" key={slug}>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/blog">Blog</Link>
              <span>/</span>
              <span>{p.cat}</span>
            </div>
            <h1>{p.title}</h1>
            <div className="post-meta">
              <span>{fmtDate(p.date)}</span>
              <span className="dot"></span>
              <span>{p.mins} min read</span>
              <span className="dot"></span>
              <span>By ImportNow Team</span>
            </div>
            <div className="cover">
              <Cover post={p} />
            </div>
            {heads.length > 3 ? (
              <nav className="toc">
                <b>In this article</b>
                <ol>
                  {heads.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`}>{h.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
            <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
            <div className="share">
              Share:{" "}
              <a href={`https://wa.me/?text=${tt}%20${u}`} target="_blank" rel="noopener">WhatsApp</a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener">LinkedIn</a>
              <a href={`https://twitter.com/intent/tweet?text=${tt}&url=${u}`} target="_blank" rel="noopener">X</a>
            </div>
          </article>
          <aside className="sidebar">
            <div className="side-box">
              <h3>Popular Articles</h3>
              <div id="popular">
                {others.slice(0, 5).map((o) => (
                  <Link key={o.slug} className="pop" to="/post" search={{ p: o.slug }}>
                    <span className="cover">
                      <Cover post={o} short />
                    </span>
                    <span>
                      <b>{o.title}</b>
                      <span>{fmtDate(o.date)}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="side-cta">
              <h3>Planning an import?</h3>
              <p>Tell us the product and quantity. We'll send supplier options, landed cost and timelines, free of charge.</p>
              <Link className="btn" to="/" hash="contact">Get a free quote →</Link>
            </div>
          </aside>
        </div>

        <section className="related">
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: "30px" }}>
              <span className="eyebrow">Keep reading</span>
              <h2 style={{ fontSize: "34px", marginTop: "12px" }}>Related articles</h2>
            </div>
            <div className="post-grid" id="related">
              {rel.map((r, i) => (
                <PostCard key={r.slug} post={r} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer home={false} />
    </>
  );
}
