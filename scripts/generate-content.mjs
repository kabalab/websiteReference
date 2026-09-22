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
  if (data.kind === "guide") {
    console.log(`Wrote ${name}: guide with ${(data.steps || []).length} steps`);
  } else {
    const topics = data.subsections.reduce((n, s) => n + s.topics.length, 0);
    console.log(`Wrote ${name}: ${data.subsections.length} subsections, ${topics} topics`);
  }
}

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

/** Linear guide helpers — reorder steps by moving array items. */
function guideStep({
  id,
  title,
  body = [],
  links = [],
  images = [],
  tips = [],
  mistakes = [],
}) {
  return {
    id,
    title,
    body: Array.isArray(body) ? body : [body].filter(Boolean),
    links,
    images,
    tips,
    mistakes,
  };
}

function guideSection({ id, title, hash, intro, steps }) {
  return {
    id,
    title,
    hash: hash || id,
    kind: "guide",
    intro: intro || "",
    steps: steps || [],
  };
}

import { buildHtml } from "./content/html.mjs";
import { buildAdvancedHtml } from "./content/advanced-html.mjs";
import { buildCss } from "./content/css.mjs";
import { buildJavascript } from "./content/javascript.mjs";
import { buildGithubRepo } from "./content/github-repo.mjs";
import { buildGithubPages } from "./content/github-pages.mjs";

write("html.json", buildHtml({ elementTopic, htmlDemo, multiDemo, topic }));
write("advanced-html.json", buildAdvancedHtml({ elementTopic, htmlDemo, multiDemo, topic }));
write("css.json", buildCss({ elementTopic, htmlDemo, multiDemo, topic }));
write("javascript.json", buildJavascript({ elementTopic, htmlDemo, multiDemo, topic }));
write("github-repo.json", buildGithubRepo({ guideSection, guideStep }));
write("github-pages.json", buildGithubPages({ guideSection, guideStep }));
