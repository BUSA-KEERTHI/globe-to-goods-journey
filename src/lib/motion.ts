/* Scroll reveals, word-split headlines, count-ups and card tilt (ported from the original site script). */
import { useEffect } from "react";

const SPLIT_SELECTOR =
  ".hero h1,.section-head h2,.page-hero h1,.article h1,.j-head h2,.shanghai h2,.contact h2";

function splitWords(el: HTMLElement) {
  if (el.classList.contains("split")) return;
  let i = 0;
  (function walk(node: Node) {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        (n.textContent ?? "").split(/(\s+)/).forEach((t) => {
          if (!t) return;
          if (/^\s+$/.test(t)) {
            frag.appendChild(document.createTextNode(" "));
            return;
          }
          const w = document.createElement("span");
          w.className = "w";
          const wi = document.createElement("span");
          wi.className = "wi";
          wi.style.setProperty("--i", String(i++));
          wi.textContent = t;
          w.appendChild(wi);
          frag.appendChild(w);
        });
        (n as ChildNode).replaceWith(frag);
      } else if (n.nodeType === 1 && !/^(BR|SVG)$/i.test((n as Element).tagName)) walk(n);
    });
  })(el);
  el.classList.add("split", "rv");
}

/** Runs the page-level motion; pass deps that change when new content renders. */
export function usePageMotion(deps: unknown[] = []) {
  useEffect(() => {
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
    const cleanups: Array<() => void> = [];

    if (!RM) document.querySelectorAll<HTMLElement>(SPLIT_SELECTOR).forEach(splitWords);

    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
    );
    document.querySelectorAll(".rv:not(.in)").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    const cio = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          cio.unobserve(e.target);
          const el = e.target as HTMLElement;
          el.dataset["counted"] = "1";
          const to = +(el.dataset["count"] ?? 0),
            t0 = performance.now(),
            d = 1600;
          const step = (t: number) => {
            const k = Math.min(1, (t - t0) / d);
            el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
            if (k < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }),
      { threshold: 0.6 },
    );
    document
      .querySelectorAll<HTMLElement>("[data-count]:not([data-counted])")
      .forEach((el) => cio.observe(el));
    cleanups.push(() => cio.disconnect());

    if (fine) {
      document.querySelectorAll<HTMLElement>(".tilt").forEach((c) => {
        const move = (e: PointerEvent) => {
          const r = c.getBoundingClientRect(),
            x = (e.clientX - r.left) / r.width,
            y = (e.clientY - r.top) / r.height;
          c.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-4px)`;
          c.style.setProperty("--mx", x * 100 + "%");
          c.style.setProperty("--my", y * 100 + "%");
        };
        const leave = () => {
          c.style.transform = "";
        };
        c.addEventListener("pointermove", move);
        c.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          c.removeEventListener("pointermove", move);
          c.removeEventListener("pointerleave", leave);
        });
      });
      const lic = document.getElementById("license");
      const st = lic?.parentElement;
      if (lic && st) {
        const move = (e: PointerEvent) => {
          const r = st.getBoundingClientRect(),
            x = (e.clientX - r.left) / r.width - 0.5,
            y = (e.clientY - r.top) / r.height - 0.5;
          lic.style.transform = `rotateY(${x * 24}deg) rotateX(${-y * 16}deg)`;
        };
        const leave = () => {
          lic.style.transform = "";
        };
        st.addEventListener("pointermove", move);
        st.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          st.removeEventListener("pointermove", move);
          st.removeEventListener("pointerleave", leave);
        });
      }
    }

    return () => cleanups.forEach((f) => f());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Site-wide: top scroll progress bar and magnetic buttons. */
export function useGlobalMotion() {
  useEffect(() => {
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bar = document.createElement("div");
    bar.className = "progress";
    document.body.appendChild(bar);
    const prog = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    };
    addEventListener("scroll", prog, { passive: true });
    addEventListener("resize", prog);
    prog();

    let magnet: ((e: PointerEvent) => void) | null = null;
    if (!RM && matchMedia("(hover:hover) and (pointer:fine)").matches) {
      magnet = (e: PointerEvent) => {
        const target = e.target as Element | null;
        const b = target?.closest?.<HTMLElement>(".btn-primary,.read-more,.btn-ghost") ?? null;
        document.querySelectorAll<HTMLElement>(".magnet").forEach((x) => {
          if (x !== b) {
            x.style.transform = "";
            x.classList.remove("magnet");
          }
        });
        if (!b) return;
        const r = b.getBoundingClientRect();
        b.classList.add("magnet");
        b.style.transform = `translate(${((e.clientX - r.left) / r.width - 0.5) * 12}px,${((e.clientY - r.top) / r.height - 0.5) * 10}px)`;
      };
      document.addEventListener("pointermove", magnet);
    }
    return () => {
      removeEventListener("scroll", prog);
      removeEventListener("resize", prog);
      if (magnet) document.removeEventListener("pointermove", magnet);
      bar.remove();
    };
  }, []);
}
