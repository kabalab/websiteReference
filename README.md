# Web Development Learning Reference

A static, content-driven reference for learning HTML, CSS, and JavaScript, plus step-by-step guides for creating a GitHub repo and publishing with GitHub Pages.

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

Edit the matching JSON file in `data/`. See [ADDING-CONTENT.md](ADDING-CONTENT.md) for reference topics and guide steps.

## Add a section

1. Create `data/my-section.json` using the same schema as the other section files (or `kind: "guide"` with a `steps` array).
2. Add an entry to `data/sections.json` with `id`, `title`, `hash`, `dataFile`, `order`, and `description`.

No layout HTML changes are required.
