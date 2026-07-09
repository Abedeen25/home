import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toolbar } from "../components/Snippets/Toolbar";
import Reveal from "../components/Snippets/Reveal";
import DotGrid from "../components/DotGrid";
import { useBlogIndex } from "../functions/useBlog";

function formatDate(d) {
  const date = new Date(d);
  if (isNaN(date)) return "";
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function PostCard({ post, index }) {
  return (
    <Reveal delay={index * 0.05}>
      <Link to={`/blog/${post.slug}`} className="post-card">
        {post.cover && (
          <div className="post-card-cover">
            <img
              src={post.cover}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
        <div className="post-card-body">
          <h3 className="post-card-title chroma-hover">{post.title}</h3>
          {post.subtitle && <p className="post-card-sub">{post.subtitle}</p>}
          <div className="post-card-meta">
            <span>{formatDate(post.date)}</span>
            {post.readMinutes && <span>· {post.readMinutes} min read</span>}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="post-card-tags">
              {post.tags.map((t) => (
                <span key={t} className="post-tag">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </Reveal>
  );
}

export default function BlogIndex({ darkTheme, toggleTheme }) {
  const { posts, loading, error } = useBlogIndex();

  return (
    <div className="mainBody">
      <DotGrid dark={darkTheme} />
      <div className="MB">
        <Toolbar darkTheme={darkTheme} changeTheme={toggleTheme} onHome={false} />
        <div className="ContentBody blog-page">
          <Helmet>
            <title>Writing — Iftekharul Abedeen</title>
            <meta
              name="description"
              content="Articles and notes by Iftekharul Abedeen on HCI, machine learning, teaching, and 3D art."
            />
          </Helmet>
          <Header isDarkTheme={darkTheme} />
          <div className="blog-container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link> <span aria-hidden="true">›</span>{" "}
              <span>Writing</span>
            </nav>
            <h1 className="blog-title chroma">Writing</h1>
            <p className="blog-subhead">
              Notes on HCI, machine learning, teaching, and the occasional
              render breakdown.
            </p>

            {loading && (
              <div className="post-grid" aria-busy="true">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="post-card skeleton" />
                ))}
              </div>
            )}

            {error && !loading && (
              <div className="blog-message">
                <p>Couldn't load the post list. Please check your connection.</p>
                <button
                  className="button b-secondary"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && posts && posts.length === 0 && (
              <div className="blog-message">
                <p>No posts yet — check back soon.</p>
              </div>
            )}

            {!loading && !error && posts && posts.length > 0 && (
              <div className="post-grid">
                {posts.map((post, i) => (
                  <PostCard key={post.slug} post={post} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}