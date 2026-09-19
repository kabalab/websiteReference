export function buildHtml({ elementTopic, htmlDemo, multiDemo, topic }) {
  const t = elementTopic;
  const h = htmlDemo;

  return {
    id: "html",
    title: "Intro HTML",
    hash: "html",
    intro:
      "HTML is the structure of every web page. This section starts from absolute zero: what HTML is, how documents are built, and the elements you use every day for text, links, images, lists, tables, and forms.",
    subsections: [
      {
        id: "fundamentals",
        title: "HTML Fundamentals",
        description: "The ideas and document pieces everything else builds on.",
        topics: [
          t({
            id: "what-is-html",
            title: "What HTML is",
            tags: ["html", "basics", "intro"],
            summary: "HTML describes the structure and meaning of content on a web page.",
            description:
              "HTML stands for HyperText Markup Language. It is not a programming language that calculates or makes decisions. Instead, it is a markup language: you wrap content in tags that tell the browser what each piece of content is — a heading, a paragraph, an image, a button, and so on. The browser reads those tags and builds a visual page you can see and interact with. Think of HTML as the skeleton of a website. CSS is the clothing and styling. JavaScript is the muscles that add behavior.",
            whenToUse: "Use HTML whenever you need to create or structure content for a web page.",
            whenNotToUse:
              "Do not use HTML alone when you need complex styling (use CSS) or interactive behavior like responding to clicks with logic (use JavaScript).",
            demos: [
              h(
                "<h1>Hello, world</h1>\n<p>This sentence is a paragraph of text.</p>",
                "A tiny HTML snippet",
                "Even two tags are enough for the browser to show structured content."
              ),
            ],
            mistakes: [
              "Thinking HTML can replace CSS for layout and colors.",
              "Assuming HTML “runs” like a program — it is declared structure, not step-by-step logic.",
            ],
            tips: [
              "Read HTML from the outside in: outer tags wrap inner content.",
              "If you can name what a piece of content is (heading, list, form), there is usually an HTML element for it.",
            ],
            related: [
              { section: "html", topic: "how-html-works", label: "How HTML works" },
              { section: "css", topic: "what-is-css", label: "What CSS is" },
            ],
          }),
          t({
            id: "how-html-works",
            title: "How HTML works",
            tags: ["browser", "parsing", "basics"],
            summary: "The browser downloads HTML, parses tags into a document tree, then paints the page.",
            description:
              "When you visit a website, your browser requests an HTML file from a server. The browser then parses (reads and interprets) the HTML. Parsing builds an internal tree called the DOM (Document Object Model) — a structured map of every element. The browser uses that tree plus CSS to decide layout and appearance, then paints pixels on the screen. You do not need to memorize browser internals to write HTML, but knowing this flow explains why invalid or incomplete tags can produce surprising results.",
            whenToUse: "Keep this mental model when debugging why something does not appear as expected.",
            whenNotToUse: "You do not need to think about parsing for every simple page you write.",
            demos: [
              h(
                "<p>The browser turns this tag into a paragraph node in the page tree.</p>",
                "What the browser receives",
                "Your source code becomes a live document the browser can display."
              ),
            ],
            tips: [
              "If something is missing on the page, view the page source or use DevTools to inspect the DOM.",
              "Browsers try to recover from mistakes, which can hide errors until a page behaves oddly.",
            ],
            related: [
              { section: "html", topic: "elements", label: "Elements" },
              { section: "javascript", topic: "document", label: "document (DOM)" },
            ],
          }),
          t({
            id: "html-documents",
            title: "HTML documents",
            tags: ["document", "file", "basics"],
            summary: "An HTML document is a text file (usually .html) that describes one web page.",
            description:
              "A typical website is made of one or more HTML documents. The main entry page is often named index.html because servers look for that name by default. Inside the file you write plain text plus tags. You can open an HTML file directly in a browser for learning, but features that load other files with JavaScript (like this reference site’s JSON content) need a local server.",
            whenToUse: "Create an .html file whenever you start a new page.",
            whenNotToUse: "Do not put an entire multi-page app’s logic only in one giant unorganized file if you can split responsibly — but for beginners, one file is fine.",
            syntax: "my-page.html  →  open in a browser",
            demos: [
              h(
                "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>My First Page</title>\n</head>\n<body>\n  <p>Document content goes in the body.</p>\n</body>\n</html>",
                "Minimal document",
                "This is the smallest complete HTML5 document pattern you should memorize.",
                { render: true }
              ),
            ],
            mistakes: ["Saving as .txt and wondering why the browser shows raw tags."],
            tips: ["Always save with a .html extension.", "Use UTF-8 encoding so special characters work."],
            related: [
              { section: "html", topic: "document-structure", label: "Document structure" },
              { section: "html", topic: "doctype", label: "<!DOCTYPE html>" },
            ],
          }),
          t({
            id: "elements",
            title: "Elements",
            tags: ["elements", "basics"],
            summary: "An element is a unit of HTML: usually an opening tag, content, and a closing tag.",
            description:
              "An HTML element is the combination of tags and the content between them. For example, <p>Hello</p> is a paragraph element. Some elements are empty (void): they do not wrap content, like <img> or <br>. Elements can contain text, other elements, or both. Learning HTML is largely learning which elements exist and what meaning they carry.",
            whenToUse: "Choose an element that matches the meaning of your content.",
            whenNotToUse: "Avoid wrapping everything in <div> when a more meaningful element exists.",
            syntax: "<tagname>content</tagname>",
            demos: [
              h("<strong>This entire strong element emphasizes text.</strong>", "Element with content"),
            ],
            tips: ["Name the purpose of the content first, then pick the element."],
            related: [
              { section: "html", topic: "tags", label: "Tags" },
              { section: "html", topic: "nesting", label: "Nesting" },
            ],
          }),
          t({
            id: "tags",
            title: "Tags",
            tags: ["tags", "syntax"],
            summary: "Tags are the <name> markers that create elements.",
            description:
              "A tag is written with angle brackets: <p> starts a paragraph. Most tags come in pairs. The opening tag can also hold attributes (extra information). Tag names are not case-sensitive in HTML5, but the standard practice is lowercase: write <p>, not <P>.",
            whenToUse: "Use tags to mark up every piece of structured content.",
            whenNotToUse: "Do not invent fake tag names and expect browsers to understand them as built-ins (custom elements are an advanced topic).",
            syntax: "<tag> … </tag>   or   <void-tag>",
            demos: [h("<em>Opening tag, content, closing tag.</em>")],
            mistakes: ["Forgetting the closing tag for non-void elements.", "Misspelling tag names (e.g. <paragrap>)."],
            tips: ["If the page looks wrong, check for unclosed tags first."],
            related: [
              { section: "html", topic: "opening-closing-tags", label: "Opening and closing tags" },
            ],
          }),
          t({
            id: "opening-closing-tags",
            title: "Opening and closing tags",
            tags: ["tags", "syntax"],
            summary: "Most elements need both an opening tag and a matching closing tag.",
            description:
              "An opening tag looks like <h1>. A closing tag looks like </h1> — same name with a slash. Everything between them belongs to that element. Void elements like <img>, <br>, <hr>, <input>, and <meta> do not get closing tags. In modern HTML you write <br>, not <br></br>.",
            whenToUse: "Always close non-void elements.",
            whenNotToUse: "Do not add closing tags to void elements.",
            syntax: "<p>Text</p>\n<br>\n<img src=\"photo.jpg\" alt=\"A photo\">",
            demos: [
              h("<p>Correctly closed paragraph.</p>\n<br>\n<p>Line break above came from a void tag.</p>"),
            ],
            mistakes: ["Writing </img>.", "Closing the wrong tag name."],
            tips: ["Indent nested tags so opening/closing pairs are easy to see."],
            related: [{ section: "html", topic: "nesting", label: "Nesting" }],
          }),
          t({
            id: "attributes",
            title: "Attributes",
            tags: ["attributes", "syntax"],
            summary: "Attributes add extra information to an element inside the opening tag.",
            description:
              "Attributes appear in the opening tag as name=\"value\" pairs. Examples: href on links, src and alt on images, type on inputs. Attributes configure behavior or provide metadata. Boolean attributes like required or disabled can appear with just the name: <input required>. Values should be quoted. Attribute names are lowercase by convention.",
            whenToUse: "When an element needs configuration (URL, text alternative, input type, etc.).",
            whenNotToUse: "Do not stuff visible paragraph text into attributes — put content between tags.",
            syntax: '<tag attribute="value" another="value">content</tag>',
            attributes: [
              { name: "id", description: "Unique identifier for one element on the page." },
              { name: "class", description: "One or more labels used mainly for CSS and JavaScript." },
              { name: "title", description: "Advisory text often shown as a tooltip." },
            ],
            demos: [
              h(
                '<a href="https://example.com" title="Example site">Visit example.com</a>',
                "Attributes on a link",
                "href tells the browser where to go; title adds advisory text."
              ),
            ],
            mistakes: ["Forgetting quotes around values with spaces.", "Putting attributes on the closing tag."],
            tips: ["Learn the important attributes per element; you do not need every possible attribute memorized."],
            related: [
              { section: "html", topic: "a", label: "<a>" },
              { section: "advanced-html", topic: "id-attribute", label: "id" },
            ],
          }),
          t({
            id: "nesting",
            title: "Nesting",
            tags: ["nesting", "structure"],
            summary: "Elements can contain other elements — this is called nesting.",
            description:
              "Nesting means placing elements inside other elements. For example, a list item <li> nests inside <ul>. Nesting must be proper: close inner tags before outer tags. Wrong: <p><strong>text</p></strong>. Right: <p><strong>text</strong></p>. Proper nesting builds a clean tree the browser (and accessibility tools) can understand.",
            whenToUse: "Whenever content has hierarchy (lists, articles inside main, bold words inside paragraphs).",
            whenNotToUse: "Do not nest interactive elements invalidly (e.g. a link inside another link).",
            demos: [
              h(
                "<ul>\n  <li>First <strong>nested</strong> item</li>\n  <li>Second item</li>\n</ul>",
                "Valid nesting"
              ),
            ],
            mistakes: ["Crossing tags instead of nesting them.", "Forgetting to close an inner tag."],
            tips: ["Use indentation: each nested level adds spaces or a tab."],
            related: [
              { section: "html", topic: "parent-child", label: "Parent and child elements" },
            ],
          }),
          t({
            id: "parent-child",
            title: "Parent and child elements",
            tags: ["dom", "nesting"],
            summary: "A parent contains children; children sit inside a parent.",
            description:
              "In the document tree, if <ul> contains <li> elements, the <ul> is the parent and each <li> is a child. Elements at the same level under one parent are siblings. These family words are used constantly in CSS (child selectors) and JavaScript (parentNode, children). Understanding parent/child relationships makes styling and scripting much easier.",
            whenToUse: "When reasoning about structure, CSS selectors, or DOM scripts.",
            whenNotToUse: "You do not need the vocabulary to write your first paragraphs — but learn it early.",
            demos: [
              h(
                "<div>\n  <p>I am a child of the div.</p>\n  <p>I am also a child (and a sibling of the first paragraph).</p>\n</div>"
              ),
            ],
            tips: ["In DevTools, the indented tree view shows parents and children clearly."],
            related: [
              { section: "css", topic: "child", label: "Child selectors" },
              { section: "javascript", topic: "document", label: "DOM" },
            ],
          }),
          t({
            id: "comments",
            title: "Comments",
            tags: ["comments"],
            summary: "HTML comments note things for humans and are ignored by the browser display.",
            description:
              "Comments let you leave notes in the code without showing them as page content. They start with <!-- and end with -->. Use them to mark sections or temporarily disable markup while learning. Do not put sensitive secrets in comments — anyone can view page source.",
            whenToUse: "To label regions of a file or leave reminders for yourself or teammates.",
            whenNotToUse: "Do not comment out huge chunks long-term; delete unused code or use version control.",
            syntax: "<!-- This is a comment -->",
            demos: [
              h(
                "<!-- Navigation starts here -->\n<p>You will not see the comment above on the page.</p>",
                "Comments are invisible in the rendered page"
              ),
            ],
            mistakes: ["Forgetting to close a comment, which can hide the rest of the page."],
            tips: ["Keep comments short and useful."],
          }),
          t({
            id: "whitespace",
            title: "Whitespace",
            tags: ["whitespace", "formatting"],
            summary: "Extra spaces and line breaks in HTML source usually collapse into a single space in text.",
            description:
              "In normal text flow, browsers collapse sequences of spaces, tabs, and newlines into one space. That means you can format your code with indentation and line breaks for readability without changing what users see. If you need to preserve exact spacing (like poetry or code), use <pre> or CSS white-space — not dozens of &nbsp; entities.",
            whenToUse: "Freely format your source for readability.",
            whenNotToUse: "Do not rely on source indentation to create visual layout — use CSS.",
            demos: [
              h(
                "<p>This    text\nhas     messy\n     spacing in the source.</p>",
                "Collapsed whitespace"
              ),
            ],
            tips: ["Pretty source code helps you spot nesting errors."],
            related: [{ section: "html", topic: "pre", label: "<pre>" }],
          }),
          t({
            id: "html-entities",
            title: "HTML entities",
            tags: ["entities", "characters"],
            summary: "Entities let you write special characters like <, >, and & safely in HTML.",
            description:
              "The characters < and > start and end tags, so if you want to show them as visible text you need entities: &lt; for <, &gt; for >, &amp; for &, &quot; for \", and &nbsp; for a non-breaking space. Many symbols also have named entities (&copy; for ©). You can also use numeric entities. Prefer UTF-8 characters directly when you can (like ©), and use entities when the character would break markup.",
            whenToUse: "When showing code samples that include < or when you need a character that conflicts with HTML syntax.",
            whenNotToUse: "Do not entity-encode ordinary letters and words.",
            syntax: "&lt;div&gt; &amp; &copy;",
            demos: [
              h(
                "<p>Use &lt;p&gt; for paragraphs &amp; &lt;a&gt; for links.</p>",
                "Showing tags as text"
              ),
            ],
            mistakes: ["Writing raw < in the middle of a sentence and accidentally starting a tag."],
            tips: ["Remember &amp; — a common bug is a bare & in URLs inside HTML."],
          }),
          t({
            id: "document-structure",
            title: "Document structure",
            tags: ["structure", "boilerplate"],
            summary: "A standard page has doctype, html, head (metadata), and body (visible content).",
            description:
              "Almost every modern page follows the same skeleton: <!DOCTYPE html>, then <html>, which contains <head> and <body>. The head holds information about the page (title, character set, CSS links). The body holds what users see. Learning this skeleton once unlocks every tutorial you will read afterward.",
            whenToUse: "Start every new HTML file from this structure.",
            whenNotToUse: "Do not skip the head essentials (charset, title, viewport on real sites).",
            demos: [
              h(
                "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Structure Demo</title>\n</head>\n<body>\n  <header><h1>Page title</h1></header>\n  <main><p>Main content</p></main>\n  <footer><p>Footer</p></footer>\n</body>\n</html>",
                "Full skeleton with landmark regions"
              ),
            ],
            tips: ['Always set lang on <html>, e.g. lang="en".'],
            related: [
              { section: "html", topic: "head-element", label: "<head>" },
              { section: "html", topic: "body-element", label: "<body>" },
            ],
          }),
          t({
            id: "doctype",
            title: "<!DOCTYPE html>",
            tags: ["doctype"],
            summary: "Tells the browser this document uses modern HTML standards mode.",
            description:
              "The doctype is the first line of an HTML5 document. It is not an element and does not close. Writing <!DOCTYPE html> puts the browser into standards mode so layout behaves predictably. Older doctypes existed for older HTML versions; you only need the short HTML5 form today.",
            whenToUse: "On every HTML page, as the first line.",
            whenNotToUse: "Never omit it on production pages.",
            syntax: "<!DOCTYPE html>",
            tips: ["It is case-insensitive, but the conventional form is uppercase DOCTYPE."],
          }),
          t({
            id: "html-element",
            title: "<html>",
            tags: ["html"],
            summary: "The root element that wraps the entire document.",
            description:
              "The <html> element is the root of the page. It usually contains exactly two children: <head> and <body>. The lang attribute declares the primary language of the page, which helps screen readers and search engines.",
            whenToUse: "Always — one per document.",
            whenNotToUse: "Do not nest <html> inside itself.",
            syntax: '<html lang="en">...</html>',
            attributes: [
              { name: "lang", description: "Primary language code, such as en or es." },
            ],
            demos: [h('<p>Content ultimately lives under &lt;html&gt; → &lt;body&gt;.</p>')],
            tips: ["Set lang correctly for accessibility."],
          }),
          t({
            id: "head-element",
            title: "<head>",
            tags: ["head", "metadata"],
            summary: "Contains metadata about the page — not the main visible content.",
            description:
              "The <head> holds machine-readable and browser configuration information: character encoding, title (shown in the tab), viewport settings, links to CSS, site icons, and social metadata. Users do not see head content as page body text (except the title in the browser chrome).",
            whenToUse: "For title, charset, CSS, scripts that should load early, and SEO/social tags.",
            whenNotToUse: "Do not put article paragraphs in the head.",
            syntax: "<head>\n  <meta charset=\"UTF-8\">\n  <title>Page Title</title>\n</head>",
            related: [
              { section: "advanced-html", topic: "title", label: "<title>" },
              { section: "advanced-html", topic: "viewport", label: "viewport" },
            ],
          }),
          t({
            id: "body-element",
            title: "<body>",
            tags: ["body"],
            summary: "Contains all visible page content.",
            description:
              "Everything the user is meant to see and interact with belongs in <body>: headings, paragraphs, images, navigation, forms, and so on. There should be one body per document. Scripts that need the DOM are often placed at the end of the body so elements exist before the script runs (modules and defer change this pattern).",
            whenToUse: "For all visible content.",
            whenNotToUse: "Do not duplicate <body> tags.",
            demos: [
              h("<h1>Inside the body</h1><p>This is visible page content.</p>"),
            ],
            related: [
              { section: "advanced-html", topic: "main", label: "<main>" },
            ],
          }),
        ],
      },
      {
        id: "text",
        title: "Text",
        description: "Headings, paragraphs, emphasis, and other text-level elements.",
        topics: [
          ...["h1", "h2", "h3", "h4", "h5", "h6"].map((tag, i) =>
            t({
              id: tag,
              title: `<${tag}>`,
              tags: ["headings", "text", tag],
              summary: `Heading level ${i + 1} — ${i === 0 ? "the main page title" : "a subsection heading"}.`,
              description:
                i === 0
                  ? "The <h1> element represents the primary heading of a page or a distinct view. It tells people and assistive technologies what the page is about. Use one main h1 for the page’s primary topic in most simple documents. Headings create an outline: h1 for the top title, h2 for major sections, h3 for subsections, and so on. Do not choose heading levels based only on visual size — use CSS to style them."
                  : `The <${tag}> element is a heading at outline level ${i + 1}. Use it for subsections under higher-level headings. Keep heading levels nested logically (do not jump from h2 to h5 without reason). Screen reader users often navigate by headings, so a clear outline is an accessibility feature.`,
              whenToUse: `For a rank-${i + 1} heading in your document outline.`,
              whenNotToUse: "Do not use headings just to make text big or bold — use CSS for looks.",
              syntax: `<${tag}>Heading text</${tag}>`,
              demos: [h(`<${tag}>Example ${tag.toUpperCase()} heading</${tag}>`)],
              mistakes: [
                "Skipping levels randomly for style.",
                "Using multiple unrelated h1s without a clear design reason.",
              ],
              tips: ["Style headings with CSS; choose levels for meaning."],
              related: [{ section: "html", topic: "p", label: "<p>" }],
            })
          ),
          t({
            id: "p",
            title: "<p>",
            tags: ["text", "paragraph"],
            summary: "Defines a paragraph of text — a block of related sentences.",
            description:
              "The <p> element marks a paragraph. Browsers typically show space above and below paragraphs. Put continuous prose in paragraphs rather than separating lines with many <br> tags. A paragraph is a block-level element: it starts on a new line and takes available width by default.",
            whenToUse: "For ordinary body text grouped into paragraphs.",
            whenNotToUse: "Do not wrap every single word or heading in <p>.",
            syntax: "<p>Your paragraph text goes here.</p>",
            demos: [
              h("<p>First paragraph.</p>\n<p>Second paragraph — notice the separation.</p>"),
            ],
            mistakes: ["Using <br><br> instead of new <p> elements."],
            tips: ["One idea per paragraph keeps writing readable."],
          }),
          t({
            id: "br",
            title: "<br>",
            tags: ["text", "void"],
            summary: "Inserts a line break without starting a new paragraph.",
            description:
              "<br> is a void element that forces a line break. Use it sparingly — for poetry line breaks, addresses, or rare cases where lines must break inside one paragraph. For separating blocks of text, prefer multiple <p> elements or CSS margins.",
            whenToUse: "Soft line breaks inside a single unit of text.",
            whenNotToUse: "Do not use stacks of <br> to create layout spacing.",
            syntax: "Line one<br>Line two",
            demos: [h("<p>221B Baker Street<br>London<br>NW1 6XE</p>", "Address lines")],
            mistakes: ["Creating vertical layout with many <br> tags."],
          }),
          t({
            id: "hr",
            title: "<hr>",
            tags: ["text", "void"],
            summary: "A thematic break between sections of content — often shown as a horizontal rule.",
            description:
              "The <hr> element represents a thematic break (topic shift). Browsers often draw a horizontal line, but the meaning is a separation of content, not “draw a line.” Style it with CSS if needed.",
            whenToUse: "When content truly shifts topic within a page.",
            whenNotToUse: "Do not use <hr> only as decorative styling if a border on an element is clearer.",
            demos: [h("<p>Chapter one ends.</p><hr><p>Chapter two begins.</p>")],
          }),
          t({
            id: "strong",
            title: "<strong>",
            tags: ["text", "semantics"],
            summary: "Indicates strong importance, seriousness, or urgency — not just bold look.",
            description:
              "<strong> marks text as important. Browsers usually bold it, but the key is meaning: assistive technologies can announce emphasis of importance. Prefer <strong> over <b> when importance is the reason.",
            whenToUse: "Warnings, critical labels, truly important phrases.",
            whenNotToUse: "Do not wrap entire paragraphs in <strong> for styling.",
            demos: [h("<p><strong>Warning:</strong> Save your work before continuing.</p>")],
            related: [{ section: "html", topic: "b", label: "<b>" }],
          }),
          t({
            id: "b",
            title: "<b>",
            tags: ["text"],
            summary: "Draws attention stylistically without necessarily implying importance.",
            description:
              "The <b> element makes text bold without the strong importance semantics of <strong>. Use it for keywords or summary words when you are not claiming urgency. When in doubt about importance, prefer <strong>.",
            whenToUse: "Stylistic offset without “this is critical” meaning.",
            whenNotToUse: "For actual warnings — use <strong>.",
            demos: [h("<p>The product name is <b>Northwind</b> in this sentence.</p>")],
          }),
          t({
            id: "em",
            title: "<em>",
            tags: ["text", "semantics"],
            summary: "Emphasizes stress in a sentence — usually rendered in italics.",
            description:
              "<em> represents stressed emphasis that can change the meaning of a sentence (“I was <em>going</em> to call”). Screen readers may change voice prosody. Prefer <em> over <i> when you mean spoken emphasis.",
            whenToUse: "Sentence stress and nuanced emphasis.",
            whenNotToUse: "For book titles or idiomatic italics without stress — consider <i> or <cite>.",
            demos: [h("<p>Please <em>do</em> read the instructions carefully.</p>")],
            related: [{ section: "html", topic: "i", label: "<i>" }],
          }),
          t({
            id: "i",
            title: "<i>",
            tags: ["text"],
            summary: "Idiomatic offset text, such as a technical term or taxonomical name — often italic.",
            description:
              "<i> is for text that is set off from normal prose for reason other than strong stress — for example a foreign phrase or a thought. It usually looks italic. For spoken emphasis, use <em>.",
            whenToUse: "Alternate voice/mood or idiomatic italics.",
            whenNotToUse: "For importance — use <strong> or <em> as appropriate.",
            demos: [h("<p>The ship was called <i>Wanderer</i>.</p>")],
          }),
          t({
            id: "u",
            title: "<u>",
            tags: ["text"],
            summary: "Annotates non-textual underlining (e.g. spelling error highlights) — avoid for links.",
            description:
              "Underlining on the web usually signals a link. The <u> element exists for specific annotation cases, but underlining ordinary text confuses users. Prefer CSS for design underlines, and reserve underlines for links in body content.",
            whenToUse: "Rare annotation cases defined by the HTML spec.",
            whenNotToUse: "Do not underline paragraphs for decoration; do not fake links.",
            demos: [h("<p>Misspelled word example: <u>recieve</u></p>")],
            mistakes: ["Underlining non-links so they look clickable."],
          }),
          t({
            id: "s",
            title: "<s>",
            tags: ["text"],
            summary: "Marks content that is no longer accurate or relevant — shown with a strikethrough.",
            description:
              "<s> represents things that are outdated or no longer correct, such as an old price. It is not for indicating document edits (there are other elements for editorial insertion/deletion in some contexts). Browsers typically strikethrough the text.",
            whenToUse: "No-longer-relevant text that you still want visible.",
            whenNotToUse: "Do not use it only for decoration.",
            demos: [h("<p>Price: <s>$50</s> <strong>$35</strong></p>")],
          }),
          t({
            id: "small",
            title: "<small>",
            tags: ["text"],
            summary: "Side comments such as fine print — often rendered smaller.",
            description:
              "<small> represents side remarks like copyright lines or legal fine print. It is semantic “small print,” not a generic “make text tiny” tool — though browsers often shrink it. Use CSS for pure visual size changes in body copy.",
            whenToUse: "Fine print and secondary legal/copyright notes.",
            whenNotToUse: "As your only way to create a visual hierarchy for main content.",
            demos: [h("<p>Buy now.</p><p><small>Offer ends Friday. Terms apply.</small></p>")],
          }),
          t({
            id: "mark",
            title: "<mark>",
            tags: ["text"],
            summary: "Highlights text for reference, like search result highlighting.",
            description:
              "<mark> means “this text is marked or highlighted for relevance in the current context,” such as matching a search term. Browsers often use a yellow background.",
            whenToUse: "Search hits or temporary highlights for reference.",
            whenNotToUse: "Do not mark entire pages.",
            demos: [h("<p>Results for \"flex\": CSS <mark>flex</mark>box is covered in the CSS section.</p>")],
          }),
          t({
            id: "sub",
            title: "<sub>",
            tags: ["text"],
            summary: "Subscript text, sitting slightly below the baseline.",
            description: "<sub> renders subscript, commonly used in chemical formulas (H<sub>2</sub>O) or footnotes markers.",
            whenToUse: "True subscript meaning.",
            whenNotToUse: "For general layout positioning — use CSS.",
            demos: [h("<p>Water is H<sub>2</sub>O.</p>")],
          }),
          t({
            id: "sup",
            title: "<sup>",
            tags: ["text"],
            summary: "Superscript text, sitting slightly above the baseline.",
            description: "<sup> is for exponents, ordinal indicators in some locales, and footnote references.",
            whenToUse: "Exponents and similar superscript needs.",
            whenNotToUse: "For raising text as decoration.",
            demos: [h("<p>E = mc<sup>2</sup></p>")],
          }),
          t({
            id: "code",
            title: "<code>",
            tags: ["text", "code"],
            summary: "Marks a fragment of computer code inline.",
            description:
              "Use <code> for short code snippets inside a sentence, like function names or tag names. For multi-line code blocks, wrap <code> in <pre> (or use <pre><code>…</code></pre>).",
            whenToUse: "Inline code fragments.",
            whenNotToUse: "For non-code italics or emphasis.",
            demos: [h("<p>Use the <code>querySelector</code> method to find an element.</p>")],
            related: [{ section: "html", topic: "pre", label: "<pre>" }],
          }),
          t({
            id: "pre",
            title: "<pre>",
            tags: ["text", "code"],
            summary: "Preformatted text that preserves spaces and line breaks.",
            description:
              "<pre> keeps whitespace as written, using a monospace font by default. It is ideal for code blocks and ASCII diagrams. Combine with <code> for code semantics.",
            whenToUse: "Multi-line code or text where spacing matters.",
            whenNotToUse: "For normal paragraphs.",
            demos: [
              h(
                "<pre><code>function hello() {\n  return \"Hi\";\n}</code></pre>",
                "Code block"
              ),
            ],
          }),
          t({
            id: "blockquote",
            title: "<blockquote>",
            tags: ["text", "quote"],
            summary: "A long quotation from another source, usually displayed as a block.",
            description:
              "<blockquote> is for extended quotes. Use the cite attribute for a source URL when appropriate, and optionally a <footer> or <cite> inside for attribution. For short inline quotes, use <q>.",
            whenToUse: "Multi-sentence quotations set apart from your own prose.",
            whenNotToUse: "For indenting ordinary text — use CSS.",
            demos: [
              h(
                "<blockquote>\n  <p>Programs must be written for people to read.</p>\n</blockquote>"
              ),
            ],
            related: [{ section: "html", topic: "q", label: "<q>" }],
          }),
          t({
            id: "q",
            title: "<q>",
            tags: ["text", "quote"],
            summary: "A short inline quotation; browsers often add quote marks automatically.",
            description:
              "The <q> element marks a short quotation inside a paragraph. Browsers typically insert locale-appropriate quotation marks, so you usually should not type \" manually around it.",
            whenToUse: "Short quotes inside running text.",
            whenNotToUse: "For long excerpts — use <blockquote>.",
            demos: [h("<p>She said <q>ship it</q> and smiled.</p>")],
          }),
          t({
            id: "semantic-vs-visual",
            title: "Semantic vs visual formatting",
            tags: ["semantics", "text"],
            summary: "Choose elements for meaning; use CSS for appearance.",
            description:
              "Semantic elements describe what content is (heading, strong importance, quote). Visual-only choices describe how it looks (big, blue, indented). HTML’s job is meaning and structure. CSS’s job is look and layout. That separation helps accessibility, redesigns, and maintenance. Example: do not pick <h3> because it “looks like the right size” — pick the correct rank, then style it.",
            whenToUse: "Always prefer meaning-first decisions when an element exists for that meaning.",
            whenNotToUse: "Do not ignore CSS — visuals still matter; just keep them in stylesheets.",
            tips: [
              "Ask: “What is this?” before “How should it look?”",
              "If you only need a look, CSS is usually the right tool.",
            ],
            related: [
              { section: "html", topic: "strong", label: "<strong>" },
              { section: "css", topic: "what-is-css", label: "What CSS is" },
            ],
          }),
        ],
      },
      // Links, images, lists, tables, forms continue in part 2 via spread
      buildLinks({ t, h, multiDemo }),
      buildImages({ t, h }),
      buildLists({ t, h }),
      buildTables({ t, h }),
      buildForms({ t, h, multiDemo }),
    ],
  };
}

