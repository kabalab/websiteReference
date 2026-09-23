# How to add content

Content lives in `data/`. Each section is a JSON file listed in `data/sections.json`. Save the file and refresh the site.

## Add a topic (reference sections)

Reference sections (`html`, `advanced-html`, `css`, `javascript`) use `subsections`, and each subsection has a `topics` array.

1. Open the matching file in `data/` (for example `data/html.json`).
2. Copy an existing topic object inside a subsection's `topics` array.
3. Change `id`, `title`, and the teaching fields.

## Topic fields

- `title`, `summary`, `description`
- `whenToUse`, `whenNotToUse`
- `syntax` (optional)
- `attributes` or `properties` (optional arrays of `{ name, description }`)
- `useCases` / demos: `{ title, explanation, files: [{ language, code }], render, resultNote }` — code editors are always editable with Copy / Reset; when `render` is true a live preview and Run button appear below.
- `commonMistakes`, `beginnerTips`, `advancedNotes` (string arrays)
- `related`: `[{ section, topic, label }]`

## Add or edit a guide step

Guides (`kind: "guide"`) are linear numbered steps — used for **Create a GitHub Repo** (`data/github-repo.json`) and **Publish with GitHub Pages** (`data/github-pages.json`).

1. Open the guide JSON file.
2. Copy an existing object in the `steps` array.
3. Change `id`, `title`, `body`, and optional `links`, `images`, `tips`, `mistakes`.
4. **Reorder** by moving the step object up or down in the array (order = page order).

### Guide step fields

```json
{
  "id": "create-repo",
  "title": "Create a new repository",
  "body": [
    "First paragraph.",
    "Second paragraph."
  ],
  "links": [{ "label": "GitHub home", "href": "https://github.com" }],
  "images": [{
    "src": "assets/guides/github-repo/03-creating-a-repository.svg",
    "alt": "New repository form",
    "caption": "Open the New repository page"
  }],
  "tips": ["Optional tip"],
  "mistakes": ["Optional mistake"]
}
```

### Replacing placeholder images

1. Put a PNG/JPG/SVG in `assets/guides/github-repo/` or `assets/guides/github-pages/`.
2. Either overwrite the existing filename, or change the step’s `images[].src` in the guide JSON.

## Add a section

1. Create `data/my-section.json`.
2. Register it in `data/sections.json`:

```json
{
  "id": "my-section",
  "title": "My Reference",
  "hash": "my-section",
  "dataFile": "data/my-section.json",
  "order": 7,
  "description": "Optional personal notes."
}
```

For a linear guide section, set `"kind": "guide"` in `sections.json` and in the JSON use a top-level `steps` array (see `data/github-repo.json`).

The sidebar and landing overview update automatically.
