let focusableSelector =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function buildSectionNav(registry, activeId) {
  const list = document.getElementById("nav-section-list");
  list.replaceChildren();
  for (const section of registry) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#/${section.hash || section.id}`;
    a.textContent = section.title;
    if (section.id === activeId) a.setAttribute("aria-current", "page");
    li.appendChild(a);
    list.appendChild(li);
  }
}

export function setActiveSection(activeId) {
  document.querySelectorAll("#nav-section-list a").forEach((a) => {
    const hash = a.getAttribute("href")?.replace("#/", "");
    if (hash === activeId) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

export function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("nav-backdrop");

  const close = () => {
    sidebar.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    backdrop.hidden = true;
    document.body.style.overflow = "";
  };

  const open = () => {
    sidebar.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation");
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    const focusables = sidebar.querySelectorAll(focusableSelector);
    if (focusables[0]) focusables[0].focus();
  };

  toggle.addEventListener("click", () => {
    if (sidebar.classList.contains("is-open")) close();
    else open();
  });

  backdrop.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("is-open")) {
      close();
      toggle.focus();
    }
  });

  sidebar.addEventListener("click", (e) => {
    if (e.target.closest("a") && window.matchMedia("(max-width: 900px)").matches) {
      close();
    }
  });

  return { open, close };
}

export function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  const onScroll = () => {
    btn.hidden = window.scrollY < 400;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  onScroll();
}

export function initTocSpy() {
  const toc = document.getElementById("subsection-toc");
  if (!toc) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = entry.target.id.replace(/^sub-/, "").replace(/^topic-/, "");
        toc.querySelectorAll("a").forEach((a) => {
          a.classList.toggle("is-active", a.dataset.subId === id);
        });
      }
    },
    { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
  );

  document.querySelectorAll(".subsection-block:not(.guide-section-block)").forEach((el) => observer.observe(el));
  document.querySelectorAll(".guide-step").forEach((el) => observer.observe(el));
  return observer;
}
