import React from "react";
import RichText from "./RichText";

const MEDIA_BASE = process.env.PUBLIC_URL + "/content/blog/";

function resolveSrc(src) {
  if (!src) return "";
  return /^https?:\/\//i.test(src) ? src : MEDIA_BASE + src;
}

function ImageBlock({ block }) {
  const { src, alt, caption, width, height } = block;
  return (
    <figure className="post-figure">
      <img
        src={resolveSrc(src)}
        alt={alt || ""}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        style={
          width && height ? { aspectRatio: `${width} / ${height}` } : undefined
        }
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function VideoBlock({ block }) {
  const { provider, id, src, title } = block;
  if (provider === "file" && src) {
    return (
      <div className="post-video">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video controls preload="metadata" src={resolveSrc(src)} />
      </div>
    );
  }
  let embed = null;
  if (provider === "youtube" && id) {
    embed = `https://www.youtube-nocookie.com/embed/${id}`;
  } else if (provider === "vimeo" && id) {
    embed = `https://player.vimeo.com/video/${id}`;
  }
  if (!embed) return null;
  return (
    <div className="post-video">
      <iframe
        src={embed}
        title={title || "Embedded video"}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default function BlockRenderer({ block }) {
  if (!block || typeof block !== "object") return null;

  switch (block.type) {
    case "paragraph":
      return (
        <p className="post-p">
          <RichText text={block.text} />
        </p>
      );
    case "heading": {
      const level = Math.min(3, Math.max(2, Number(block.level) || 2));
      const Tag = `h${level}`;
      return <Tag className="post-h">{block.text}</Tag>;
    }
    case "image":
      return <ImageBlock block={block} />;
    case "video":
      return <VideoBlock block={block} />;
    case "quote":
      return (
        <blockquote className="post-quote">
          <RichText text={block.text} />
          {block.cite && <cite>— {block.cite}</cite>}
        </blockquote>
      );
    case "code":
      return (
        <pre className="post-code" data-language={block.language || ""}>
          <code>{block.code}</code>
        </pre>
      );
    case "divider":
      return <hr className="post-divider" />;
    default:
      // Unknown block types are skipped for forward compatibility.
      return null;
  }
}