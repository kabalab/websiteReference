import { loadSectionsRegistry, loadSection, loadAllSections, findTopic, countTopics } from "./content-loader.js";
import { buildSectionNav, setActiveSection, initMobileNav, initBackToTop, initTocSpy } from "./navigation.js";
import { renderSectionView, renderOverview, renderRecentList, setAllTopicsOpen } from "./render.js";
import { buildSearchIndex, initSearch } from "./search.js";
import { getRecent } from "./progress.js";

const state = {
  registry: [],
  sectionsById: new Map(),
  searchIndex: [],
  currentSectionId: null,
};

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, "").trim();
  if (!raw) return { type: "landing" };

  // Support legacy #html style
  const parts = raw.split("/").filter(Boolean);
  const sectionId = parts[0];
  const second = parts[1];
  const third = parts[2];

  if (!second) return { type: "section", sectionId };
  if (!third) {
    // Could be subsection OR topic id
    return { type: "section", sectionId, maybeId: second };
  }
  return { type: "section", sectionId, subsectionId: second, topicId: third };
}

async function ensureSection(sectionId) {
  if (state.sectionsById.has(sectionId)) return state.sectionsById.get(sectionId);
  const meta = state.registry.find((s) => s.id === sectionId || s.hash === sectionId);
  if (!meta) return null;
  const data = await loadSection(meta);
  state.sectionsById.set(meta.id, data);
  return data;
}

function resolveMaybeId(section, maybeId) {
  if (!maybeId) return { subsectionId: null, topicId: null };
  const sub = (section.subsections || []).find((s) => s.id === maybeId);
  if (sub) return { subsectionId: maybeId, topicId: null };
  const found = findTopic(section, maybeId);
  if (found) return { subsectionId: found.subsection.id, topicId: found.topic.id };
  return { subsectionId: null, topicId: null };
}

function showLanding() {
  document.getElementById("landing").hidden = false;
  document.getElementById("section-view").hidden = true;
  state.currentSectionId = null;
  setActiveSection(null);
  renderRecentList(getRecent());
  window.scrollTo({ top: 0 });
}

async function showSection(sectionId, opts = {}) {
  const section = await ensureSection(sectionId);
  if (!section) {
    showLanding();
    return;
  }

  document.getElementById("landing").hidden = true;
  document.getElementById("section-view").hidden = false;
  state.currentSectionId = section.id;
  setActiveSection(section.id);

  let topicId = opts.topicId || null;
  let subsectionId = opts.subsectionId || null;

  if (opts.maybeId) {
    const resolved = resolveMaybeId(section, opts.maybeId);
    topicId = resolved.topicId;
    subsectionId = subsectionId || resolved.subsectionId;
  }

  renderSectionView(section, { openTopicId: topicId });
  initTocSpy();

  if (subsectionId && !topicId) {
    requestAnimationFrame(() => {
      const el = document.getElementById(`sub-${subsectionId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  document.getElementById("main-content")?.focus({ preventScroll: true });
}

async function route() {
  const parsed = parseHash();
  if (parsed.type === "landing") {
    showLanding();
    return;
  }
  await showSection(parsed.sectionId, parsed);
}

async function boot() {
  initMobileNav();
  initBackToTop();

  state.registry = await loadSectionsRegistry();
  buildSectionNav(state.registry, null);
  renderOverview(state.registry);

  // Prefetch all content for search
  const { sections } = await loadAllSections();
  for (const s of sections) state.sectionsById.set(s.id, s);
  state.searchIndex = buildSearchIndex(sections);

  document.getElementById("topic-count").textContent = String(countTopics(sections));

  initSearch(() => state.searchIndex);

  document.getElementById("expand-all")?.addEventListener("click", () => setAllTopicsOpen(true));
  document.getElementById("collapse-all")?.addEventListener("click", () => setAllTopicsOpen(false));

  window.addEventListener("hashchange", () => {
    route().catch(console.error);
  });

  await route();
}

boot().catch((err) => {
  console.error(err);
  const main = document.getElementById("main-content");
  if (main) {
    main.insertAdjacentHTML(
      "afterbegin",
      `<div class="callout callout-warning"><strong>Could not load content.</strong> If you opened this file directly, serve it with a local static server so JSON files can load. Example: <code>npx serve .</code></div>`
    );
  }
});
