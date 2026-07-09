import React from "react";

// Minimal inline-markdown renderer. Supports **bold**, *italic*, `code`,
// and [label](url). Builds React elements only — no dangerouslySetInnerHTML.
const TOKEN_RE =
  /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

export default function RichText({ text }) {
  if (typeof text !== "string" || text === "") return null;

  const parts = text.split(TOKEN_RE);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
          return <code key={i}>{part.slice(1, -1)}</code>;
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        if (link) {
          const [, label, url] = link;
          const safe = /^(https?:\/\/|mailto:|#|\/)/i.test(url);
          if (!safe) return <span key={i}>{label}</span>;
          return (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}