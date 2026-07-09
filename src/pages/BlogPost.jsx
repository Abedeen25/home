import React from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toolbar } from "../components/Snippets/Toolbar";
import BlockRenderer from "../components/Blog/BlockRenderer";
import DotGrid from "../components/DotGrid";
import { useBlogPost } from "../functions/useBlog";

function formatDate(d) {
  const date = new Date(d);
  if (isNaN(date)) return "";
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPost({ darkTheme, toggleTheme }) {
  const { slug } = useParams();
  const { post, loading, error } = useBlogPost(slug);

  return (
    <div className="mainBody">
      <DotGrid dark={darkTheme} />
      <div className="MB">
        <Toolbar darkTheme={darkTheme} changeTheme={toggleTheme} onHome={false} />
        <div className="ContentBody blog-page">
          <Header isDarkTheme={darkTheme} />

          {loading && (
            <div className="blog-container" aria-busy="true">
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line short" />
            </div>
          )}

          {error && !loading && (
            <div className="blog-container blog-message">
              <Helmet>
                <title>Post not found — Iftekharul Abedeen</title>
              </Helmet>
              <h1>Post not found</h1>
              <p>
                The post you're looking for doesn't exist (or failed to load).
              </p>
              <Link className="button b-secondary" to="/blog">
                ← All posts
              </Link>
            </div>
          )}

          {post && !loading && !error && (
            <article className="post">
              <Helmet>
                <title>{post.title} — Iftekharul Abedeen</title>
                {post.subtitle && (
                  <meta name="description" content={post.subtitle} />
                )}
              </Helmet>

              {post.cover && post.cover.src && (
                <figure className="post-cover">
                  <img
                    src={post.cover.src}
                    alt={post.cover.alt || ""}
                    fetchpriority="high"
                    decoding="async"
                  />
                  {post.cover.caption && (
                    <figcaption>{post.cover.caption}</figcaption>
                  )}
                </figure>
              )}

              <div className="blog-container">
                <nav className="breadcrumb" aria-label="Breadcrumb">
                  <Link to="/">Home</Link> <span aria-hidden="true">›</span>{" "}
                  <Link to="/blog">Writing</Link>{" "}
                  <span aria-hidden="true">›</span> <span>{post.title}</span>
                </nav>

                <h1 className="post-title chroma">{post.title}</h1>
                {post.subtitle && <p className="post-subtitle">{post.subtitle}</p>}

                <div className="post-byline">
                  {post.author && <span>{post.author}</span>}
                  {post.date && <span>· {formatDate(post.date)}</span>}
                  {post.readMinutes && <span>· {post.readMinutes} min read</span>}
                </div>

                <div className="post-body">
                  {(post.blocks || []).map((block, i) => (
                    <BlockRenderer key={i} block={block} />
                  ))}
                </div>

                <div className="post-footer-nav">
                  <Link className="button b-secondary" to="/blog">
                    ← All posts
                  </Link>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}