# Web Development Learning Reference

A static, content-driven reference for learning HTML, CSS, JavaScript, and GitHub Pages.

## Run locally

Because the site loads JSON with `fetch`, open it through a local static server (not as a raw `file://` page):

```bash
npx --yes serve .
```

Or with Python:

```bash
python -m http.server 5500
```

Then visit the printed URL (for example `http://localhost:3000`).

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Settings → Pages → Source: Deploy from a branch.
3. Choose `main` (or `docs`) and `/` (root).
4. Wait for the site URL.

## Add a topic

Edit the matching file under `data/` (for example `data/css.json`). Copy an existing topic object and change `id`, `title`, and the teaching fields. The UI regenerates automatically.

## Add a section

1. Create `data/my-section.json` using the same schema as the other section files.
2. Add an entry to `data/sections.json` with `id`, `title`, `hash`, `dataFile`, `order`, and `description`.

No layout HTML changes are required.
