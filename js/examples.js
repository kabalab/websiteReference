function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function highlightHtml(code) {
  let s = escapeHtml(code);
  s = s.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="tok-comment">$1</span>');
  s = s.replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="tok-tag">$2</span>');
  s = s.replace(/([\w-:]+)=(&quot;[\s\S]*?&quot;)/g, '<span class="tok-attr">$1</span>=<span class="tok-string">$2</span>');
  return s;
}

function highlightCss(code) {
  let s = escapeHtml(code);
  s = s.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tok-comment">$1</span>');
  s = s.replace(/(^|[\n{;,])(\s*)([\w-]+)(\s*:)/gm, '$1$2<span class="tok-property">$3</span>$4');
  s = s.replace(/([.#]?[\w-]+)(\s*\{)/g, '<span class="tok-selector">$1</span>$2');
  s = s.replace(/(:\s*)([^;{}]+)/g, (m, a, b) => {
    if (b.includes("tok-")) return m;
    return a + `<span class="tok-string">${b}</span>`;
  });
  return s;
}

function highlightJs(code) {
  let s = escapeHtml(code);
  s = s.replace(/(\/\/.*$)/gm, '<span class="tok-comment">$1</span>');
  s = s.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tok-comment">$1</span>');
  s = s.replace(/(&quot;[\s\S]*?&quot;|'[\s\S]*?'|`[\s\S]*?`)/g, '<span class="tok-string">$1</span>');
  s = s.replace(/\b(const|let|var|function|return|if|else|for|while|class|new|typeof|await|async|try|catch|finally|throw|import|export|from|of|in|switch|case|break|continue|default|true|false|null|undefined)\b/g, '<span class="tok-keyword">$1</span>');
  s = s.replace(/\b(\d+\.?\d*)\b/g, '<span class="tok-number">$1</span>');
  return s;
}

export function highlight(code, language) {
  const lang = (language || "").toLowerCase();
  if (lang === "html" || lang === "xml") return highlightHtml(code);
  if (lang === "css") return highlightCss(code);
  if (lang === "javascript" || lang === "js") return highlightJs(code);
  return escapeHtml(code);
}

function autoSizeTextarea(ta) {
  ta.style.height = "auto";
  ta.style.height = `${Math.max(ta.scrollHeight, 72)}px`;
}

/**
 * Editable code editor with Copy + Reset.
 * @returns {{ wrap: HTMLElement, textarea: HTMLTextAreaElement }}
 */
export function createCodeBlock(code, language, { onReset } = {}) {
  const original = String(code ?? "");
  const wrap = document.createElement("div");
  wrap.className = "code-block";

  const header = document.createElement("div");
  header.className = "code-block-header";

  const lang = document.createElement("span");
  lang.className = "code-lang";
  lang.textContent = language || "code";

  const actions = document.createElement("div");
  actions.className = "code-block-actions";

  const copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.className = "copy-btn";
  copyBtn.textContent = "Copy";

  const resetBtn = document.createElement("button");
  resetBtn.type = "button";
  resetBtn.className = "copy-btn";
  resetBtn.textContent = "Reset";

  const ta = document.createElement("textarea");
  ta.className = "code-editor";
  ta.spellcheck = false;
  ta.value = original;
  ta.setAttribute("aria-label", `${language || "code"} editor`);

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(ta.value);
      copyBtn.textContent = "Copied!";
      copyBtn.classList.add("is-copied");
      setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.classList.remove("is-copied");
      }, 1500);
    } catch {
      copyBtn.textContent = "Failed";
      setTimeout(() => {
        copyBtn.textContent = "Copy";
      }, 1500);
    }
  });

  resetBtn.addEventListener("click", () => {
    ta.value = original;
    autoSizeTextarea(ta);
    onReset?.();
  });

  ta.addEventListener("input", () => autoSizeTextarea(ta));

  actions.append(copyBtn, resetBtn);
  header.append(lang, actions);
  wrap.append(header, ta);

  requestAnimationFrame(() => autoSizeTextarea(ta));

  return { wrap, textarea: ta };
}

