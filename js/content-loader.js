const cache = new Map();

export async function loadSectionsRegistry() {
  if (cache.has("sections")) return cache.get("sections");
  const res = await fetch("data/sections.json");
  if (!res.ok) throw new Error("Failed to load sections registry");
  const data = await res.json();
  data.sort((a, b) => a.order - b.order);
  cache.set("sections", data);
  return data;
}

export async function loadSection(sectionMeta) {
  const key = sectionMeta.id;
  if (cache.has(key)) return cache.get(key);
  const res = await fetch(sectionMeta.dataFile);
  if (!res.ok) throw new Error(`Failed to load ${sectionMeta.dataFile}`);
  const data = await res.json();
  const merged = {
    ...data,
    kind: data.kind || sectionMeta.kind || "reference",
    description: data.description || sectionMeta.description || "",
  };
  cache.set(key, merged);
  return merged;
}

export async function loadAllSections() {
  const registry = await loadSectionsRegistry();
  const sections = await Promise.all(registry.map((meta) => loadSection(meta)));
  return { registry, sections };
}

export function findTopic(section, topicId) {
  if (section.kind === "guide") {
    const step = (section.steps || []).find((s) => s.id === topicId);
    if (step) {
      return {
        subsection: { id: "steps", title: "Steps" },
        topic: step,
      };
    }
    return null;
  }
  for (const sub of section.subsections || []) {
    const topic = (sub.topics || []).find((t) => t.id === topicId);
    if (topic) return { subsection: sub, topic };
  }
  return null;
}

export function countTopics(sections) {
  let n = 0;
  for (const section of sections) {
    if (section.kind === "guide") {
      n += (section.steps || []).length;
      continue;
    }
    for (const sub of section.subsections || []) {
      n += (sub.topics || []).length;
    }
  }
  return n;
}

export function clearCache() {
  cache.clear();
}
