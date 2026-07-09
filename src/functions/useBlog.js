import { useEffect, useState } from "react";

const BASE = process.env.PUBLIC_URL + "/content/blog";
const SLUG_RE = /^[a-z0-9-]+$/;

function useFetchJson(url) {
  const [state, setState] = useState({ data: null, loading: !!url, error: null });

  useEffect(() => {
    if (!url) {
      setState({ data: null, loading: false, error: new Error("Invalid request") });
      return;
    }
    let alive = true;
    setState({ data: null, loading: true, error: null });
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (alive) setState({ data: json, loading: false, error: null });
      })
      .catch((err) => {
        if (alive) setState({ data: null, loading: false, error: err });
      });
    return () => {
      alive = false;
    };
  }, [url]);

  return state;
}

export function useBlogIndex() {
  const { data, loading, error } = useFetchJson(`${BASE}/index.json`);
  const posts = data
    ? (data.posts || [])
        .filter((p) => p.published !== false && SLUG_RE.test(p.slug || ""))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    : null;
  return { posts, loading, error };
}

export function useBlogPost(slug) {
  const valid = SLUG_RE.test(slug || "");
  const { data, loading, error } = useFetchJson(
    valid ? `${BASE}/posts/${slug}.json` : null
  );
  return { post: data, loading, error };
}