function buildLinks({ t, h }) {
  return {
    id: "links",
    title: "Links",
    description: "Connect pages, sections, files, and email with the anchor element.",
    topics: [
      t({
        id: "a",
        title: "<a>",
        tags: ["links", "a"],
        summary: "The anchor element creates a hyperlink to another page, file, or location.",
        description:
          "The <a> element (anchor) is how users navigate the web. With an href attribute, it becomes a link. Without href, it is a placeholder anchor. Link text should describe the destination (“View pricing”), not “click here.” Links are not buttons: links navigate; buttons perform actions on the current page.",
        whenToUse: "When navigation to a URL or page section is the goal.",
        whenNotToUse: "For actions like “Submit” or “Open dialog” — use <button>.",
        syntax: '<a href="https://example.com">Example</a>',
        attributes: [
          { name: "href", description: "Destination URL or fragment." },
          { name: "target", description: "Where to open the link, e.g. _blank for a new tab." },
          { name: "rel", description: "Relationship to the destination; use noopener with target=_blank." },
        ],
        demos: [
          h('<a href="https://example.com">Visit Example</a>', "Basic link"),
          h('<a href="#forms">Jump to forms section id (same page pattern)</a>', "Fragment style text"),
        ],
        mistakes: ["Using <a> without href for buttons.", "Vague link text like “click here”."],
        tips: ["Write link text that makes sense out of context."],
        related: [
          { section: "html", topic: "href", label: "href" },
          { section: "html", topic: "a-vs-link", label: "<a> vs <link>" },
        ],
      }),
      t({
        id: "href",
        title: "href",
        tags: ["links", "attributes"],
        summary: "The href attribute sets the link destination.",
        description:
          "href stands for hypertext reference. It can be an absolute URL (https://…), a relative path (about.html), a same-page fragment (#section-id), or a special scheme like mailto:. Empty or missing href changes how the anchor behaves.",
        whenToUse: "On every real navigation link.",
        whenNotToUse: "Omit only for intentional placeholder anchors.",
        syntax: 'href="about.html"\nhref="https://example.com"\nhref="#section"',
        demos: [h('<a href="https://developer.mozilla.org/">MDN Web Docs</a>')],
      }),
      t({
        id: "relative-urls",
        title: "Relative URLs",
        tags: ["links", "urls"],
        summary: "Paths relative to the current page or site root.",
        description:
          "Relative URLs point within your site without writing the full domain. about.html looks in the same folder. ./about.html is explicit same-folder. ../ moves up a folder. /about.html (leading slash) starts from the site root. Relative links keep sites portable between local folders and GitHub Pages.",
        whenToUse: "Linking between pages and assets in your own project.",
        whenNotToUse: "When linking to another website — use absolute URLs.",
        demos: [
          h(
            '<p><a href="./style.css">This would link to a CSS file path (example)</a></p>',
            "Relative path pattern"
          ),
        ],
        mistakes: ["Broken paths after moving files into new folders."],
        tips: ["Keep a consistent folder structure and update links when you move files."],
      }),
      t({
        id: "absolute-urls",
        title: "Absolute URLs",
        tags: ["links", "urls"],
        summary: "Full addresses including protocol and domain.",
        description:
          "Absolute URLs include the scheme and host, like https://example.com/page. Use them for external sites. Prefer https for secure pages.",
        whenToUse: "External destinations.",
        whenNotToUse: "Unnecessary for every internal page link.",
        demos: [h('<a href="https://example.com/path/page.html">Absolute URL example</a>')],
      }),
      t({
        id: "page-links",
        title: "Page links",
        tags: ["links"],
        summary: "Linking from one HTML page to another in your site.",
        description:
          "Multi-page sites connect documents with relative href values. Navigation menus are lists of page links. Keep file names clear (about.html, contact.html).",
        whenToUse: "Any multi-page website.",
        whenNotToUse: "Not applicable inside a single-page section jump — use fragments.",
        demos: [
          h(
            '<nav>\n  <a href="index.html">Home</a> |\n  <a href="about.html">About</a>\n</nav>'
          ),
        ],
      }),
      t({
        id: "section-links",
        title: "Section links",
        tags: ["links", "fragments"],
        summary: "Jump to an element with an id using #fragment links.",
        description:
          "If an element has id=\"pricing\", then href=\"#pricing\" scrolls to it on the same page. href=\"other.html#pricing\" opens another page at that section. IDs must be unique on the page.",
        whenToUse: "Tables of contents and in-page navigation.",
        whenNotToUse: "Do not duplicate ids.",
        demos: [
          h(
            '<a href="#demo-target">Jump down</a>\n<p>…</p>\n<h2 id="demo-target">Demo target</h2>\n<p>You landed here.</p>'
          ),
        ],
        related: [{ section: "advanced-html", topic: "id-attribute", label: "id" }],
      }),
      t({
        id: "email-links",
        title: "Email links",
        tags: ["links", "mailto"],
        summary: "mailto: links open the user’s email app with a prefilled address.",
        description:
          "Use href=\"mailto:name@example.com\" to start an email. You can add query parameters like subject. Remember that publishing an address can increase spam.",
        whenToUse: "Contact links when email is appropriate.",
        whenNotToUse: "As the only contact method if you need spam protection forms.",
        demos: [h('<a href="mailto:hello@example.com">Email us</a>')],
      }),
      t({
        id: "target-rel",
        title: "target and rel",
        tags: ["links", "security"],
        summary: "Open links in new tabs safely with target and rel.",
        description:
          "target=\"_blank\" opens a new browsing context (often a new tab). Always pair it with rel=\"noopener noreferrer\" to avoid security/performance issues where the new page can touch window.opener. Do not open every link in a new tab — users often prefer control.",
        whenToUse: "External links when a new tab is intentional and helpful.",
        whenNotToUse: "On every internal navigation link.",
        syntax: '<a href="https://example.com" target="_blank" rel="noopener noreferrer">External</a>',
        demos: [
          h(
            '<a href="https://example.com" target="_blank" rel="noopener noreferrer">Open example.com in a new tab</a>'
          ),
        ],
        mistakes: ["Using target=_blank without rel=\"noopener\"."],
      }),
      t({
        id: "a-vs-link",
        title: "<a> vs <link>",
        tags: ["links", "head"],
        summary: "<a> is for users to click; <link> is for the document to reference resources.",
        description:
          "Beginners confuse <a> and <link>. <a href> creates a navigational hyperlink in the page body. <link> lives in <head> and connects resources like stylesheets: <link rel=\"stylesheet\" href=\"style.css\">. Users do not click <link>. Remember: anchors for people, link tags for documents.",
        whenToUse: "Use <a> for navigation; use <link> for CSS and similar resources.",
        whenNotToUse: "Never use <link> as a clickable body link.",
        demos: [
          h(
            "<p>Visible user link: <a href=\"https://example.com\">Example</a></p>\n<p>Stylesheet references use the <code>&lt;link&gt;</code> tag in the head (not shown as a clickable body control).</p>"
          ),
        ],
        tips: ["If a human clicks it, it is probably <a>, not <link>."],
      }),
    ],
  };
}

