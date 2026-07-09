# How to publish a blog post

No code changes are ever needed. Everything is JSON in this folder.

## Steps

1. Copy `posts/hello-world.json` to `posts/<new-slug>.json` and edit it.
   - The slug must be lowercase letters, digits, and hyphens only (`my-new-post`).
   - The `slug` field inside the file must match the filename.
2. Add a matching entry to `index.json` (top of the `posts` array = shown first; the site also sorts by `date`, newest first).
3. Run `npm run deploy` from the repo root.

Set `"published": false` in `index.json` to hide a post without deleting it.

## Images & media

- Use any hosted URL (`https://...`), or
- Put files in `media/` inside this folder and reference them as `media/<filename>` — the site resolves the relative path automatically.

## Block types (the `blocks` array)

| type | fields |
|---|---|
| `paragraph` | `text` — supports `**bold**`, `*italic*`, `` `code` ``, `[label](url)` |
| `heading` | `level` (2 or 3), `text` |
| `image` | `src`, `alt`, optional `caption`, optional `width` + `height` (recommended: prevents layout shift) |
| `quote` | `text`, optional `cite` |
| `code` | `code`, optional `language` |
| `video` | `provider`: `"youtube"` or `"vimeo"` with `id`, or `"file"` with `src` |
| `divider` | (no fields) |

Unknown block types are ignored, so it is safe to experiment.