function normalize(s) {
  return String(s || "").toLowerCase();
}

function highlightMatch(text, query) {
  const t = String(text);
  const q = query.trim();
  if (!q) return escapeHtml(t);
  const idx = t.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return escapeHtml(t);
  return (
    escapeHtml(t.slice(0, idx)) +
    "<mark>" +
    escapeHtml(t.slice(idx, idx + q.length)) +
    "</mark>" +
    escapeHtml(t.slice(idx + q.length))
  );
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildSearchIndex(sections) {
  const index = [];
  for (const section of sections) {
    if (section.kind === "guide") {
      (section.steps || []).forEach((step, i) => {
        const hay = [
          step.title,
          ...(step.body || []),
          ...(step.tips || []),
          ...(step.mistakes || []),
          ...((step.links || []).map((l) => l.label || "")),
          ...((step.images || []).map((img) => img.caption || img.alt || "")),
        ]
          .filter(Boolean)
          .join(" ");

        index.push({
          sectionId: section.id,
          sectionTitle: section.title,
          subsectionId: "steps",
          subsectionTitle: `Step ${i + 1}`,
          topicId: step.id,
          title: step.title,
          summary: (step.body && step.body[0]) || "",
          href: `#/${section.id}/${step.id}`,
          hay: normalize(hay),
        });
      });
      continue;
    }

    for (const sub of section.subsections || []) {
      for (const topic of sub.topics || []) {
        const hay = [
          topic.title,
          topic.summary,
          topic.description,
          topic.syntax,
          ...(topic.tags || []),
          ...(topic.commonMistakes || []),
          ...(topic.beginnerTips || []),
          ...((topic.related || []).map((r) => r.label || r.topic || "")),
        ]
          .filter(Boolean)
          .join(" ");

        index.push({
          sectionId: section.id,
          sectionTitle: section.title,
          subsectionId: sub.id,
          subsectionTitle: sub.title,
          topicId: topic.id,
          title: topic.title,
          summary: topic.summary || "",
          href: `#/${section.id}/${topic.id}`,
          hay: normalize(hay),
        });
      }
    }
  }
  return index;
}

export function search(index, query) {
  const q = normalize(query).trim();
  if (!q || q.length < 1) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const scored = [];

  for (const item of index) {
    let score = 0;
    const title = normalize(item.title);
    if (title === q) score += 100;
    else if (title.startsWith(q)) score += 60;
    else if (title.includes(q)) score += 40;

    let allMatch = true;
    for (const term of terms) {
      if (!item.hay.includes(term)) {
        allMatch = false;
        break;
      }
      score += 5;
      if (item.hay.includes(` ${term} `)) score += 3;
    }
    if (!allMatch) continue;
    scored.push({ ...item, score });
  }

  scored.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  return scored.slice(0, 25);
}

export function initSearch(getIndex) {
  const input = document.getElementById("site-search");
  const results = document.getElementById("search-results");
  let activeIndex = -1;
  let current = [];

  const hide = () => {
    results.hidden = true;
    results.replaceChildren();
    activeIndex = -1;
  };

  const render = (items, query) => {
    current = items;
    activeIndex = items.length ? 0 : -1;
    results.replaceChildren();
    if (!query.trim()) {
      hide();
      return;
    }
    results.hidden = false;
    if (!items.length) {
      const empty = document.createElement("div");
      empty.className = "search-empty";
      empty.textContent = "No matching topics.";
      results.appendChild(empty);
      return;
    }
    items.forEach((item, i) => {
      const a = document.createElement("a");
      a.className = "search-result";
      a.href = item.href;
      a.setAttribute("role", "option");
      a.setAttribute("aria-selected", i === 0 ? "true" : "false");
      a.innerHTML = `
        <span class="search-result-title">${highlightMatch(item.title, query)}</span>
        <span class="search-result-meta">${escapeHtml(item.sectionTitle)} · ${escapeHtml(item.subsectionTitle)}</span>
      `;
      a.addEventListener("click", () => hide());
      results.appendChild(a);
    });
  };

  const syncActive = () => {
    [...results.querySelectorAll(".search-result")].forEach((el, i) => {
      el.setAttribute("aria-selected", i === activeIndex ? "true" : "false");
      if (i === activeIndex) el.scrollIntoView({ block: "nearest" });
    });
  };

  input.addEventListener("input", () => {
    const q = input.value;
    render(search(getIndex(), q), q);
  });

  input.addEventListener("keydown", (e) => {
    if (results.hidden) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, current.length - 1);
      syncActive();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      syncActive();
    } else if (e.key === "Enter" && activeIndex >= 0 && current[activeIndex]) {
      e.preventDefault();
      window.location.hash = current[activeIndex].href.slice(1);
      hide();
      input.blur();
    } else if (e.key === "Escape") {
      hide();
      input.blur();
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".sidebar-search")) hide();
  });

  return { hide };
}
