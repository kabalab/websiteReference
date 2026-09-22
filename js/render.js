import { renderExampleFiles } from "./examples.js";
import { addRecent } from "./progress.js";

function prose(text) {
  const p = document.createElement("p");
  p.className = "topic-prose";
  p.textContent = text;
  return p;
}

function label(text) {
  const el = document.createElement("h4");
  el.className = "topic-section-label";
  el.textContent = text;
  return el;
}

function bulletList(items) {
  const ul = document.createElement("ul");
  ul.className = "topic-list-bullets";
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  }
  return ul;
}

function renderAttributes(attrs) {
  if (!attrs?.length) return null;
  const table = document.createElement("table");
  table.className = "attr-table";
  table.innerHTML = `<thead><tr><th>Name</th><th>Description</th></tr></thead>`;
  const tbody = document.createElement("tbody");
  for (const attr of attrs) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td><code>${escape(attr.name)}</code></td><td>${escape(attr.description)}</td>`;
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  return table;
}

function escape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildTopicBody(section, topic) {
  const body = document.createElement("div");
  body.className = "topic-body";

  if (topic.description) {
    body.append(label("Description"), prose(topic.description));
  }
  if (topic.whenToUse) {
    body.append(label("When to use"), prose(topic.whenToUse));
  }
  if (topic.whenNotToUse) {
    body.append(label("When not to use"), prose(topic.whenNotToUse));
  }
  if (topic.syntax) {
    body.append(label("Syntax"));
    const syn = document.createElement("div");
    syn.className = "syntax-block";
    syn.textContent = topic.syntax;
    body.appendChild(syn);
  }

  const attrs = topic.attributes || topic.properties;
  if (attrs?.length) {
    body.append(label(topic.attributes ? "Important attributes" : "Important properties"));
    body.appendChild(renderAttributes(attrs));
  }

  if (topic.useCases?.length) {
    body.append(label("Examples & use cases"));
    topic.useCases.forEach((uc, i) => {
      const box = document.createElement("div");
      box.className = "use-case";
      const title = document.createElement("h5");
      title.className = "use-case-title";
      title.textContent = uc.title || `Use case ${i + 1}`;
      box.appendChild(title);
      if (uc.explanation) box.appendChild(prose(uc.explanation));
      renderExampleFiles(box, uc);
      body.appendChild(box);
    });
  }

  if (topic.visual) {
    body.append(label("Visual guide"));
    const vis = document.createElement("pre");
    vis.className = "guide-visual";
    vis.textContent = topic.visual;
    body.appendChild(vis);
  }

  if (topic.commonMistakes?.length) {
    body.append(label("Common mistakes"));
    body.appendChild(bulletList(topic.commonMistakes));
  }
  if (topic.beginnerTips?.length) {
    body.append(label("Beginner tips"));
    body.appendChild(bulletList(topic.beginnerTips));
  }
  if (topic.advancedNotes?.length) {
    body.append(label("Advanced notes"));
    body.appendChild(bulletList(topic.advancedNotes));
  }

  if (topic.related?.length) {
    body.append(label("Related topics"));
    const ul = document.createElement("ul");
    ul.className = "related-list";
    for (const rel of topic.related) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const sectionId = rel.section || section.id;
      const topicId = rel.topic || rel.id;
      a.href = `#/${sectionId}/${topicId}`;
      a.textContent = rel.label || topicId;
      li.appendChild(a);
      ul.appendChild(li);
    }
    body.appendChild(ul);
  }

  return body;
}

export function createTopicCard(section, topic, { startOpen = false, stepIndex = null } = {}) {
  const card = document.createElement("article");
  card.className = "topic-card";
  card.id = `topic-${topic.id}`;
  card.dataset.topicId = topic.id;
  if (startOpen) card.classList.add("is-open");

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "topic-trigger";
  btn.setAttribute("aria-expanded", startOpen ? "true" : "false");
  const panelId = `panel-${section.id}-${topic.id}`;
  btn.setAttribute("aria-controls", panelId);

  const chevron = document.createElement("span");
  chevron.className = "topic-chevron";
  chevron.setAttribute("aria-hidden", "true");
  chevron.textContent = "▶";

  const text = document.createElement("span");
  text.className = "topic-trigger-text";

  const title = document.createElement("h3");
  title.className = "topic-title";
  if (topic.type === "guide" && stepIndex != null) {
    const badge = document.createElement("span");
    badge.className = "guide-step-badge";
    badge.textContent = String(stepIndex);
    title.appendChild(badge);
  }
  title.appendChild(document.createTextNode(topic.title));

  text.appendChild(title);
  if (topic.summary) {
    const summary = document.createElement("p");
    summary.className = "topic-summary";
    summary.textContent = topic.summary;
    text.appendChild(summary);
  }

  btn.append(chevron, text);

  const panel = document.createElement("div");
  panel.className = "topic-panel";
  panel.id = panelId;
  panel.hidden = !startOpen;

  const inner = document.createElement("div");
  inner.className = "topic-panel-inner";

  let bodyBuilt = false;
  const ensureBody = () => {
    if (bodyBuilt) return;
    inner.appendChild(buildTopicBody(section, topic));
    bodyBuilt = true;
  };

  if (startOpen) ensureBody();

  panel.appendChild(inner);

  const setOpen = (open) => {
    card.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    panel.hidden = !open;
    if (open) {
      ensureBody();
      addRecent({
        sectionId: section.id,
        topicId: topic.id,
        title: topic.title,
        sectionTitle: section.title,
        href: `#/${section.id}/${topic.id}`,
      });
    }
  };

  btn.addEventListener("click", () => {
    setOpen(!card.classList.contains("is-open"));
  });

  card.append(btn, panel);
  card._setOpen = setOpen;
  return card;
}

