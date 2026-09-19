# How to add content

## Add a topic

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
- `type: "guide"` and `visual` for GitHub Pages steps

## Add a section

1. Create `data/my-section.json` (or a builder under `scripts/content/`).
2. Register it in `data/sections.json`:

```json
{
  "id": "my-section",
  "title": "My Reference",
  "hash": "my-section",
  "dataFile": "data/my-section.json",
  "order": 6,
  "description": "Optional personal notes."
}
```

The sidebar and landing overview update automatically.
