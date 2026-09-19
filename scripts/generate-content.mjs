/**
 * Generates educational content JSON for the Web Development reference site.
 * Run: node scripts/generate-content.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "data");

function topic(partial) {
  return {
    tags: [],
    level: "beginner",
    summary: "",
    description: "",
    whenToUse: "",
    whenNotToUse: "",
    useCases: [],
    commonMistakes: [],
    beginnerTips: [],
    advancedNotes: [],
    related: [],
    ...partial,
    description: partial.description || partial.summary || "",
    whenToUse: partial.whenToUse || partial.summary || "",
  };
}

function htmlDemo(code, title = "Rendered example", explanation = "", opts = {}) {
  return {
    title,
    explanation,
    files: [{ language: "html", code }],
    render: opts.render !== false,
    resultNote: opts.resultNote || "",
  };
}

function multiDemo(files, title, explanation = "", opts = {}) {
  return {
    title,
    explanation,
    files,
    render: opts.render !== false,
    resultNote: opts.resultNote || "",
  };
}

function write(name, data) {
  const file = path.join(dataDir, name);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  const topics = data.subsections.reduce((n, s) => n + s.topics.length, 0);
  console.log(`Wrote ${name}: ${data.subsections.length} subsections, ${topics} topics`);
}

// ─── Shared helpers for tag/element topics ───────────────────────────────────

function elementTopic({
  id,
  title,
  summary,
  description,
  whenToUse,
  whenNotToUse,
  syntax,
  attributes = [],
  demos = [],
  mistakes = [],
  tips = [],
  advanced = [],
  related = [],
  tags = [],
  level = "beginner",
  type,
  visual,
}) {
  return topic({
    id,
    title,
    summary,
    description,
    whenToUse,
    whenNotToUse,
    syntax,
    attributes,
    useCases: demos,
    commonMistakes: mistakes,
    beginnerTips: tips,
    advancedNotes: advanced,
    related,
    tags: tags.length ? tags : [id.replace(/[<>]/g, "")],
    level,
    ...(type ? { type } : {}),
    ...(visual ? { visual } : {}),
  });
}

// Import section builders
import { buildHtml } from "./content/html.mjs";
import { buildAdvancedHtml } from "./content/advanced-html.mjs";
import { buildCss } from "./content/css.mjs";
import { buildJavascript } from "./content/javascript.mjs";
import { buildGithub } from "./content/github-pages.mjs";

write("html.json", buildHtml({ elementTopic, htmlDemo, multiDemo, topic }));
write("advanced-html.json", buildAdvancedHtml({ elementTopic, htmlDemo, multiDemo, topic }));
write("css.json", buildCss({ elementTopic, htmlDemo, multiDemo, topic }));
write("javascript.json", buildJavascript({ elementTopic, htmlDemo, multiDemo, topic }));
write("github-pages.json", buildGithub({ elementTopic, htmlDemo, multiDemo, topic }));