function buildGuideStepBody(step) {
  const body = document.createElement("div");
  body.className = "topic-body guide-step-body";

  for (const para of step.body || []) {
    if (para) body.appendChild(prose(para));
  }

  if (step.images?.length) {
    const figures = document.createElement("div");
    figures.className = "guide-figures";
    for (const img of step.images) {
      const figure = document.createElement("figure");
      figure.className = "guide-figure";
      const image = document.createElement("img");
      image.className = "guide-figure-img";
      image.src = img.src;
      image.alt = img.alt || "";
      image.loading = "lazy";
      image.addEventListener("error", () => {
        figure.classList.add("is-missing");
        const fallback = document.createElement("div");
        fallback.className = "guide-figure-fallback";
        fallback.textContent = img.caption || img.alt || "Image placeholder";
        image.replaceWith(fallback);
      });
      figure.appendChild(image);
      if (img.caption) {
        const cap = document.createElement("figcaption");
        cap.className = "guide-figure-caption";
        cap.textContent = img.caption;
        figure.appendChild(cap);
      }
      figures.appendChild(figure);
    }
    body.appendChild(figures);
  }

  if (step.links?.length) {
    body.append(label("Links"));
    const ul = document.createElement("ul");
    ul.className = "guide-links";
    for (const link of step.links) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.label || link.href;
      if (/^https?:\/\//i.test(link.href)) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      li.appendChild(a);
      ul.appendChild(li);
    }
    body.appendChild(ul);
  }

  if (step.tips?.length) {
    body.append(label("Tips"));
    body.appendChild(bulletList(step.tips));
  }
  if (step.mistakes?.length) {
    body.append(label("Common mistakes"));
    body.appendChild(bulletList(step.mistakes));
  }

  return body;
}

export function createGuideStepCard(section, step, { startOpen = false, stepIndex = null } = {}) {
  const card = document.createElement("article");
  card.className = "topic-card guide-step";
  card.id = `topic-${step.id}`;
  card.dataset.topicId = step.id;
  if (startOpen) card.classList.add("is-open");

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "topic-trigger";
  btn.setAttribute("aria-expanded", startOpen ? "true" : "false");
  const panelId = `panel-${section.id}-${step.id}`;
  btn.setAttribute("aria-controls", panelId);

  const chevron = document.createElement("span");
  chevron.className = "topic-chevron";
  chevron.setAttribute("aria-hidden", "true");
  chevron.textContent = "▶";

  const text = document.createElement("span");
  text.className = "topic-trigger-text";

  const title = document.createElement("h3");
  title.className = "topic-title";
  if (stepIndex != null) {
    const badge = document.createElement("span");
    badge.className = "guide-step-badge";
    badge.textContent = String(stepIndex);
    title.appendChild(badge);
  }
  title.appendChild(document.createTextNode(step.title));
  text.appendChild(title);

  if (step.body?.[0]) {
    const summary = document.createElement("p");
    summary.className = "topic-summary";
    summary.textContent = step.body[0];
    text.appendChild(summary);
  }

  btn.append(chevron, text);

  const panel = document.createElement("div");
  panel.className = "topic-panel";
  panel.id = panelId;
  panel.hidden = !startOpen;

  const inner = document.createElement("div");
  inner.className = "topic-panel-inner";

  let bodyBuilt = false;
  const ensureBody = () => {
    if (bodyBuilt) return;
    inner.appendChild(buildGuideStepBody(step));
    bodyBuilt = true;
  };

  if (startOpen) ensureBody();
  panel.appendChild(inner);

  const setOpen = (open) => {
    card.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    panel.hidden = !open;
    if (open) {
      ensureBody();
      addRecent({
        sectionId: section.id,
        topicId: step.id,
        title: step.title,
        sectionTitle: section.title,
        href: `#/${section.id}/${step.id}`,
      });
    }
  };

  btn.addEventListener("click", () => {
    setOpen(!card.classList.contains("is-open"));
  });

  card.append(btn, panel);
  card._setOpen = setOpen;
  return card;
}

