const STORAGE_KEY = "webdev-ref-progress-v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { recent: [] };
    const parsed = JSON.parse(raw);
    return {
      recent: Array.isArray(parsed.recent) ? parsed.recent : [],
    };
  } catch {
    return { recent: [] };
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function addRecent(entry) {
  const state = loadState();
  const filtered = state.recent.filter(
    (r) => !(r.sectionId === entry.sectionId && r.topicId === entry.topicId)
  );
  filtered.unshift({
    sectionId: entry.sectionId,
    topicId: entry.topicId,
    title: entry.title,
    sectionTitle: entry.sectionTitle,
    href: entry.href,
    at: Date.now(),
  });
  state.recent = filtered.slice(0, 12);
  saveState(state);
  return state.recent;
}

export function getRecent() {
  return loadState().recent;
}
