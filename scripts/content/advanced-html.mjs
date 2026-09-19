export function buildAdvancedHtml({ elementTopic: t, htmlDemo: h, multiDemo }) {
  const sem = (id, title, summary, description, demo, extras = {}) =>
    t({
      id,
      title,
      tags: ["semantic", id],
      summary,
      description,
      whenToUse: extras.whenToUse ?? summary,
      whenNotToUse:
        extras.whenNotToUse ??
        "Do not use semantic tags only for styling — add CSS separately.",
      demos: demo ? [h(demo)] : [],
      tips: extras.tips ?? ["Semantics help screen readers and make CSS selectors clearer."],
      mistakes: extras.mistakes ?? [],
    });

  return {
    id: "advanced-html",
    title: "Advanced HTML",
    hash: "advanced-html",
    intro:
      "Go beyond basic tags: semantic page structure, native interactive widgets, media, stronger forms, data attributes, accessibility, and document metadata.",
    subsections: [
      {
        id: "semantic",
        title: "Semantic HTML",
        description: "Elements that describe the role of content regions.",
        topics: [
          t({
            id: "why-semantic",
            title: "Why semantic HTML matters",
            tags: ["semantic", "a11y"],
            summary: "Meaningful tags improve accessibility, SEO, and maintainability.",
            description:
              "Semantic HTML means choosing elements for what content is, not only how it looks. <nav> says “navigation,” <main> says “primary content,” <button> says “action.” Assistive technologies use these roles to help people move around. Search engines understand structure better. Future you can restyle a <header> without guessing what a sea of <div>s meant.",
            whenToUse: "Whenever a native element matches the content’s purpose.",
            whenNotToUse: "Do not invent fake structure — empty landmarks without content help no one.",
            demos: [
              h(
                "<header><h1>Site</h1></header>\n<nav><a href=\"#\">Home</a></nav>\n<main><article><h2>Post</h2><p>Body</p></article></main>\n<footer><p>©</p></footer>"
              ),
            ],
            tips: [
              "Prefer landmarks over anonymous divs for major regions.",
              "Sketch the outline first (header, nav, main, footer) before styling.",
            ],
            mistakes: [
              "Wrapping everything in <section> or <article> without a real theme.",
              "Using <div> for buttons or links instead of native interactive elements.",
            ],
          }),
          sem(
            "header",
            "<header>",
            "Introductory content for a page or section.",
            "A <header> typically contains branding, a title, and sometimes navigation. There can be multiple headers — one for the page and others inside articles or sections. It introduces what follows; it is not limited to the top of the viewport.",
            "<header><h1>News</h1><p>Daily updates</p></header>",
            {
              whenToUse: "Page or section introductions: titles, branding, and related lead-in content.",
              whenNotToUse: "As a generic wrapper for anything near the top of the screen.",
              tips: [
                "A site can have a page <header> and each <article> can have its own.",
                "Put global nav in <header> or a sibling <nav> — either is fine if the structure is clear.",
              ],
              mistakes: [
                "Assuming only one <header> is allowed on a page.",
                "Using <header> only for CSS sticky bars with no introductory content.",
              ],
            }
          ),
          sem(
            "nav",
            "<nav>",
            "A section of major navigation links.",
            "Reserve <nav> for primary or important navigation blocks, not every group of links. Landmark navigation helps skip links and screen reader landmark lists. Footer link lists and in-article “see also” links often do not need their own <nav>.",
            "<nav><a href=\"/\">Home</a> · <a href=\"/about\">About</a></nav>",
            {
              whenToUse: "Main site menus, table-of-contents blocks, and other major wayfinding.",
              whenNotToUse: "Every cluster of links — overusing <nav> dilutes the landmark.",
              tips: [
                "One or two <nav> landmarks per page is usually enough.",
                "Give complex navs a clear heading or aria-label if the purpose is not obvious.",
              ],
              mistakes: [
                "Wrapping the entire page in <nav>.",
                "Putting non-link chrome (ads, forms) inside <nav> without need.",
              ],
            }
          ),
          sem(
            "main",
            "<main>",
            "The dominant content unique to this document.",
            "There should be only one visible <main> per page. It holds the unique page content and excludes repeated site chrome like global nav and site-wide footers. Screen reader users often jump straight to <main> to skip headers.",
            "<main><h1>Article title</h1><p>Unique page content…</p></main>",
            {
              whenToUse: "The primary content that makes this page different from others.",
              whenNotToUse: "Repeated layout chrome (global header, footer, side nav).",
              tips: [
                "Keep global navigation and site footer outside <main>.",
                "Pair <main> with a clear page <h1> for a strong outline.",
              ],
              mistakes: [
                "Multiple visible <main> elements on one page.",
                "Leaving the unique article body outside <main> while wrapping chrome inside it.",
              ],
            }
          ),
          sem(
            "section",
            "<section>",
            "A thematic grouping, usually with a heading.",
            "Use <section> for distinct chapters of content that share a theme. Each section should usually start with a heading so the outline makes sense. If you only need a styled box with no thematic meaning, a <div> is fine.",
            "<section><h2>Features</h2><p>Details…</p></section>",
            {
              whenToUse: "Themed chunks of a page that deserve their own heading.",
              whenNotToUse: "Purely for layout or styling hooks with no shared topic.",
              tips: [
                "Ask “would this section title make sense in a table of contents?”",
                "Prefer <div> when the wrapper exists only for Flexbox or Grid.",
              ],
              mistakes: [
                "Nesting empty <section>s just to match a design’s boxes.",
                "Skipping headings inside sections so assistive tech cannot name them.",
              ],
            }
          ),
          sem(
            "article",
            "<article>",
            "A self-contained composition that could stand alone.",
            "Blog posts, news items, product cards, and comments that make sense by themselves fit <article>. Nesting articles is allowed when one composition embeds another (for example, a post with comment articles). If the content only makes sense in place, prefer <section> or a plain <div>.",
            "<article><h2>Release notes</h2><p>Version 2.0 ships…</p></article>",
            {
              whenToUse: "Reusable or syndicatable pieces: posts, stories, widgets with their own identity.",
              whenNotToUse: "Arbitrary layout regions that are not self-contained.",
              tips: [
                "Give each article a heading that would still make sense if shared alone.",
                "Use <article> for cards only when the card is a complete unit, not a layout shell.",
              ],
              mistakes: [
                "Marking every grid cell as <article> without standalone meaning.",
                "Confusing <article> with “a piece of writing” only — interactive widgets can qualify too.",
              ],
            }
          ),
          sem(
            "aside",
            "<aside>",
            "Content tangentially related to its surroundings.",
            "Sidebars, pull quotes, related links, and callout notes often fit <aside>. It marks complementary content, not a required reading path. It does not have to sit visually on the side — CSS can place it anywhere.",
            "<aside><h2>Related</h2><p>Also read…</p></aside>",
            {
              whenToUse: "Related material that supports the main flow without being required.",
              whenNotToUse: "Primary content that every user must read to understand the page.",
              tips: [
                "If removing the aside would break comprehension, it probably is not an aside.",
                "Head the aside when it contains more than a short note.",
              ],
              mistakes: [
                "Using <aside> only because the design has a left or right column.",
                "Putting the main article body inside <aside>.",
              ],
            }
          ),
          sem(
            "footer",
            "<footer>",
            "Footer for a page or section.",
            "Page footers often include copyright, secondary links, and contact hints. Articles and sections can have their own footers for author bylines, tags, or related meta. Like <header>, footers are about role, not only screen position.",
            "<footer><small>© 2026 Example</small></footer>",
            {
              whenToUse: "Closing info for a page, article, or section.",
              whenNotToUse: "As a second main content area stuffed with primary copy.",
              tips: [
                "Article footers are great for author, date, and related tags.",
                "Keep site-wide footer links out of <main>.",
              ],
              mistakes: [
                "Assuming a page may have only one <footer>.",
                "Dumping unrelated marketing blocks into every section footer.",
              ],
            }
          ),
          sem(
            "address",
            "<address>",
            "Contact information for a person or organization.",
            "Use <address> for contact details related to the nearest <article> or the site’s author/owner — email, social profile, or mailing contact. It is not a generic wrapper for every postal address that appears in body copy (for example, a list of store locations in an article).",
            "<address>Email: <a href=\"mailto:hi@example.com\">hi@example.com</a></address>",
            {
              whenToUse: "Author or organization contact blocks tied to the page or article.",
              whenNotToUse: "Every street address mentioned in narrative content.",
              tips: [
                "Place page-level contact <address> in the site footer when it represents the site owner.",
                "Links (mailto, tel) inside <address> are encouraged.",
              ],
              mistakes: [
                "Wrapping arbitrary paragraphs in <address> for italic default styling.",
                "Using <address> for venue addresses in an event listing when they are not contact-for-author info.",
              ],
            }
          ),
          t({
            id: "time",
            title: "<time>",
            tags: ["semantic", "time"],
            summary: "Represents a date, time, or duration with an optional machine-readable value.",
            description:
              "The <time> element marks dates and times for humans and machines. Put a friendly phrase in the element text and an unambiguous value in the datetime attribute (for example ISO dates). That helps browsers, search engines, and scripts while keeping readable copy for people.",
            whenToUse: "Publishing dates, event times, schedules.",
            whenNotToUse: "For relative phrases with no clear timestamp if you cannot provide datetime.",
            demos: [h('<p>Published <time datetime="2026-09-18">September 18, 2026</time></p>')],
            tips: [
              "Always pair human text with datetime when the exact moment matters.",
              "Use a consistent timezone strategy for events (include offset in datetime when needed).",
            ],
            mistakes: [
              "Putting the pretty text in datetime and leaving the element empty of meaning.",
              "Using <time> for vague phrases like “recently” with no machine value.",
            ],
          }),
        ],
      },
      {
        id: "interactive",
        title: "Interactive HTML",
        description: "Built-in widgets that work without custom JavaScript frameworks.",
        topics: [
          t({
            id: "button-advanced",
            title: "<button> (advanced notes)",
            tags: ["button", "interactive"],
            summary: "Native buttons support types, disabled state, and form association.",
            description:
              "Buttons can submit or reset forms, or use type=\"button\" for scripted actions that should not submit. The disabled attribute prevents interaction and is announced to assistive tech. The form=\"id\" attribute associates a button with a form elsewhere in the page. Prefer native buttons for actions — they are keyboard accessible by default.",
            whenToUse: "UI actions and form submission.",
            whenNotToUse: "Navigation between pages — use links.",
            demos: [
              h(
                '<button type="button" onclick="this.textContent=\'Clicked!\'">Click</button>',
                "Stateful button demo",
                "",
                { tryIt: true }
              ),
            ],
            tips: [
              "Default type inside a form is submit — set type=\"button\" for non-submitting controls.",
              "Use form=\"formId\" when the button lives outside the <form> element.",
            ],
            mistakes: [
              "Using <a href=\"#\"> or a <div> with a click handler instead of <button>.",
              "Forgetting type=\"button\" and accidentally submitting a parent form.",
            ],
          }),
          t({
            id: "details",
            title: "<details>",
            tags: ["interactive"],
            summary: "A disclosure widget the user can open and close.",
            description:
              "<details> hides content until the user expands it. Pair it with a <summary> child as the clickable label. The open attribute can start it expanded. It is ideal for FAQs and optional detail without writing disclosure JavaScript.",
            whenToUse: "Progressive disclosure of optional content.",
            whenNotToUse: "Critical information that must always be visible.",
            demos: [
              h(
                "<details>\n  <summary>More information</summary>\n  <p>Hidden until expanded — no JavaScript required.</p>\n</details>",
                "",
                "",
                { tryIt: true }
              ),
            ],
            tips: [
              "Write summary labels that still make sense when the panel is closed.",
              "Nest content freely inside details — paragraphs, lists, even forms when appropriate.",
            ],
            mistakes: [
              "Hiding required instructions or legal text inside closed details.",
              "Omitting <summary>, which makes the control unclear.",
            ],
          }),
          t({
            id: "summary",
            title: "<summary>",
            tags: ["interactive"],
            summary: "The label for a details disclosure.",
            description:
              "Put <summary> as a child of <details>. It is the control users activate to expand or collapse the rest of the details content. Keep the label short and descriptive; longer explanations belong in the revealed body.",
            whenToUse: "Always with details.",
            whenNotToUse: "Outside details.",
            demos: [h("<details><summary>Label</summary><p>Content</p></details>")],
            tips: [
              "Prefer plain language over “Click here.”",
              "You can style summary, but keep a clear open/closed affordance.",
            ],
            mistakes: [
              "Placing <summary> outside of <details>.",
              "Stuffing the entire answer into the summary so nothing is left to disclose.",
            ],
          }),
          t({
            id: "dialog",
            title: "<dialog>",
            tags: ["interactive"],
            summary: "A native modal or non-modal dialog element.",
            description:
              "The <dialog> element supports show(), showModal(), and close() via JavaScript. Modal dialogs trap focus and dim the background with the browser’s backdrop. Always provide a clear close action and restore focus to the opener when the dialog closes. Check browser support for your audience.",
            whenToUse: "Modals, confirmations, and lightweight overlays.",
            whenNotToUse: "Simple inline notes — prefer details or plain text.",
            demos: [
              multiDemo(
                [
                  {
                    language: "html",
                    code: '<button id="open">Open dialog</button>\n<dialog id="dlg">\n  <p>Native dialog demo</p>\n  <button id="close">Close</button>\n</dialog>',
                  },
                  {
                    language: "javascript",
                    code: 'const d=document.getElementById("dlg");\ndocument.getElementById("open").onclick=()=>d.showModal();\ndocument.getElementById("close").onclick=()=>d.close();',
                  },
                ],
                "Modal dialog",
                "Click Open, then Close.",
                { tryIt: true }
              ),
            ],
            tips: [
              "Use showModal() for true modals; show() for non-modal dialogs.",
              "Listen for the cancel event (Escape) if you need to run cleanup logic.",
            ],
            mistakes: [
              "Opening a dialog with CSS only and skipping focus management.",
              "No close button or Escape path, trapping keyboard users.",
            ],
          }),
          t({
            id: "progress",
            title: "<progress>",
            tags: ["interactive"],
            summary: "Shows completion progress of a task.",
            description:
              "Use <progress value=\"70\" max=\"100\"> for determinate progress toward a goal. Omit value for an indeterminate busy state while work is ongoing. Include visible text or an accessible name so the percentage is clear beyond the visual bar.",
            whenToUse: "Uploads, multi-step completion meters.",
            whenNotToUse: "Static gauges of arbitrary measures — consider meter.",
            demos: [h('<label>Loading <progress value="35" max="100">35%</progress></label>')],
            tips: [
              "Update value from JavaScript as the task advances.",
              "Wrap with a label or aria-label so the purpose is announced.",
            ],
            mistakes: [
              "Using <progress> for static scores or disk usage — that is <meter>.",
              "Leaving only a bare bar with no text alternative for the current value.",
            ],
          }),
          t({
            id: "meter",
            title: "<meter>",
            tags: ["interactive"],
            summary: "A scalar measurement within a known range (disk usage, scores).",
            description:
              "<meter> represents a value within a known range using attributes like min, max, value, low, high, and optimum. It is a gauge, not a “task still running” indicator — use <progress> for that. Visual styling support varies across browsers, so keep fallback text inside the element.",
            whenToUse: "Known-range measurements.",
            whenNotToUse: "Task completion — use progress.",
            demos: [h('<label>Score <meter min="0" max="100" value="80" low="40" high="75" optimum="90">80</meter></label>')],
            tips: [
              "Set low, high, and optimum when those thresholds matter for interpretation.",
              "Always include readable text content as a fallback.",
            ],
            mistakes: [
              "Using <meter> as a loading bar.",
              "Omitting max/min so the gauge has no clear scale.",
            ],
          }),
        ],
      },
      {
        id: "media",
        title: "Media",
        description: "Audio, video, and embedded documents.",
        topics: [
          t({
            id: "audio",
            title: "<audio>",
            tags: ["media"],
            summary: "Embeds sound content with optional native controls.",
            description:
              "Use the controls attribute to show the browser’s play UI. Multiple <source> children enable format fallbacks when codecs differ. Prefer user-started playback; autoplaying sound is disruptive and often blocked. Always provide fallback text for browsers that cannot play the file.",
            whenToUse: "Podcasts, sound clips with user-initiated playback.",
            whenNotToUse: "Surprise autoplay audio.",
            demos: [
              h(
                "<p>Audio needs a real file src in projects. Pattern:</p>\n<pre>&lt;audio controls src=\"sound.mp3\"&gt;Your browser does not support audio.&lt;/audio&gt;</pre>"
              ),
            ],
            tips: [
              "Offer at least one widely supported format (often MP3) when you control encoding.",
              "Keep preload modest on content-heavy pages to save bandwidth.",
            ],
            mistakes: [
              "Autoplaying loud audio on page load.",
              "Shipping only one obscure codec with no fallback source.",
            ],
          }),
          t({
            id: "video",
            title: "<video>",
            tags: ["media"],
            summary: "Embeds video with native controls and optional poster image.",
            description:
              "Use <video controls> with width and an optional poster image for the first frame. Add multiple <source> children for format fallbacks. If autoplay is required for a decorative background, mute it — browsers block unmuted autoplay. Provide captions with <track> for spoken content.",
            whenToUse: "Course videos, demos, media content.",
            whenNotToUse: "Heavy autoplaying videos that block content.",
            demos: [
              h(
                "<p>Typical pattern:</p>\n<pre>&lt;video controls width=\"400\" poster=\"poster.jpg\"&gt;\n  &lt;source src=\"movie.mp4\" type=\"video/mp4\"&gt;\n  Fallback text\n&lt;/video&gt;</pre>"
              ),
            ],
            tips: [
              "A poster image avoids a black box before playback.",
              "Compress and resize videos; huge files hurt mobile users.",
            ],
            mistakes: [
              "Autoplaying with sound on landing pages.",
              "Skipping captions on instructional or spoken video.",
            ],
          }),
          t({
            id: "source",
            title: "<source>",
            tags: ["media"],
            summary: "Specifies media resources for audio/video/picture with type hints.",
            description:
              "Browsers pick the first compatible <source> inside audio, video, or picture. Provide a type attribute so the browser can skip unsupported formats quickly. Order matters: list preferred formats first, then fallbacks.",
            whenToUse: "Multiple format fallbacks.",
            whenNotToUse: "When a single widely supported file is enough and simplicity wins.",
            demos: [h("<p>Use inside audio/video/picture elements.</p>")],
            tips: [
              "Include type=\"video/mp4\" (and similar) to avoid unnecessary downloads.",
              "Test the fallback path by temporarily breaking the first source URL.",
            ],
            mistakes: [
              "Putting <source> outside of audio, video, or picture.",
              "Listing only exotic formats that common browsers cannot play.",
            ],
          }),
          t({
            id: "track",
            title: "<track>",
            tags: ["media", "a11y"],
            summary: "Timed text tracks such as captions and subtitles for video.",
            description:
              "Pair WebVTT files with <track kind=\"captions\" srclang=\"en\" src=\"captions.vtt\" default>. Captions help deaf and hard-of-hearing viewers and anyone in a noisy or quiet place. Subtitles and descriptions use other kind values when you need them.",
            whenToUse: "Any meaningful spoken video content.",
            whenNotToUse: "Skipping captions for production videos.",
            tips: [
              "Mark the default track so captions can start available.",
              "Keep VTT timing in sync after you edit the video length.",
            ],
            mistakes: [
              "Shipping video with no captions because “most users turn them off.”",
              "Wrong srclang so players label the track incorrectly.",
            ],
          }),
          t({
            id: "iframe",
            title: "<iframe>",
            tags: ["media", "security"],
            summary: "Embeds another HTML page in a nested browsing context.",
            description:
              "Iframes embed maps, videos, or sandboxed demos inside your page. Always consider security: use sandbox when embedding untrusted content, set sensible allow permissions, and give a title for accessibility. Prefer trusted providers and review what scripts the embed runs.",
            whenToUse: "Trusted embeds and isolated demos.",
            whenNotToUse: "As a general layout tool.",
            demos: [
              h(
                '<iframe title="Example embed" srcdoc="<p style=\'font-family:sans-serif\'>Hello from inside an iframe</p>" width="100%" height="80"></iframe>'
              ),
            ],
            tips: [
              "Always set a descriptive title on iframes.",
              "Start with a strict sandbox and only add permissions you need.",
            ],
            mistakes: [
              "Using iframes to stitch whole site layouts together.",
              "Embedding untrusted pages without sandbox restrictions.",
            ],
            advanced: ["sandbox=\"allow-scripts\" enables scripts without same-origin parent access."],
          }),
          t({
            id: "media-security-a11y",
            title: "Media security & accessibility",
            tags: ["media", "a11y", "security"],
            summary: "Captions, transcripts, autoplay policy, and embed trust.",
            description:
              "Provide captions and transcripts for spoken media. Do not autoplay sound. Title every iframe and prefer privacy-enhanced embed options when hosts offer them. Compress media for performance, and remember third-party players can track users or inject scripts.",
            whenToUse: "Any production media.",
            whenNotToUse: "Ignoring a11y for “internal-only” demos that later go public.",
            tips: [
              "If it speaks, caption it.",
              "If it embeds third parties, review privacy.",
            ],
            mistakes: [
              "Relying on autoplay for essential information.",
              "Copy-pasting embed code without checking tracking or cookie behavior.",
            ],
          }),
        ],
      },
      {
        id: "advanced-forms",
        title: "Advanced forms",
        description: "Validation, submission mechanics, and layout patterns.",
        topics: [
          t({
            id: "form-validation",
            title: "Form validation",
            tags: ["forms"],
            summary: "Browsers can check required fields and types before submit.",
            description:
              "Built-in constraint validation uses required, type, min/max, pattern, and related attributes. Invalid fields block submit and show browser messages. JavaScript can call setCustomValidity for custom rules and checkValidity for manual checks. Always validate again on the server when a backend exists — client checks are for UX, not security.",
            whenToUse: "Any user input that must meet rules.",
            whenNotToUse: "Client-only checks as your only security boundary for important data.",
            demos: [
              h(
                '<form onsubmit="event.preventDefault(); if(this.checkValidity()) alert(\'Valid!\');">\n  <label>Age <input type="number" min="1" max="120" required></label>\n  <button>Validate</button>\n</form>',
                "",
                "",
                { tryIt: true }
              ),
            ],
            tips: [
              "Use type=\"email\" and type=\"url\" before inventing complex patterns.",
              "Surface clear error text near the field, not only the browser balloon.",
            ],
            mistakes: [
              "Trusting client validation alone for sensitive or paid actions.",
              "Disabling validation with novalidate without replacing it.",
            ],
          }),
          t({
            id: "validation-attributes",
            title: "Validation attributes",
            tags: ["forms"],
            summary: "required, min, max, minlength, maxlength, pattern, and type constraints.",
            description:
              "These attributes declare constraints in markup so the browser can enforce them. pattern uses a regular expression for text fields. Combine constraints with clear labels and helpful error copy. Prefer the loosest rule that still protects data quality — harsh patterns reject real names and addresses.",
            whenToUse: "Declarative checks that match your data rules.",
            whenNotToUse: "Overly strict patterns that reject valid real-world input.",
            demos: [
              h('<label>Username <input required minlength="3" maxlength="12" pattern="[a-z0-9_]+"></label>'),
            ],
            tips: [
              "Test your pattern with edge cases: spaces, accents, and long values.",
              "min and max on numbers beat free-text checks when the value is numeric.",
            ],
            mistakes: [
              "Copying a regex from the internet without testing it.",
              "Using maxlength alone as the only feedback — explain the limit in the label or hint.",
            ],
          }),
          t({
            id: "autocomplete",
            title: "autocomplete",
            tags: ["forms"],
            summary: "Helps browsers autofill known user information securely.",
            description:
              "Values like autocomplete=\"name\", email, username, and current-password help browsers and password managers fill forms correctly. Matching tokens to the real field purpose improves accuracy and security. autocomplete=\"off\" is sometimes ignored on login fields by design so managers can still help.",
            whenToUse: "Common personal data fields.",
            whenNotToUse: "One-time codes where autofill would be wrong — use appropriate autocomplete tokens.",
            demos: [h('<label>Email <input type="email" name="email" autocomplete="email"></label>')],
            tips: [
              "Use the standardized tokens (email, street-address, tel) instead of inventing names.",
              "Pair autocomplete with correct type and name attributes for best results.",
            ],
            mistakes: [
              "Labeling a new-password field as current-password (or the reverse).",
              "Turning autocomplete off site-wide and frustrating password managers.",
            ],
          }),
          t({
            id: "enctype",
            title: "enctype",
            tags: ["forms"],
            summary: "How form data is encoded on submit.",
            description:
              "The default application/x-www-form-urlencoded suits most text-only forms. Use multipart/form-data when the form includes file inputs so binary data can upload. text/plain is rarely useful for real backends. The server must expect the same encoding you send.",
            whenToUse: "multipart/form-data for file uploads.",
            whenNotToUse: "Changing enctype without a reason.",
            tips: [
              "Any <input type=\"file\"> usually means multipart/form-data on the form.",
              "Confirm your framework or API docs for the expected content type.",
            ],
            mistakes: [
              "Uploading files with the default urlencoded encoding.",
              "Setting multipart on every form “just in case,” which complicates simple text posts.",
            ],
          }),
          t({
            id: "method-action",
            title: "method and action",
            tags: ["forms"],
            summary: "Where the form sends data and which HTTP method it uses.",
            description:
              "action is the URL that receives the submission. method=\"get\" puts data in the query string and fits searches and filters. method=\"post\" sends data in the request body and fits creating or changing data. Static GitHub Pages hosting cannot process posts by itself — you need an external form service or backend.",
            whenToUse: "Real submissions to a backend or form service.",
            whenNotToUse: "Expecting GitHub Pages alone to email you form posts.",
            demos: [h('<form action="https://example.com/search" method="get"><input name="q"><button>Search</button></form>')],
            tips: [
              "GET submissions are bookmarkable — handy for search results.",
              "Use POST for passwords and anything that changes server state.",
            ],
            mistakes: [
              "Putting secrets in a GET query string.",
              "Leaving action empty and assuming a static host will handle POST.",
            ],
          }),
          t({
            id: "form-submission",
            title: "Form submission",
            tags: ["forms"],
            summary: "Submit via submit buttons, Enter key, or requestSubmit().",
            description:
              "Submitting gathers successful controls’ names and values into the request (or into FormData in JavaScript). Users can submit with a submit button or often by pressing Enter in a text field. Listen for the submit event, call preventDefault() when you handle data with fetch, then send it yourself. Understanding this flow comes before building custom form UX.",
            whenToUse: "Collecting and sending user input.",
            whenNotToUse: "Replacing working native submit with brittle click-only handlers.",
            demos: [
              multiDemo(
                [
                  {
                    language: "html",
                    code: '<form id="f"><label>Name <input name="name" required></label> <button>Send</button></form><pre id="out"></pre>',
                  },
                  {
                    language: "javascript",
                    code: 'document.getElementById("f").addEventListener("submit", (e) => {\n  e.preventDefault();\n  const data = new FormData(e.target);\n  document.getElementById("out").textContent = JSON.stringify(Object.fromEntries(data));\n});',
                  },
                ],
                "Read FormData in JS",
                "",
                { tryIt: true }
              ),
            ],
            tips: [
              "Handle the form’s submit event, not only the button’s click.",
              "FormData respects successful controls the same way a normal submit does.",
            ],
            mistakes: [
              "Listening only to button click and missing Enter-key submits.",
              "Calling preventDefault too late after an await — do it synchronously first.",
            ],
          }),
          t({
            id: "custom-form-layouts",
            title: "Custom form layouts",
            tags: ["forms", "css"],
            summary: "Structure forms with semantic HTML, then lay them out with CSS.",
            description:
              "Build forms with labels, fieldsets, and sensible grouping first. Then use Flexbox or Grid for responsive layout. Keep tab order aligned with visual order, and place error messages next to the fields they describe. Avoid using tables as the primary form layout technique.",
            whenToUse: "Multi-field forms on real sites.",
            whenNotToUse: "Tables as the primary form layout technique.",
            demos: [
              multiDemo(
                [
                  {
                    language: "html",
                    code: '<form class="grid-form">\n  <label>First <input name="first"></label>\n  <label>Last <input name="last"></label>\n  <label class="full">Email <input type="email" name="email"></label>\n</form>',
                  },
                  {
                    language: "css",
                    code: ".grid-form{display:grid;gap:0.75rem;grid-template-columns:1fr 1fr;max-width:420px}\n.grid-form .full{grid-column:1/-1}\nlabel{display:flex;flex-direction:column;gap:0.25rem;font-family:sans-serif;font-size:14px}",
                  },
                ],
                "CSS grid form"
              ),
            ],
            tips: [
              "Stack to one column on narrow screens; expand to two when space allows.",
              "Wrap each control in its <label> or use for/id pairs consistently.",
            ],
            mistakes: [
              "Reordering fields visually with CSS so tab order jumps around.",
              "Using placeholder text as the only label to save space.",
            ],
          }),
        ],
      },
      {
        id: "data-attributes",
        title: "Data attributes",
        description: "Store custom data on elements for CSS and JavaScript.",
        topics: [
          t({
            id: "data-attributes",
            title: "data-* attributes",
            tags: ["data"],
            summary: "Custom attributes prefixed with data- for embedding extra info.",
            description:
              "Attributes like data-user-id=\"123\" store custom values on elements without inventing invalid attributes. In JavaScript, element.dataset.userId exposes them with camelCase names. Use them for small hooks and configuration — not for secrets, large JSON blobs, or data that belongs on the server.",
            whenToUse: "Hooking UI elements to identifiers for scripts.",
            whenNotToUse: "As a replacement for proper databases or sensitive tokens.",
            syntax: '<button data-user-id="123">User</button>',
            demos: [h('<button data-user-id="123">User</button>')],
            tips: [
              "Keep values small and serializable as strings.",
              "Name attributes with purpose: data-product-id beats data-x.",
            ],
            mistakes: [
              "Storing API keys or session tokens in data-* attributes.",
              "Using data-id when a real id or server round-trip would be safer.",
            ],
          }),
          t({
            id: "data-with-js",
            title: "Using data attributes with JavaScript",
            tags: ["data", "javascript"],
            summary: "Read dataset values in event handlers.",
            description:
              "element.dataset maps data-* attributes into a readable object. Combined with event delegation, one listener can read which item was clicked from data attributes on the target. This keeps markup declarative and scripts reusable across many similar elements.",
            whenToUse: "Delegated click handlers and configurable widgets.",
            whenNotToUse: "Extremely large JSON blobs in attributes.",
            demos: [
              multiDemo(
                [
                  {
                    language: "html",
                    code: '<button data-user-id="123">User</button>\n<p id="out"></p>',
                  },
                  {
                    language: "javascript",
                    code: 'document.querySelector("button").addEventListener("click", (e) => {\n  document.getElementById("out").textContent = "User ID: " + e.currentTarget.dataset.userId;\n});',
                  },
                ],
                "Read data-user-id",
                "",
                { tryIt: true }
              ),
            ],
            tips: [
              "data-user-id becomes dataset.userId — watch the camelCase conversion.",
              "Prefer currentTarget in handlers so you read the element that owns the listener.",
            ],
            mistakes: [
              "JSON.parse on every click for huge payloads stored in attributes.",
              "Typos between the HTML attribute name and the dataset key you read.",
            ],
          }),
        ],
      },
      {
        id: "ids-classes",
        title: "IDs and classes",
        description: "Hook elements for CSS, JS, and in-page links.",
        topics: [
          t({
            id: "id-attribute",
            title: "id",
            tags: ["id"],
            summary: "A unique identifier for one element on the page.",
            description:
              "An id must be unique in the document. It enables #fragment links, getElementById, label for references, and CSS #id selectors. Choose stable, meaningful names that will not collide when the page grows.",
            whenToUse: "Unique targets and JS hooks that need one element.",
            whenNotToUse: "Repeating the same id on multiple elements.",
            demos: [h('<p id="intro">Unique intro paragraph</p>')],
            tips: [
              "Use ids for in-page anchors and label/input pairing.",
              "Prefer classes for repeated styling; keep ids scarce.",
            ],
            mistakes: [
              "Duplicating the same id on several elements.",
              "Starting ids with a number or including spaces.",
            ],
          }),
          t({
            id: "class-attribute",
            title: "class",
            tags: ["class"],
            summary: "One or more reusable labels for styling and scripting.",
            description:
              "Classes can appear on many elements and an element can have several space-separated classes. CSS .class selectors and querySelectorAll(\".class\") rely on them. Treat classes as a shared styling and behavior vocabulary, not as one-off unique ids.",
            whenToUse: "Shared styling patterns.",
            whenNotToUse: "Encoding unique database ids as the only class name without need.",
            demos: [
              multiDemo(
                [
                  { language: "html", code: '<p class="note important">Classed paragraph</p>' },
                  { language: "css", code: ".note{padding:0.5rem;border-left:3px solid #2563eb}.important{font-weight:700}" },
                ],
                "Multiple classes"
              ),
            ],
            tips: [
              "Compose small utility or component classes instead of one giant class per element.",
              "Keep naming consistent (for example BEM or another clear scheme).",
            ],
            mistakes: [
              "Putting unique database keys only in class when id or data-* fits better.",
              "Creating a new class for every one-off style with no reuse plan.",
            ],
          }),
          t({
            id: "id-vs-class",
            title: "id versus class",
            tags: ["id", "class"],
            summary: "Ids are unique hooks; classes are reusable categories.",
            description:
              "Rule of thumb: classes for styling systems and repeated patterns; ids for unique page targets and fragment links. CSS #id is more specific than .class, which makes overrides harder later. Many teams style almost everything with classes and reserve ids for anchors and JS hooks.",
            whenToUse: "Choose based on uniqueness and purpose.",
            whenNotToUse: "Styling everything with ids.",
            tips: [
              "If it appears more than once, it should not be an id.",
              "When in doubt for CSS, start with a class.",
            ],
            mistakes: [
              "Building a whole stylesheet out of #ids and fighting specificity.",
              "Using the same string as both a unique id and a reusable class carelessly.",
            ],
          }),
        ],
      },
      {
        id: "accessibility",
        title: "Accessibility",
        description: "Make pages usable for more people, including assistive technology users.",
        topics: [
          t({
            id: "a11y-overview",
            title: "Accessibility overview",
            tags: ["a11y"],
            summary: "Accessibility (a11y) means designing so people can perceive, operate, and understand your UI.",
            description:
              "People browse with keyboards, screen readers, zoom, voice control, and more. Accessible sites start with semantic HTML, proper labels, visible focus, captions, and enough contrast. Treat accessibility as part of quality from the first layout — retrofits are harder and usually incomplete.",
            whenToUse: "Every project.",
            whenNotToUse: "Treating a11y as a final polish checklist only — build it in.",
            tips: [
              "Test with the keyboard alone before you add complex widgets.",
              "Fix semantics first; add ARIA only when native HTML is not enough.",
            ],
            mistakes: [
              "Assuming “it looks fine for me” means it works for everyone.",
              "Bolting on ARIA at the end to paper over div-based UI.",
            ],
          }),
          t({
            id: "semantic-a11y",
            title: "Semantic HTML for accessibility",
            tags: ["a11y", "semantic"],
            summary: "Correct elements give assistive tech the right roles for free.",
            description:
              "Headings create a navigable outline. Lists announce item counts. Buttons activate with Enter and Space. Links announce as links and support open-in-new-tab patterns users expect. Replacing these with div soup forces you to rebuild behavior with ARIA and scripts — more work and easier to get wrong.",
            whenToUse: "Always prefer native semantics first.",
            whenNotToUse: "ARIA to fix bad structure when a native element exists.",
            tips: [
              "If a native element exists for the job, use it.",
              "Check the heading order (h1–h3…) like a table of contents.",
            ],
            mistakes: [
              "Clickable <div>s without roles, keyboard support, or names.",
              "Skipping heading levels for visual size instead of using CSS.",
            ],
          }),
          t({
            id: "alt-text",
            title: "Alternative text",
            tags: ["a11y", "images"],
            summary: "Describe meaningful images; mark decorative images with empty alt.",
            description:
              "Write alt text that communicates the image’s purpose in context — what someone would miss if the image were gone. For complex charts, add a longer summary nearby or in the page text. Decorative images should use alt=\"\" so screen readers skip them.",
            whenToUse: "All img elements.",
            whenNotToUse: "Keyword stuffing.",
            tips: [
              "Describe the meaning, not every pixel.",
              "Empty alt=\"\" is correct for purely decorative images.",
            ],
            mistakes: [
              "Omitting alt entirely (assistive tech may read the filename).",
              "Writing alt=\"image\" or repeating the caption verbatim without purpose.",
            ],
          }),
          t({
            id: "labels-a11y",
            title: "Labels",
            tags: ["a11y", "forms"],
            summary: "Visible labels are essential for form fields.",
            description:
              "Every input needs an accessible name, usually via a visible <label> tied with for/id or by wrapping the control. Placeholders disappear when typing and are not reliable labels. Group related radios and checkboxes with fieldset and legend so the question is announced with the options.",
            whenToUse: "Every input users must understand.",
            whenNotToUse: "Icon-only fields without accessible names.",
            tips: [
              "Clicking the label text should focus the control — that confirms the association.",
              "Keep labels visible; floating labels need extra care to stay accessible.",
            ],
            mistakes: [
              "Placeholder-only “labels.”",
              "Orphan labels that do not match any control id.",
            ],
          }),
          t({
            id: "keyboard-nav",
            title: "Keyboard navigation",
            tags: ["a11y"],
            summary: "Everything interactive should work without a mouse.",
            description:
              "Tab moves focus, Enter and Space activate buttons, and Escape often closes dialogs. Custom widgets must implement the same keyboard patterns users already know. Avoid tabindex values greater than 0 — they create a confusing focus order that is hard to maintain.",
            whenToUse: "All interactive UI.",
            whenNotToUse: "Positive tabindex spaghetti.",
            tips: [
              "Use tabindex=\"0\" only when you must make a non-interactive element focusable.",
              "Tab through your page after every UI change.",
            ],
            mistakes: [
              "Mouse-only controls with no keyboard path.",
              "tabindex=\"1\", \"2\", \"3\"… fighting the natural DOM order.",
            ],
          }),
          t({
            id: "focus",
            title: "Focus",
            tags: ["a11y"],
            summary: "Keyboard users need a visible focus indicator.",
            description:
              "Never remove outline without providing a clearer :focus-visible style. When opening a modal, move focus into it; when closing, restore focus to the control that opened it. Visible focus is how keyboard users know where they are on the page.",
            whenToUse: "All sites.",
            whenNotToUse: "outline: none with no replacement.",
            demos: [
              multiDemo(
                [
                  { language: "html", code: '<button class="focus-demo">Tab to me</button>' },
                  {
                    language: "css",
                    code: ".focus-demo:focus-visible{outline:3px solid #2563eb;outline-offset:3px}",
                  },
                ],
                "Visible focus ring"
              ),
            ],
            tips: [
              "Prefer :focus-visible so mouse users are not forced into heavy rings.",
              "Check focus after dynamic UI updates (menus, tabs, dialogs).",
            ],
            mistakes: [
              "outline: none globally with no replacement style.",
              "Opening a dialog but leaving focus on the page behind it.",
            ],
          }),
          t({
            id: "aria-basics",
            title: "ARIA basics",
            tags: ["a11y", "aria"],
            summary: "ARIA adds roles and properties when native HTML is not enough.",
            description:
              "ARIA can name elements, describe them, and expose state when you build custom widgets. The first rule: do not use ARIA if a native element already does the job. Incorrect ARIA often makes accessibility worse than no ARIA, because assistive tech trusts the wrong information.",
            whenToUse: "Custom widgets without HTML equivalents.",
            whenNotToUse: "On elements that already have the correct role.",
            tips: [
              "Start from a native button, link, or input before reaching for roles.",
              "When you add a role, also implement the keyboard behavior that role implies.",
            ],
            mistakes: [
              "role=\"button\" on a div without Enter/Space handling.",
              "Sprinkling aria-* attributes that contradict the visible UI.",
            ],
          }),
          t({
            id: "aria-label",
            title: "aria-label",
            tags: ["a11y", "aria"],
            summary: "Provides an accessible name when visible text is missing.",
            description:
              "aria-label gives an element its accessible name when there is no visible text — common for icon-only buttons. Prefer visible text when you can; sighted users benefit too. Avoid using aria-label to override clear visible labels, which can confuse people using voice control.",
            whenToUse: "Icon-only controls.",
            whenNotToUse: "To override clear visible text unnecessarily.",
            demos: [h('<button aria-label="Close">✕</button>')],
            tips: [
              "Keep aria-label short and specific (“Close dialog”, not “Click here”).",
              "If visible text exists, you usually do not need aria-label.",
            ],
            mistakes: [
              "Empty or vague aria-label values.",
              "aria-label that disagrees with the visible text on the same control.",
            ],
          }),
          t({
            id: "aria-labelledby",
            title: "aria-labelledby",
            tags: ["a11y", "aria"],
            summary: "Names an element by referencing other elements’ text.",
            description:
              "aria-labelledby points to one or more element ids whose text content forms the accessible name. It is ideal when a visible heading already titles a dialog or region — reuse that text instead of duplicating it in aria-label. Multiple ids are concatenated in order.",
            whenToUse: "When a visible heading already names a region.",
            whenNotToUse: "When a simple label wrapping works.",
            tips: [
              "Reference existing visible text so the name stays in sync when copy changes.",
              "Ensure every id in the list exists in the document.",
            ],
            mistakes: [
              "Pointing labelledby at missing or wrong ids.",
              "Using labelledby and aria-label together without intending a combined name.",
            ],
          }),
          t({
            id: "aria-describedby",
            title: "aria-describedby",
            tags: ["a11y", "aria"],
            summary: "Associates descriptive help or error text with a control.",
            description:
              "aria-describedby points to elements that hold hint or error text so screen readers announce them with the field. Use it for password rules, format examples, and validation messages. It supplements the name — it does not replace a proper label.",
            whenToUse: "Help text and inline validation errors.",
            whenNotToUse: "As a substitute for a proper name (use label/aria-label).",
            demos: [
              h(
                '<label for="pw">Password</label>\n<input id="pw" type="password" aria-describedby="pw-hint">\n<p id="pw-hint">At least 8 characters.</p>'
              ),
            ],
            tips: [
              "Update or swap the describedby target when an error replaces a hint.",
              "Keep hint text in the DOM even if you visually style errors separately.",
            ],
            mistakes: [
              "Error text on screen that is not referenced from the invalid field.",
              "Using describedby alone with no label or name.",
            ],
          }),
          t({
            id: "buttons-vs-links-a11y",
            title: "Buttons versus links",
            tags: ["a11y"],
            summary: "Links navigate; buttons activate. Mixing them confuses everyone.",
            description:
              "If it goes somewhere, use <a href>. If it does something on the page, use <button>. Keyboard expectations and screen reader roles differ, and middle-click or open-in-new-tab only make sense for real links. You may style either to match the design as long as the element choice is correct.",
            whenToUse: "Choosing elements for interactive UI.",
            whenNotToUse: "<a href=\"#\" onclick=…> as a fake button.",
            tips: [
              "Ask: does this change the URL, or trigger an action here?",
              "Disable buttons with disabled; hide or remove links that are not available.",
            ],
            mistakes: [
              "<a href=\"#\" onclick=…> pretending to be a button.",
              "<button> used for in-site navigation instead of a real link.",
            ],
          }),
          t({
            id: "accessible-forms",
            title: "Accessible forms",
            tags: ["a11y", "forms"],
            summary: "Labels, instructions, errors, and keyboard-friendly controls.",
            description:
              "Name every field, explain errors in text, and bind messages with aria-describedby when needed. Do not rely on color alone to show validity. Custom selects and checkboxes must remain operable with a keyboard and expose checked/expanded state correctly.",
            whenToUse: "All forms.",
            whenNotToUse: "Placeholder-only field labeling.",
            tips: [
              "Show errors next to fields and in a summary when the form is long.",
              "Preserve user input after a failed submit so people are not retyping.",
            ],
            mistakes: [
              "Red borders with no text explaining what to fix.",
              "Custom widgets that look like checkboxes but are not keyboard operable.",
            ],
          }),
          t({
            id: "color-considerations",
            title: "Color considerations",
            tags: ["a11y", "color"],
            summary: "Do not communicate only with color; keep contrast strong.",
            description:
              "Status and errors need icons or text, not only a red outline. Aim for WCAG contrast ratios between text and background so content stays readable outdoors and for low-vision users. Mentally test in grayscale: if meaning disappears, add another cue.",
            whenToUse: "Design tokens and UI states.",
            whenNotToUse: "Ultra-low-contrast gray on gray body text.",
            tips: [
              "Pair color with text, icons, or patterns for charts and required fields.",
              "Check contrast for body text and for button labels on brand colors.",
            ],
            mistakes: [
              "Conveying required vs optional with color alone.",
              "Light gray text on white that fails contrast checks.",
            ],
          }),
        ],
      },
      {
        id: "metadata",
        title: "Metadata",
        description: "Information in the document head that shapes browser and social behavior.",
        topics: [
          t({
            id: "title",
            title: "<title>",
            tags: ["metadata"],
            summary: "The document title shown in the browser tab and search results.",
            description:
              "Write a concise, unique <title> for every page. Put the distinctive part first when tab space is limited (“About — My Site”). Titles appear in search results, bookmarks, and screen reader page lists, so vague duplicates hurt both SEO and usability.",
            whenToUse: "Every HTML document.",
            whenNotToUse: "Identical titles across all pages.",
            demos: [h("<p>Set in head: <code>&lt;title&gt;About — My Site&lt;/title&gt;</code></p>")],
            tips: [
              "Keep titles roughly under about 60 characters when you care about search display.",
              "Include the brand, but lead with the page-specific topic.",
            ],
            mistakes: [
              "Using the same “Home” title on every route.",
              "Stuffing keywords until the tab text is unreadable.",
            ],
          }),
          t({
            id: "meta-charset",
            title: "meta charset",
            tags: ["metadata"],
            summary: "Declares character encoding — use UTF-8.",
            description:
              "Place <meta charset=\"UTF-8\"> early in <head> so the browser interprets characters correctly before it reads the rest of the document. UTF-8 covers virtually all languages and symbols you will need on a modern site.",
            whenToUse: "Every page.",
            whenNotToUse: "Odd legacy encodings for new sites.",
            tips: [
              "Put charset in the first 1024 bytes of the document — typically the first tag in head.",
              "Save your source files as UTF-8 to match the declaration.",
            ],
            mistakes: [
              "Omitting charset and seeing mojibake on special characters.",
              "Declaring UTF-8 while the server or file is saved in another encoding.",
            ],
          }),
          t({
            id: "viewport",
            title: "Viewport meta",
            tags: ["metadata", "responsive"],
            summary: "Controls how mobile browsers scale the page.",
            description:
              '<meta name="viewport" content="width=device-width, initial-scale=1.0"> tells mobile browsers to match the layout width to the device. Without it, phones often render a wide desktop layout and shrink it, making text tiny. Avoid disabling user zoom unless you have a strong, rare reason — it harms accessibility.',
            whenToUse: "All modern responsive sites.",
            whenNotToUse: "Disabling user zoom without a strong reason (hurts a11y).",
            tips: [
              "Pair the viewport tag with responsive CSS (flexible widths, media queries).",
              "Test on a real phone, not only a narrow desktop window.",
            ],
            mistakes: [
              "Forgetting the viewport meta and wondering why mobile looks zoomed out.",
              "maximum-scale=1 or user-scalable=no blocking pinch-zoom.",
            ],
          }),
          t({
            id: "meta-description",
            title: "Meta description",
            tags: ["metadata", "seo"],
            summary: "A short summary that may appear in search results.",
            description:
              "Use <meta name=\"description\" content=\"…\"> for a clear one- or two-sentence summary of the page. It does not directly guarantee rankings, but search engines often show it as the snippet, which affects whether people click. Write for humans first.",
            whenToUse: "Public pages.",
            whenNotToUse: "Keyword stuffing.",
            tips: [
              "Make each page’s description unique and specific.",
              "Aim for roughly 150–160 characters when targeting classic search snippets.",
            ],
            mistakes: [
              "Duplicating the same description across the whole site.",
              "Filling content with repeated keywords instead of a readable sentence.",
            ],
          }),
          t({
            id: "favicon",
            title: "Favicon",
            tags: ["metadata"],
            summary: "The small icon in the browser tab.",
            description:
              "Link an icon from head, for example <link rel=\"icon\" href=\"/favicon.ico\">. Modern sites often add PNG or SVG icons for sharper display across devices. Keep files small so tabs and bookmarks stay snappy.",
            whenToUse: "Polished public sites.",
            whenNotToUse: "Huge multi-megabyte icons.",
            tips: [
              "Provide at least one 32×32 or SVG icon for crisp tabs.",
              "Place the file at a stable URL so bookmarks keep working.",
            ],
            mistakes: [
              "Shipping a multi-megabyte photo as the favicon.",
              "Broken icon paths that 404 on every page load.",
            ],
          }),
          t({
            id: "canonical",
            title: "Canonical links",
            tags: ["metadata", "seo"],
            summary: "Declares the preferred URL when duplicate content exists.",
            description:
              '<link rel="canonical" href="https://example.com/page"> tells search engines which URL is authoritative when the same content is reachable via parameters, mirrors, or HTTP/HTTPS variants. Point it at the version you want indexed and shared.',
            whenToUse: "When URL variants exist (tracking params, mirrors).",
            whenNotToUse: "Pointing canonical at unrelated content.",
            tips: [
              "Use absolute URLs in canonical hrefs.",
              "Keep self-referencing canonicals consistent on the preferred page.",
            ],
            mistakes: [
              "Canonicalizing every page to the homepage.",
              "Pointing canonical at a redirect or error URL.",
            ],
          }),
          t({
            id: "open-graph",
            title: "Open Graph basics",
            tags: ["metadata", "social"],
            summary: "Meta tags that control link previews on social platforms.",
            description:
              "Tags like og:title, og:description, og:image, and og:url shape the preview card when someone shares your link. They live in <head> as <meta property=\"og:…\" content=\"…\">. Platforms change rules over time — verify with each network’s sharing debugger when previews look wrong.",
            whenToUse: "Marketing and content pages meant for sharing.",
            whenNotToUse: "As a substitute for on-page titles and descriptions.",
            tips: [
              "Use a large, clear og:image (many platforms expect roughly 1200×630).",
              "Keep og:title aligned with the real page title to avoid bait-and-switch.",
            ],
            mistakes: [
              "Missing og:image so shares show a blank or random thumbnail.",
              "Relying on Open Graph alone while the visible <title> is still generic.",
            ],
          }),
        ],
      },
    ],
  };
}