function renderGuideSectionView(section, { openTopicId = null } = {}) {
  const titleEl = document.getElementById("section-title");
  const introEl = document.getElementById("section-intro");
  const bodyEl = document.getElementById("section-body");
  const tocEl = document.getElementById("subsection-toc");

  titleEl.textContent = section.title;
  introEl.textContent = section.intro || "";

  tocEl.replaceChildren();
  const tocHeading = document.createElement("p");
  tocHeading.className = "toc-heading";
  tocHeading.textContent = "Steps";
  const tocList = document.createElement("ul");
  tocList.className = "toc-list";

  bodyEl.replaceChildren();

  const block = document.createElement("section");
  block.className = "subsection-block guide-section-block";
  block.id = "sub-steps";

  const list = document.createElement("div");
  list.className = "topic-list guide-list";

  (section.steps || []).forEach((step, i) => {
    const stepNum = i + 1;
    const open = openTopicId === step.id;
    const card = createGuideStepCard(section, step, {
      startOpen: open,
      stepIndex: stepNum,
    });
    list.appendChild(card);

    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#/${section.id}/${step.id}`;
    a.textContent = `${stepNum}. ${step.title}`;
    a.dataset.subId = step.id;
    li.appendChild(a);
    tocList.appendChild(li);
  });

  block.appendChild(list);
  bodyEl.appendChild(block);
  tocEl.append(tocHeading, tocList);

  if (openTopicId) {
    requestAnimationFrame(() => {
      const el = document.getElementById(`topic-${openTopicId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

export function renderSectionView(section, { openTopicId = null } = {}) {
  if (section.kind === "guide") {
    renderGuideSectionView(section, { openTopicId });
    return;
  }

  const titleEl = document.getElementById("section-title");
  const introEl = document.getElementById("section-intro");
  const bodyEl = document.getElementById("section-body");
  const tocEl = document.getElementById("subsection-toc");

  titleEl.textContent = section.title;
  introEl.textContent = section.intro || "";

  tocEl.replaceChildren();
  const tocHeading = document.createElement("p");
  tocHeading.className = "toc-heading";
  tocHeading.textContent = "On this page";
  const tocList = document.createElement("ul");
  tocList.className = "toc-list";

  bodyEl.replaceChildren();

  let stepCounter = 0;

  for (const sub of section.subsections || []) {
    const block = document.createElement("section");
    block.className = "subsection-block";
    block.id = `sub-${sub.id}`;

    const h2 = document.createElement("h2");
    h2.className = "subsection-title";
    h2.textContent = sub.title;
    block.appendChild(h2);

    if (sub.description) {
      const d = document.createElement("p");
      d.className = "subsection-desc";
      d.textContent = sub.description;
      block.appendChild(d);
    }

    const list = document.createElement("div");
    list.className = "topic-list";

    for (const topic of sub.topics || []) {
      if (topic.type === "guide") stepCounter += 1;
      const open = openTopicId === topic.id;
      const card = createTopicCard(section, topic, {
        startOpen: open,
        stepIndex: topic.type === "guide" ? stepCounter : null,
      });
      list.appendChild(card);
    }

    block.appendChild(list);
    bodyEl.appendChild(block);

    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#/${section.id}/${sub.id}`;
    a.textContent = sub.title;
    a.dataset.subId = sub.id;
    li.appendChild(a);
    tocList.appendChild(li);
  }

  tocEl.append(tocHeading, tocList);

  if (openTopicId) {
    requestAnimationFrame(() => {
      const el = document.getElementById(`topic-${openTopicId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

export function setAllTopicsOpen(open) {
  document.querySelectorAll(".topic-card").forEach((card) => {
    if (typeof card._setOpen === "function") card._setOpen(open);
  });
}

export function renderOverview(registry) {
  const grid = document.getElementById("overview-grid");
  grid.replaceChildren();
  for (const section of registry) {
    const a = document.createElement("a");
    a.className = "overview-card";
    if (section.kind === "guide") a.classList.add("overview-card-guide");
    a.href = `#/${section.hash || section.id}`;
    const kindLabel = section.kind === "guide" ? `<span class="overview-card-kind">Guide</span>` : "";
    a.innerHTML = `
      ${kindLabel}
      <h3 class="overview-card-title">${escape(section.title)}</h3>
      <p class="overview-card-desc">${escape(section.description || "")}</p>
    `;
    grid.appendChild(a);
  }
}

export function renderRecentList(recent) {
  const section = document.getElementById("recent-section");
  const list = document.getElementById("recent-list");
  if (!recent?.length) {
    section.hidden = true;
    return;
  }
  section.hidden = false;
  list.replaceChildren();
  for (const item of recent) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = `${item.title}`;
    a.title = item.sectionTitle || "";
    li.appendChild(a);
    list.appendChild(li);
  }
}