function buildImages({ t, h }) {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="120" viewBox="0 0 240 120" role="img" aria-label="Blue placeholder">' +
    '<rect width="240" height="120" fill="#2563eb"/>' +
    '<text x="120" y="66" text-anchor="middle" fill="white" font-family="sans-serif" font-size="18">Sample image</text></svg>';
  const dataUri = "data:image/svg+xml," + encodeURIComponent(svg);

  return {
    id: "images",
    title: "Images",
    description: "Add pictures with accessible alternatives and sensible sizing.",
    topics: [
      t({
        id: "img",
        title: "<img>",
        tags: ["images"],
        summary: "Embeds an image into the page. It is a void element.",
        description:
          "The <img> element embeds an image. It needs src (where the file is) and should almost always include alt (text alternative). Images are replaced elements: they display the picture rather than wrapping text content. Large images should be compressed for performance.",
        whenToUse: "Photos, diagrams, icons that are meaningful content.",
        whenNotToUse: "For purely decorative lines — CSS is often better; decorative images need empty alt.",
        syntax: '<img src="photo.jpg" alt="Description of the photo">',
        attributes: [
          { name: "src", description: "Image URL or path." },
          { name: "alt", description: "Text alternative for accessibility and failed loads." },
          { name: "width", description: "Optional width hint in pixels." },
          { name: "height", description: "Optional height hint in pixels." },
        ],
        demos: [
          h(`<img src="${dataUri}" alt="Blue rectangle labeled Sample image" width="240" height="120">`, "Embedded image"),
        ],
        mistakes: ["Omitting alt.", "Using huge uncompressed photos."],
        related: [{ section: "html", topic: "alt", label: "alt" }],
      }),
      t({
        id: "src",
        title: "src",
        tags: ["images", "attributes"],
        summary: "The source path or URL of the image file.",
        description:
          "src tells the browser where to download the image. Use relative paths for your own assets (images/photo.jpg) or absolute URLs for external files. If src is wrong, the image breaks and alt text becomes especially important.",
        whenToUse: "On every <img>.",
        whenNotToUse: "—",
        demos: [h(`<img src="${dataUri}" alt="Demo via data URL">`)],
      }),
      t({
        id: "alt",
        title: "alt",
        tags: ["images", "a11y"],
        summary: "Text alternative that describes the image’s purpose or content.",
        description:
          "alt is not optional for meaningful images. Screen readers read it aloud. If the image fails to load, browsers may show alt. Descriptive alt explains the content or function (“Search” for a magnifying-glass icon button image). Decorative images should use alt=\"\" so assistive tech can skip them. Do not stuff keywords for SEO spam.",
        whenToUse: "Always decide on alt: describe or intentionally empty.",
        whenNotToUse: "Do not write “image of…” fluff if it adds no information.",
        demos: [
          h(`<img src="${dataUri}" alt="Blue banner that says Sample image">`),
        ],
        mistakes: ["Missing alt attribute entirely.", "Repeating nearby caption text awkwardly."],
      }),
      t({
        id: "width-height",
        title: "width and height",
        tags: ["images"],
        summary: "Attributes that hint at intrinsic dimensions and help reduce layout jump.",
        description:
          "width and height attributes (unitless pixels) help the browser reserve space before the image loads, reducing layout shift. They do not replace responsive CSS. For responsive images, set width/height to intrinsic ratio and use CSS like max-width: 100%; height: auto.",
        whenToUse: "When you know intrinsic dimensions.",
        whenNotToUse: "Do not distort images with mismatched forced sizes without care.",
        demos: [h(`<img src="${dataUri}" alt="Fixed width demo" width="160" height="80">`)],
      }),
      t({
        id: "image-paths",
        title: "Image paths",
        tags: ["images", "paths"],
        summary: "Organize image files and link them with correct relative paths.",
        description:
          "A common pattern is an images/ folder next to your HTML. From index.html, src=\"images/logo.png\" works. From a subfolder page, you may need ../images/logo.png. Consistency prevents broken images after publishing to GitHub Pages.",
        whenToUse: "Any project with local image assets.",
        whenNotToUse: "—",
        tips: ["Use lowercase names and hyphens; avoid spaces in filenames."],
        visual:
          "my-website/\n├── index.html\n└── images/\n    ├── logo.png\n    └── hero.jpg",
      }),
      t({
        id: "responsive-images",
        title: "Responsive images",
        tags: ["images", "responsive"],
        summary: "Make images scale on small screens with CSS and careful src choices.",
        description:
          "At minimum, use CSS so images never overflow: img { max-width: 100%; height: auto; }. Advanced responsive techniques include srcset and <picture> for different resolutions and art direction. Start with the CSS rule, then learn srcset as you optimize.",
        whenToUse: "All modern sites viewed on phones.",
        whenNotToUse: "Skipping alt while focusing only on sizing.",
        demos: [
          {
            title: "Fluid image",
            explanation: "The image scales down with the container.",
            files: [
              { language: "html", code: `<img class="fluid" src="${dataUri}" alt="Responsive sample">` },
              { language: "css", code: ".fluid { max-width: 100%; height: auto; display: block; }" },
            ],
            render: true,
          },
        ],
      }),
      t({
        id: "figure",
        title: "<figure>",
        tags: ["images", "semantics"],
        summary: "Self-contained content like an image with an optional caption.",
        description:
          "<figure> groups media with its caption as a single unit that can move as a block relative to the main flow. Pair with <figcaption>.",
        whenToUse: "Images, diagrams, or code samples that need a caption.",
        whenNotToUse: "For every decorative icon.",
        demos: [
          h(
            `<figure>\n  <img src="${dataUri}" alt="Chart placeholder">\n  <figcaption>Figure 1: Sample chart placeholder.</figcaption>\n</figure>`
          ),
        ],
        related: [{ section: "html", topic: "figcaption", label: "<figcaption>" }],
      }),
      t({
        id: "figcaption",
        title: "<figcaption>",
        tags: ["images"],
        summary: "Caption describing a figure.",
        description:
          "Place <figcaption> as the first or last child of <figure>. It captions the figure content for everyone, including sighted users — different from alt, which targets the image alternative text.",
        whenToUse: "When a visible caption helps.",
        whenNotToUse: "As a replacement for alt on the image.",
        demos: [
          h(
            `<figure>\n  <img src="${dataUri}" alt="Blue sample">\n  <figcaption>A caption visible on the page.</figcaption>\n</figure>`
          ),
        ],
      }),
    ],
  };
}