function buildSrcdoc(files) {
  const htmlFile = files.find((f) => f.language === "html");
  const cssFile = files.find((f) => f.language === "css");
  const jsFile = files.find((f) => f.language === "javascript" || f.language === "js");

  const body = htmlFile ? htmlFile.code : "";
  const css = cssFile ? cssFile.code : "";
  const js = jsFile ? jsFile.code : "";

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  html, body { margin: 0; padding: 12px; font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; }
  img { max-width: 100%; height: auto; }
  ${css}
</style>
</head>
<body>
${body}
<script>
try {
${js}
} catch (err) {
  document.body.insertAdjacentHTML('beforeend', '<pre style="color:#b91c1c">' + String(err) + '</pre>');
}
<\/script>
</body>
</html>`;
}

function needsSandbox(files) {
  return files.some((f) => {
    const lang = (f.language || "").toLowerCase();
    return lang === "javascript" || lang === "js" || /on\w+\s*=|<script/i.test(f.code || "");
  });
}

export function createLiveExample(files, { label = "Live Example" } = {}) {
  const wrap = document.createElement("div");
  wrap.className = "live-example";

  const header = document.createElement("div");
  header.className = "live-example-label";
  header.innerHTML = `<span>${escapeHtml(label)}</span>`;

  wrap.appendChild(header);

  if (needsSandbox(files) || files.length > 1) {
    const iframe = document.createElement("iframe");
    iframe.className = "live-example-frame";
    iframe.title = label;
    iframe.setAttribute("sandbox", "allow-scripts allow-modals allow-forms");
    iframe.srcdoc = buildSrcdoc(files);
    iframe.addEventListener("load", () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        const h = Math.max(doc.body.scrollHeight, 80);
        iframe.style.height = `${Math.min(h + 24, 480)}px`;
      } catch {
        iframe.style.height = "160px";
      }
    });
    wrap.appendChild(iframe);
  } else {
    const htmlFile = files.find((f) => f.language === "html");
    const cssFile = files.find((f) => f.language === "css");
    const preview = document.createElement("div");
    preview.className = "live-example-preview";
    if (cssFile) {
      const style = document.createElement("style");
      const scope = `ex-${Math.random().toString(36).slice(2, 9)}`;
      preview.classList.add(scope);
      style.textContent = cssFile.code
        .replace(/(^|})\s*([^{@]+)\s*{/g, (m, brace, sel) => {
          const scoped = sel
            .split(",")
            .map((s) => `.${scope} ${s.trim()}`)
            .join(", ");
          return `${brace} ${scoped} {`;
        });
      preview.appendChild(style);
    }
    if (htmlFile) {
      const content = document.createElement("div");
      content.innerHTML = htmlFile.code;
      preview.appendChild(content);
    }
    wrap.appendChild(preview);
  }

  return wrap;
}

export function renderExampleFiles(container, useCase) {
  const files = useCase.files || [];
  if (!files.length) return;

  const editors = [];
  let renderPreview = null;

  const stack = document.createElement("div");
  stack.className = "multi-file-stack";

  for (const file of files) {
    const { wrap, textarea } = createCodeBlock(file.code, file.language, {
      onReset: () => renderPreview?.(),
    });
    editors.push({ language: file.language, textarea });
    stack.appendChild(wrap);
  }
  container.appendChild(stack);

  if (useCase.render) {
    const actions = document.createElement("div");
    actions.className = "example-run-actions";
    const runBtn = document.createElement("button");
    runBtn.type = "button";
    runBtn.className = "btn btn-primary btn-sm";
    runBtn.textContent = "Run";
    actions.appendChild(runBtn);

    const previewHost = document.createElement("div");

    renderPreview = () => {
      const nextFiles = editors.map(({ language, textarea }) => ({
        language,
        code: textarea.value,
      }));
      previewHost.replaceChildren(createLiveExample(nextFiles));
    };

    runBtn.addEventListener("click", renderPreview);
    renderPreview();
    container.append(actions, previewHost);
  }

  if (useCase.resultNote) {
    const note = document.createElement("p");
    note.className = "result-note";
    note.textContent = useCase.resultNote;
    container.appendChild(note);
  }
}
