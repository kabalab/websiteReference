export function buildGithub({ elementTopic: t, htmlDemo: h }) {
  const step = (id, title, summary, description, extra = {}) =>
    t({
      id,
      title,
      type: "guide",
      tags: ["github-pages", "guide", id],
      summary,
      description,
      whenToUse: extra.whenToUse || "Follow this step in order when publishing your first site.",
      whenNotToUse: extra.whenNotToUse || "Skip only if you have already completed this step.",
      syntax: extra.syntax,
      demos: extra.demos || [],
      visual: extra.visual,
      commonMistakes: extra.mistakes || [],
      beginnerTips: extra.tips || [],
      advancedNotes: extra.advanced || [],
      related: extra.related || [],
      level: "beginner",
    });

  return {
    id: "github-pages",
    title: "GitHub Pages",
    hash: "github-pages",
    intro:
      "A practical beginner-friendly path to publish a website for free with GitHub Pages. GitHub’s buttons and labels change over time — focus on the ideas: repository → files → Pages settings → public URL → commit updates.",
    subsections: [
      {
        id: "overview",
        title: "Overview",
        topics: [
          step(
            "what-github-pages-is",
            "What GitHub Pages is",
            "A free static hosting service that turns a GitHub repository into a public website.",
            "GitHub Pages serves HTML, CSS, JavaScript, images, and other static files from a repository. It does not run server-side languages like PHP or a custom database on the Pages host. That makes it perfect for portfolios, documentation, and learning projects — including this reference site. Your site gets a URL such as https://USERNAME.github.io/REPO/.",
            {
              tips: [
                "Static means the server sends files as-is; interactivity still works with client-side JavaScript.",
                "You can use a custom domain later if you want.",
              ],
              visual:
                "Your files on GitHub\n        ↓\nGitHub Pages builds/publishes\n        ↓\nhttps://you.github.io/your-repo/",
            }
          ),
        ],
      },
      {
        id: "account",
        title: "Account",
        topics: [
          step(
            "creating-github-account",
            "Creating a GitHub account",
            "Sign up at github.com, verify email, and secure the account.",
            "Go to https://github.com and create an account. Choose a username carefully — it appears in default Pages URLs (username.github.io). Verify your email so you can create repositories. Enable two-factor authentication when you can. You do not need to know Git yet to publish with the website upload flow.",
            {
              tips: ["Write down your username; you will type it often."],
              mistakes: ["Using an email you cannot access for verification."],
            }
          ),
        ],
      },
      {
        id: "repository",
        title: "Repository",
        topics: [
          step(
            "creating-a-repository",
            "Creating a repository",
            "A repository (repo) is a project folder GitHub stores for you — with history.",
            "Click the + menu → New repository. Choose a name (for example my-website). Public repositories can use free GitHub Pages. Add a README if you want a starting file. You can skip .gitignore and license while learning. Create the repository.",
            {
              tips: [
                "For a user site, a special repo named USERNAME.github.io publishes at the root domain.",
                "For project sites, any repo name works and the URL includes the repo name.",
              ],
              mistakes: ["Making the repo private when you expected free Pages (private Pages needs a paid plan)."],
            }
          ),
          step(
            "understanding-a-repository",
            "Understanding a repository",
            "Files + commit history + collaboration features.",
            "A repository holds your project files and tracks changes as commits (snapshots with messages). Branches are parallel versions; beginners can stay on main. Issues and Pull Requests help teams — optional for a solo first site. Think of the repo as both storage and a timeline of your work.",
            {
              visual:
                "Repository\n├── commits (history)\n├── branches (main, …)\n└── files (HTML, CSS, JS, images)",
            }
          ),
        ],
      },
      {
        id: "files",
        title: "Website files",
        topics: [
          step(
            "creating-website-files",
            "Creating your website files",
            "Prepare HTML, CSS, JS, and assets on your computer (or create them on GitHub).",
            "A simple site needs at least index.html. Add style.css and script.js as you grow. Keep names lowercase without spaces. You can write files in any text editor (VS Code, Notepad++, Cursor).",
            {
              visual:
                "my-website/\n├── index.html\n├── style.css\n├── script.js\n└── images/\n    └── logo.png",
            }
          ),
          step(
            "uploading-files",
            "Uploading files",
            "Add files through GitHub’s web UI or push with Git.",
            "On GitHub: open the repo → Add file → Upload files → drag your files → commit. Or use Git locally: git add, git commit, git push. Both end with files on the main branch. The web UI is enough for your first publish.",
            {
              tips: ["Commit messages should say why you changed something, e.g. “Add homepage markup”."],
            }
          ),
          step(
            "creating-index-html",
            "Creating index.html",
            "The default homepage filename servers look for.",
            "GitHub Pages serves index.html when someone visits your site root. Start from a complete HTML5 skeleton with charset, viewport, and a title. Put visible content in the body.",
            {
              demos: [
                h(
                  "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Website</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <h1>Hello</h1>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
                  "Starter index.html"
                ),
              ],
              mistakes: ["Naming the home page home.html without configuring Pages — visitors expect index.html."],
            }
          ),
          step(
            "creating-css-files",
            "Creating CSS files",
            "Put styles in .css files and link them from HTML.",
            "Create style.css beside index.html. Link it in the head. External CSS keeps structure and presentation separated — the same lesson this reference site teaches.",
            {
              syntax: '<link rel="stylesheet" href="style.css">',
              demos: [
                h(
                  "<p>After linking CSS, rules in style.css style your page.</p>"
                ),
              ],
            }
          ),
          step(
            "creating-js-files",
            "Creating JavaScript files",
            "Add interactivity with a .js file referenced by a script tag.",
            "Create script.js and load it at the end of body (or as type=\"module\"). Confirm the path is correct relative to the HTML file.",
            {
              syntax: '<script src="script.js"></script>',
            }
          ),
          step(
            "organizing-project",
            "Organizing your project",
            "Use clear folders for css, js, images, and data.",
            "As projects grow, split files into folders. Update relative paths when you move files. A clean structure makes GitHub Pages debugging easier.",
            {
              visual:
                "my-website/\n├── index.html\n├── css/\n│   └── style.css\n├── js/\n│   └── script.js\n├── assets/\n│   └── images/\n└── README.md",
              tips: ["If CSS “doesn’t work,” check the href path first."],
            }
          ),
        ],
      },
      {
        id: "connect",
        title: "Connect the files",
        topics: [
          step(
            "linking-css-js",
            "Linking CSS and JavaScript",
            "HTML must reference your CSS and JS paths correctly.",
            "Use link for CSS in head and script for JS. Paths are relative to the HTML file’s location. After publishing, a wrong path shows up as missing styles or console 404 errors.",
            {
              demos: [
                h(
                  "<p><code>&lt;link rel=\"stylesheet\" href=\"css/style.css\"&gt;</code></p>\n<p><code>&lt;script src=\"js/script.js\"&gt;&lt;/script&gt;</code></p>"
                ),
              ],
              mistakes: [
                "Using absolute Windows paths like C:\\Users\\... in href/src.",
                "Forgetting to upload the CSS/JS file you linked.",
              ],
            }
          ),
        ],
      },
      {
        id: "publish",
        title: "Publish",
        topics: [
          step(
            "enabling-github-pages",
            "Enabling GitHub Pages",
            "Turn on Pages in the repository settings.",
            "Open your repository on GitHub → Settings → Pages (sometimes under “Code and automation”). GitHub’s settings layout changes over time — look for Pages. Choose a publishing source (usually Deploy from a branch). Select the branch (main) and folder (/ root or /docs). Save. Wait a minute for the first deploy.",
            {
              tips: [
                "If you cannot find Pages, use the Settings search box.",
                "Build status appears as a green check on commits when using Actions-based Pages.",
              ],
              advanced: [
                "Some repos publish via GitHub Actions workflows instead of “branch” source — the idea is the same: ship static files to Pages.",
              ],
            }
          ),
          step(
            "choosing-publishing-source",
            "Choosing the publishing source",
            "Pick which branch/folder (or Action) becomes the live site.",
            "Common beginner choice: branch main, folder / (root). If you keep docs in a docs/ folder, select that. Only one source is live. Commit on that branch to update the site.",
            {
              visual:
                "Settings → Pages\n  Source: Deploy from a branch\n  Branch: main\n  Folder: / (root)",
            }
          ),
          step(
            "getting-website-url",
            "Getting your website URL",
            "Find the public URL on the Pages settings screen.",
            "After enabling, Pages shows a URL like https://USERNAME.github.io/REPO_NAME/. Visit it. If you see a 404, wait a minute, confirm index.html is at the published root, and hard-refresh. Project sites need the repo name in the path; assets must use relative URLs.",
            {
              mistakes: [
                "Expecting https://username.github.io without the repo name for a project repo.",
                "Using absolute paths starting with / that ignore the project subpath.",
              ],
              tips: [
                "For project Pages, prefer relative paths (./style.css) or set a correct base carefully.",
              ],
            }
          ),
        ],
      },
      {
        id: "update",
        title: "Updating",
        topics: [
          step(
            "updating-website",
            "Updating your website",
            "Edit files → commit → Pages republishes.",
            "Change a file locally or on github.com → commit to the publishing branch → wait for Pages to rebuild → refresh the live URL. Caching can briefly show old assets — hard refresh if needed.",
            {
              visual:
                "Edit files\n   ↓\nCommit changes\n   ↓\nGitHub Pages rebuilds\n   ↓\nWebsite updates",
            }
          ),
          step(
            "github-vs-local-git",
            "Editing on GitHub vs using Git locally",
            "Two workflows — same destination.",
            "GitHub website editing is great for small text changes. Local Git (clone, branch, commit, push) scales better for real development and works with editors like Cursor/VS Code. Learn the web flow first; add Git CLI when you are ready.",
            {
              tips: [
                "You do not need to master Git before publishing your first page.",
                "When you learn Git: status → add → commit → push is the core loop.",
              ],
            }
          ),
        ],
      },
      {
        id: "troubleshoot",
        title: "Troubleshooting",
        topics: [
          step(
            "common-problems",
            "Common problems",
            "404s, missing CSS, long waits, and private repo limits.",
            "404 at site URL: Pages not enabled, wrong branch/folder, or missing index.html. Unstyled page: wrong CSS path or still loading. Old content: wait for deploy or hard refresh. Forms that POST nowhere: Pages has no backend — use a form service or static-only UX. Check the Actions/Pages build log if available.",
            {
              mistakes: [
                "Assuming a missing stylesheet means CSS is “broken” when the path 404s.",
                "Publishing from an empty branch.",
              ],
              tips: ["Open DevTools Network tab and look for red 404 files."],
            }
          ),
        ],
      },
      {
        id: "custom",
        title: "Custom domains",
        topics: [
          step(
            "custom-domains",
            "Custom domains",
            "Point your own domain at GitHub Pages.",
            "Buy a domain from a registrar. In repo Pages settings, add your custom domain and follow GitHub’s DNS instructions (usually A/AAAA or CNAME records). Enable HTTPS once DNS verifies. DNS changes can take time to propagate. Exact DNS screens differ by registrar — trust their docs plus GitHub’s current custom domain guide.",
            {
              tips: [
                "Get the default github.io URL working before adding a custom domain.",
                "Keep the GitHub docs tab open while editing DNS — UIs change.",
              ],
              advanced: [
                "Enforce HTTPS and understand apex vs www differences.",
              ],
            }
          ),
        ],
      },
    ],
  };
}