function buildLists({ t, h }) {
  return {
    id: "lists",
    title: "Lists",
    description: "Ordered, unordered, and description lists.",
    topics: [
      t({
        id: "ul",
        title: "<ul>",
        tags: ["lists"],
        summary: "Unordered list — items share a relationship without ranking.",
        description:
          "<ul> creates a bulleted list by default. Each item must be an <li>. Use unordered lists for navigation menus and collections where order is not essential.",
        whenToUse: "Groups of peers without required sequence.",
        whenNotToUse: "Step-by-step instructions — prefer <ol>.",
        demos: [h("<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>")],
      }),
      t({
        id: "ol",
        title: "<ol>",
        tags: ["lists"],
        summary: "Ordered list — sequence matters.",
        description:
          "<ol> numbers items by default. Use it for procedures, rankings, and ranked results. Attributes like start and type exist but CSS is preferred for styling.",
        whenToUse: "Steps and ranked sequences.",
        whenNotToUse: "When order truly does not matter.",
        demos: [h("<ol>\n  <li>Create the file</li>\n  <li>Add HTML</li>\n  <li>Open in a browser</li>\n</ol>")],
      }),
      t({
        id: "li",
        title: "<li>",
        tags: ["lists"],
        summary: "A single list item inside ul or ol.",
        description:
          "Every <ul> or <ol> child should be <li>. An <li> can contain paragraphs, links, and nested lists.",
        whenToUse: "Each entry in a list.",
        whenNotToUse: "Outside of lists.",
        demos: [h("<ul><li>Only valid inside lists</li></ul>")],
      }),
      t({
        id: "dl",
        title: "<dl>",
        tags: ["lists"],
        summary: "Description list for term/definition groups.",
        description:
          "<dl> groups terms (<dt>) and descriptions (<dd>). Useful for glossaries, metadata pairs, and FAQs.",
        whenToUse: "Name/value or term/definition content.",
        whenNotToUse: "Simple bullet lists — use ul.",
        demos: [
          h(
            "<dl>\n  <dt>HTML</dt>\n  <dd>Structure of a web page.</dd>\n  <dt>CSS</dt>\n  <dd>Presentation and layout.</dd>\n</dl>"
          ),
        ],
      }),
      t({
        id: "dt",
        title: "<dt>",
        tags: ["lists"],
        summary: "The term being defined in a description list.",
        description: "<dt> is the term; follow it with one or more <dd> descriptions.",
        whenToUse: "Inside <dl>.",
        whenNotToUse: "Alone as a heading substitute.",
        demos: [h("<dl><dt>API</dt><dd>Application Programming Interface.</dd></dl>")],
      }),
      t({
        id: "dd",
        title: "<dd>",
        tags: ["lists"],
        summary: "The description or definition for a preceding term.",
        description: "<dd> provides the details for a <dt>. Multiple <dd> elements can follow one term.",
        whenToUse: "Inside <dl> after <dt>.",
        whenNotToUse: "As a generic indented paragraph outside dl.",
        demos: [h("<dl><dt>DOM</dt><dd>Document Object Model — the browser’s tree of the page.</dd></dl>")],
      }),
    ],
  };
}

