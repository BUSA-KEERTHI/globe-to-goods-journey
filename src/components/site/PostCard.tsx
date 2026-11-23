import { Link } from "@tanstack/react-router";

import type { Post } from "@/lib/posts";
import { fmtDate } from "@/lib/site";

export function Cover({ post, short = false }: { post: Post; short?: boolean }) {
  return (
    <span className="cover-in">
      <span className={`cv-bg ${post.cv}`}></span>
      <svg className="cv-ic">
        <use href={`#ic-${post.icon}`} />
      </svg>
      <span className="cv-cat">{post.cat}</span>
      <span className="cv-flags">
        <svg className="flag">
          <use href="#flag-cn" />
        </svg>
        →
        <svg className="flag">
          <use href="#flag-in" />
        </svg>
      </span>
      {short ? null : <span className="cv-title">{post.title.split(":")[0]}</span>}
    </span>
  );
}

export function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <article className={`post-card rv d${(index % 2) + 1}`}>
      <Link className="cover" to="/post" search={{ p: post.slug }} aria-hidden="true" tabIndex={-1}>
        <Cover post={post} />
      </Link>
      <div className="bd">
        <h3>
          <Link to="/post" search={{ p: post.slug }}>
            {post.title}
          </Link>
        </h3>
        <div className="post-meta">
          <span>{fmtDate(post.date)}</span>
          <span className="dot"></span>
          <span>{post.mins} min read</span>
        </div>
        <p>{post.excerpt}</p>
        <Link className="read-more" to="/post" search={{ p: post.slug }}>
          Read more <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
