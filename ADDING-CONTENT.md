# How to add content

## Add a topic (reference sections)

1. Open the matching file under `scripts/content/` (for example `html.mjs`) **or** edit the generated JSON in `data/` directly.
2. Copy an existing topic object and change `id`, `title`, and teaching fields.
3. If you edit the scripts, run:

```bash
node scripts/generate-content.mjs
```

## Topic fields

- `title`, `summary`, `description`
- `whenToUse`, `whenNotToUse`
- `syntax` (optional)
- `attributes` or `properties` (optional arrays of `{ name, description }`)
- `useCases` / demos: `{ title, explanation, files: [{ language, code }], render, resultNote }` — code editors are always editable with Copy / Reset; when `render` is true a live preview and Run button appear below.
- `commonMistakes`, `beginnerTips`, `advancedNotes` (string arrays)
- `related`: `[{ section, topic, label }]`

## Add or edit a guide step

Guides (`kind: "guide"`) are linear numbered steps — used for **Create a GitHub Repo** and **Publish with GitHub Pages**.

1. Open `scripts/content/github-repo.mjs` or `scripts/content/github-pages.mjs`.
2. Copy an existing `guideStep({ ... })` object in the `steps` array.
3. Change `id`, `title`, `body`, and optional `links`, `images`, `tips`, `mistakes`.
4. **Reorder** by moving the step object up or down in the array (order = page order).
5. Run `node scripts/generate-content.mjs`.

### Guide step fields

```js
guideStep({
  id: "create-repo",
  title: "Create a new repository",
  body: [
    "First paragraph.",
    "Second paragraph."
  ],
  links: [{ label: "GitHub home", href: "https://github.com" }],
  images: [{
    src: "assets/guides/github-repo/03-creating-a-repository.svg",
    alt: "New repository form",
    caption: "Open the New repository page"
  }],
  tips: ["Optional tip"],
  mistakes: ["Optional mistake"]
})
```

### Replacing placeholder images

1. Put a PNG/JPG/SVG in `assets/guides/github-repo/` or `assets/guides/github-pages/`.
2. Either overwrite the existing filename, or change the step’s `images[].src` to your new file.
3. Regenerate if you edited the `.mjs` script.

## Add a section

1. Create `data/my-section.json` (or a builder under `scripts/content/`).
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