function buildTables({ t, h }) {
  return {
    id: "tables",
    title: "Tables",
    description: "Tabular data — not page layout.",
    topics: [
      t({
        id: "table",
        title: "<table>",
        tags: ["tables"],
        summary: "Container for tabular data arranged in rows and columns.",
        description:
          "Use <table> for genuine data grids (schedules, comparisons, pricing matrices). Do not use tables to position a whole page layout — that is a job for CSS. Accessible tables use headers (<th>) and captions.",
        whenToUse: "When data is inherently tabular.",
        whenNotToUse: "For page layout columns.",
        demos: [
          h(
            "<table>\n  <caption>Office hours</caption>\n  <thead><tr><th>Day</th><th>Hours</th></tr></thead>\n  <tbody>\n    <tr><td>Mon</td><td>9–5</td></tr>\n    <tr><td>Tue</td><td>10–6</td></tr>\n  </tbody>\n</table>"
          ),
        ],
      }),
      t({
        id: "tr",
        title: "<tr>",
        tags: ["tables"],
        summary: "A table row.",
        description: "Each <tr> holds cells (<td> or <th>) that make one row.",
        whenToUse: "Every row in a table.",
        whenNotToUse: "Outside tables.",
        demos: [h("<table><tr><td>A</td><td>B</td></tr></table>")],
      }),
      t({
        id: "td",
        title: "<td>",
        tags: ["tables"],
        summary: "A standard data cell.",
        description: "<td> holds a data value. Prefer <th> for header cells.",
        whenToUse: "Body data cells.",
        whenNotToUse: "For column/row titles — use th.",
        demos: [h("<table><tr><td>42</td></tr></table>")],
      }),
      t({
        id: "th",
        title: "<th>",
        tags: ["tables", "a11y"],
        summary: "A header cell for a column or row.",
        description:
          "<th> labels data. Use scope=\"col\" or scope=\"row\" when it helps clarify. Screen readers announce headers with cells.",
        whenToUse: "Column and row titles.",
        whenNotToUse: "For styling bold cells that are not headers.",
        demos: [h("<table><tr><th scope=\"col\">Name</th><th scope=\"col\">Score</th></tr><tr><td>Ada</td><td>98</td></tr></table>")],
      }),
      t({
        id: "thead",
        title: "<thead>",
        tags: ["tables"],
        summary: "Groups header rows.",
        description: "<thead> wraps header rows so browsers and assistive tech understand structure. Often paired with tbody and tfoot.",
        whenToUse: "Tables with a clear header section.",
        whenNotToUse: "Required for tiny one-row demos, but recommended in real tables.",
        demos: [h("<table><thead><tr><th>Item</th></tr></thead><tbody><tr><td>Pens</td></tr></tbody></table>")],
      }),
      t({
        id: "tbody",
        title: "<tbody>",
        tags: ["tables"],
        summary: "Groups the main data rows.",
        description: "A table can have one or more <tbody> sections. It organizes body rows separately from head/foot.",
        whenToUse: "Most data tables.",
        whenNotToUse: "—",
        demos: [h("<table><tbody><tr><td>Data row</td></tr></tbody></table>")],
      }),
      t({
        id: "tfoot",
        title: "<tfoot>",
        tags: ["tables"],
        summary: "Groups footer rows such as totals.",
        description: "<tfoot> contains summary rows. In HTML5 it can appear before or after tbody in source order; browsers still render it appropriately.",
        whenToUse: "Totals and summaries.",
        whenNotToUse: "Decorative last rows that are not footers.",
        demos: [
          h(
            "<table>\n  <thead><tr><th>Item</th><th>Cost</th></tr></thead>\n  <tbody><tr><td>Book</td><td>$10</td></tr></tbody>\n  <tfoot><tr><th scope=\"row\">Total</th><td>$10</td></tr></tfoot>\n</table>"
          ),
        ],
      }),
      t({
        id: "caption",
        title: "<caption>",
        tags: ["tables", "a11y"],
        summary: "A title for the whole table.",
        description: "Place <caption> as the first child of <table>. It names the table for everyone.",
        whenToUse: "Whenever a table needs a visible title.",
        whenNotToUse: "As a replacement for page headings outside the table.",
        demos: [h("<table><caption>Team scores</caption><tr><td>42</td></tr></table>")],
      }),
      t({
        id: "colspan",
        title: "colspan",
        tags: ["tables"],
        summary: "Makes a cell span multiple columns.",
        description: "colspan=\"2\" stretches a cell across two columns. Keep the math of columns consistent across rows.",
        whenToUse: "Merged header or summary cells.",
        whenNotToUse: "As a layout hack for non-tabular content.",
        demos: [h('<table><tr><td colspan="2">Wide cell</td></tr><tr><td>A</td><td>B</td></tr></table>')],
      }),
      t({
        id: "rowspan",
        title: "rowspan",
        tags: ["tables"],
        summary: "Makes a cell span multiple rows.",
        description: "rowspan=\"2\" stretches a cell across two rows. Use carefully — complex spans hurt accessibility.",
        whenToUse: "When a category label applies to multiple rows.",
        whenNotToUse: "Deeply nested spanning layouts.",
        demos: [h('<table><tr><td rowspan="2">Side</td><td>Top</td></tr><tr><td>Bottom</td></tr></table>')],
      }),
      t({
        id: "table-uses",
        title: "Appropriate table uses",
        tags: ["tables", "best-practices"],
        summary: "Tables are for data relationships — not page scaffolding.",
        description:
          "Appropriate: financial reports, comparison charts, timetables. Inappropriate: placing a sidebar next to content using table cells, or building an entire homepage grid with nested tables. CSS Flexbox and Grid exist for layout and are more accessible and responsive.",
        whenToUse: "True rows-and-columns data.",
        whenNotToUse: "Any full-page layout task.",
        tips: ["If you are not displaying a dataset, you probably do not need a table."],
        related: [
          { section: "css", topic: "display-flex", label: "Flexbox" },
          { section: "css", topic: "display-grid", label: "Grid" },
        ],
      }),
    ],
  };
}

function buildForms({ t, h }) {
  const inputTypes = [
    ["text", "Single-line text"],
    ["password", "Masked text for secrets"],
    ["email", "Email address with basic format checking"],
    ["number", "Numeric input"],
    ["checkbox", "On/off toggle; several may be selected"],
    ["radio", "Choose one option in a named group"],
    ["date", "Date picker (browser UI varies)"],
    ["time", "Time picker"],
    ["file", "File upload control"],
    ["range", "Slider for a numeric range"],
    ["color", "Color swatch picker"],
    ["submit", "Submits the form"],
    ["reset", "Resets fields to defaults"],
    ["hidden", "Not displayed; still submitted"],
  ];

  return {
    id: "forms",
    title: "Forms",
    description: "Collect user input with form controls and labels.",
    topics: [
      t({
        id: "form",
        title: "<form>",
        tags: ["forms"],
        summary: "A container that groups controls that can be submitted together.",
        description:
          "The <form> element groups inputs, labels, and buttons. Attributes like action (where to send data) and method (get or post) matter for real submissions. For front-end learning demos, you may omit a real server and use JavaScript to handle submit.",
        whenToUse: "Any time you collect related user input.",
        whenNotToUse: "For a single button that is not submitting data — a lone <button> may suffice.",
        attributes: [
          { name: "action", description: "URL that receives the submission." },
          { name: "method", description: "HTTP method: get or post." },
        ],
        demos: [
          h(
            '<form onsubmit="event.preventDefault(); alert(\'Submitted (demo)\');">\n  <label>Name <input name="name" required></label>\n  <button type="submit">Send</button>\n</form>',
            "Minimal form",
            "This demo prevents a real network submit and shows an alert instead.",
            { tryIt: true }
          ),
        ],
      }),
      t({
        id: "input",
        title: "<input>",
        tags: ["forms"],
        summary: "The workhorse form control; behavior changes with the type attribute.",
        description:
          "<input> is void and highly versatile. type=\"text\" is the default. Combined with name, value, placeholder, and validation attributes, it covers most form needs. Always pair inputs with <label>.",
        whenToUse: "Most single-value fields.",
        whenNotToUse: "For multi-line text — use textarea; for options list — use select.",
        demos: [
          h('<label>Email <input type="email" name="email" placeholder="you@example.com"></label>', "Email input", "", { tryIt: true }),
        ],
        related: [{ section: "html", topic: "label", label: "<label>" }],
      }),
      t({
        id: "label",
        title: "<label>",
        tags: ["forms", "a11y"],
        summary: "Captions a form control and improves clicking/tapping and accessibility.",
        description:
          "Labels tell users what a field means. Associate them by wrapping the control or using for=\"id\" matching the control’s id. Clicking the label focuses the control. Screen readers announce labels — placeholders are not a substitute.",
        whenToUse: "Every meaningful input.",
        whenNotToUse: "Do not rely on placeholder alone as the only label.",
        demos: [
          h('<label for="user">Username</label>\n<input id="user" name="user">', "Explicit for/id pairing"),
        ],
      }),
      t({
        id: "button",
        title: "<button>",
        tags: ["forms", "buttons"],
        summary: "A clickable button that can submit, reset, or run custom actions.",
        description:
          "Inside a form, <button type=\"submit\"> submits. type=\"button\" does nothing by itself until JavaScript listens for clicks — perfect for UI actions. Prefer <button> over <a> for actions, and prefer <a> for navigation. Button content can include text and elements; it is richer than <input type=\"submit\">.",
        whenToUse: "Actions and form submission.",
        whenNotToUse: "Navigating to another page — use a link.",
        demos: [
          h(
            '<button type="button" onclick="alert(\'Hello!\')">Click Me</button>',
            "JavaScript alert button",
            "The rendered button is interactive.",
            { tryIt: true, resultNote: "Clicking runs alert inside the sandbox." }
          ),
        ],
        mistakes: ["Using a link styled as a button for form submit without care.", "Forgetting type=\"button\" so it accidentally submits a form."],
      }),
      t({
        id: "textarea",
        title: "<textarea>",
        tags: ["forms"],
        summary: "Multi-line text input.",
        description:
          "Use <textarea> for comments and messages. Content goes between opening and closing tags (not a value attribute). rows and cols are hints; CSS usually sizes it better.",
        whenToUse: "Longer free-text responses.",
        whenNotToUse: "Single-line values — use input.",
        demos: [h("<label>Message\n<textarea name=\"msg\" rows=\"4\">Hello</textarea>\n</label>", "", "", { tryIt: true })],
      }),
      t({
        id: "select",
        title: "<select>",
        tags: ["forms"],
        summary: "A dropdown (or listbox) of options.",
        description:
          "<select> contains <option> elements. The chosen option’s value is submitted under the select’s name. Use multiple for multi-select when appropriate.",
        whenToUse: "Choosing one (or more) options from a known list.",
        whenNotToUse: "Very long lists without search — consider other UI patterns.",
        demos: [
          h(
            '<label>Size\n  <select name="size">\n    <option value="s">Small</option>\n    <option value="m" selected>Medium</option>\n    <option value="l">Large</option>\n  </select>\n</label>',
            "",
            "",
            { tryIt: true }
          ),
        ],
      }),
      t({
        id: "option",
        title: "<option>",
        tags: ["forms"],
        summary: "One choice inside a select (or datalist).",
        description: "Each <option> can have a value attribute. If omitted, the text content is used as the value. selected marks the default.",
        whenToUse: "Inside select.",
        whenNotToUse: "As a standalone control.",
        demos: [h("<select><option>One</option><option selected>Two</option></select>")],
      }),
      t({
        id: "fieldset",
        title: "<fieldset>",
        tags: ["forms", "a11y"],
        summary: "Groups related controls, especially radio sets.",
        description:
          "<fieldset> visually and semantically groups controls. Pair with <legend> as the group label. Excellent for radio buttons that share a question.",
        whenToUse: "Related controls under one question or category.",
        whenNotToUse: "Unnecessary wrapping of a single simple field.",
        demos: [
          h(
            "<fieldset>\n  <legend>Shipping</legend>\n  <label><input type=\"radio\" name=\"ship\" value=\"std\" checked> Standard</label>\n  <label><input type=\"radio\" name=\"ship\" value=\"exp\"> Express</label>\n</fieldset>",
            "",
            "",
            { tryIt: true }
          ),
        ],
      }),
      t({
        id: "legend",
        title: "<legend>",
        tags: ["forms"],
        summary: "Caption for a fieldset.",
        description: "The <legend> names the group. Place it as the first child of fieldset.",
        whenToUse: "With fieldset groups.",
        whenNotToUse: "As a page heading outside forms.",
        demos: [h("<fieldset><legend>Contact</legend><label>Email <input type=\"email\"></label></fieldset>")],
      }),
      t({
        id: "input-types",
        title: "Important input types",
        tags: ["forms", "input"],
        summary: "The type attribute changes how an input looks and behaves.",
        description:
          "type selects the control kind. Mobile browsers often show specialized keyboards (email, number). Some types provide built-in validation. Support varies slightly by browser, but the common types below are widely usable.",
        whenToUse: "Pick the type that matches the data you need.",
        whenNotToUse: "Do not use text for everything when a better type exists.",
        demos: inputTypes.map(([type, desc]) =>
          h(
            `<label>${type}: <input type="${type}"${type === "radio" || type === "checkbox" ? ' name="demo"' : ""}${type === "submit" || type === "reset" ? ` value="${type}"` : ""}></label>\n<p><small>${desc}</small></p>`,
            `type="${type}"`,
            desc,
            { tryIt: type === "text" || type === "checkbox" || type === "color" || type === "range" }
          )
        ),
      }),
      t({
        id: "form-attributes",
        title: "Common form attributes",
        tags: ["forms", "attributes"],
        summary: "name, value, placeholder, required, and other attributes that control form behavior.",
        description:
          "name identifies the field in submitted data. value is the current or default value. placeholder is a hint, not a label. required blocks submit if empty. disabled makes a control unusable and excludes it from submit. readonly keeps a value visible but not editable. checked/selected set defaults for checkboxes/radios/options. min, max, step constrain numbers/dates/ranges. pattern is a regular expression for custom text validation.",
        whenToUse: "Wire forms correctly for validation and submission.",
        whenNotToUse: "Do not use placeholder instead of a visible label.",
        attributes: [
          { name: "name", description: "Field key in form data." },
          { name: "value", description: "Current value of the control." },
          { name: "placeholder", description: "Hint text shown when empty." },
          { name: "required", description: "Must be filled before submit." },
          { name: "disabled", description: "Non-interactive; not submitted." },
          { name: "readonly", description: "Not editable but still submitted." },
          { name: "checked", description: "Default on for checkbox/radio." },
          { name: "selected", description: "Default option in a select." },
          { name: "min / max / step", description: "Numeric/date/range constraints." },
          { name: "pattern", description: "Regex for text validation." },
        ],
        demos: [
          h(
            '<form onsubmit="event.preventDefault(); alert(\'OK\');">\n  <label>Code <input name="code" required pattern="[A-Z]{3}" placeholder="ABC"></label>\n  <button>Check</button>\n</form>',
            "required + pattern",
            "Try submitting empty or invalid values.",
            { tryIt: true }
          ),
        ],
        mistakes: ["Using placeholder as the only label.", "Expecting disabled fields to submit."],
      }),
    ],
  };
}
