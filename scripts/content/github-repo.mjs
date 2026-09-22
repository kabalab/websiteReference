/**
 * Create a GitHub Repo — linear guide steps.
 * Reorder by moving objects in the `steps` array, then run:
 *   node scripts/generate-content.mjs
 */
export function buildGithubRepo({ guideSection, guideStep }) {
  return guideSection({
    id: "github-repo",
    title: "Create a GitHub Repo",
    hash: "github-repo",
    intro:
      "A step-by-step path to create a GitHub account, make a repository, and get your website files onto GitHub. Reorder or edit steps in scripts/content/github-repo.mjs — then regenerate content.",
    steps: [
      guideStep({
        id: "what-is-a-repository",
        title: "What a repository is",
        body: [
          "A repository (repo) is a project folder that GitHub stores for you, including a history of changes.",
          "Think of it as both storage and a timeline: every commit is a snapshot with a short message explaining what changed.",
        ],
        images: [
          {
            src: "assets/guides/github-repo/01-what-is-a-repository.svg",
            alt: "Placeholder: diagram of a repository holding files and history",
            caption: "Replace with a screenshot or diagram of a repository overview",
          },
        ],
        tips: ["You do not need to master Git before creating your first repo."],
      }),
      guideStep({
        id: "creating-github-account",
        title: "Create a GitHub account",
        body: [
          "Go to github.com and sign up. Choose a username carefully — it appears in default site URLs (username.github.io).",
          "Verify your email so you can create repositories. Enable two-factor authentication when you can.",
        ],
        links: [{ label: "GitHub home", href: "https://github.com" }],
        images: [
          {
            src: "assets/guides/github-repo/02-creating-github-account.svg",
            alt: "Placeholder: GitHub sign-up page",
            caption: "Replace with a screenshot of the GitHub sign-up or account page",
          },
        ],
        tips: ["Write down your username; you will type it often."],
        mistakes: ["Using an email you cannot access for verification."],
      }),
      guideStep({
        id: "creating-a-repository",
        title: "Create a repository",
        body: [
          "Click the + menu → New repository. Choose a name (for example my-website).",
          "Public repositories can use free GitHub Pages later. Add a README if you want a starting file. You can skip .gitignore and license while learning. Then create the repository.",
        ],
        links: [{ label: "New repository", href: "https://github.com/new" }],
        images: [
          {
            src: "assets/guides/github-repo/03-creating-a-repository.svg",
            alt: "Placeholder: New repository form on GitHub",
            caption: "Replace with a screenshot of the New repository form",
          },
        ],
        tips: [
          "For a user site, a special repo named USERNAME.github.io publishes at the root domain.",
          "For project sites, any repo name works and the URL includes the repo name.",
        ],
        mistakes: ["Making the repo private when you expected free Pages (private Pages needs a paid plan)."],
      }),
      guideStep({
        id: "understanding-a-repository",
        title: "Understand what you just created",
        body: [
          "Your repo holds project files and tracks changes as commits. Branches are parallel versions; beginners can stay on main.",
          "Issues and Pull Requests help teams — optional for a solo first site.",
        ],
        images: [
          {
            src: "assets/guides/github-repo/04-understanding-a-repository.svg",
            alt: "Placeholder: repository file list and commit history",
            caption: "Replace with a screenshot of your empty or README-only repo",
          },
        ],
      }),
      guideStep({
        id: "creating-website-files",
        title: "Create your website files",
        body: [
          "A simple site needs at least index.html. Add style.css and script.js as you grow. Keep names lowercase without spaces.",
          "You can write files in any text editor (VS Code, Notepad++, Cursor) or create them on GitHub later.",
        ],
        images: [
          {
            src: "assets/guides/github-repo/05-creating-website-files.svg",
            alt: "Placeholder: local folder with index.html, CSS, and JS",
            caption: "Replace with a screenshot of your local project folder",
          },
        ],
        tips: ["Start with one index.html file if you want the shortest path."],
      }),
      guideStep({
        id: "uploading-files",
        title: "Upload files to the repository",
        body: [
          "On GitHub: open the repo → Add file → Upload files → drag your files → commit.",
          "Or use Git locally: git add, git commit, git push. Both end with files on the main branch. The web UI is enough for your first upload.",
        ],
        images: [
          {
            src: "assets/guides/github-repo/06-uploading-files.svg",
            alt: "Placeholder: GitHub Upload files screen",
            caption: "Replace with a screenshot of Add file → Upload files",
          },
        ],
        tips: ['Commit messages should say why you changed something, e.g. “Add homepage markup”.'],
      }),
      guideStep({
        id: "creating-index-html",
        title: "Add an index.html homepage",
        body: [
          "Servers look for index.html when someone visits the site root. Start from a complete HTML5 skeleton with charset, viewport, and a title.",
          "Put visible content in the body. You can expand markup later using the Intro HTML section of this reference.",
        ],
        images: [
          {
            src: "assets/guides/github-repo/07-creating-index-html.svg",
            alt: "Placeholder: index.html file in the repository",
            caption: "Replace with a screenshot of index.html in your repo",
          },
        ],
        links: [{ label: "Intro HTML section", href: "#/html" }],
        mistakes: ["Naming the home page home.html — visitors and Pages expect index.html by default."],
      }),
      guideStep({
        id: "organizing-project",
        title: "Organize folders (optional)",
        body: [
          "As projects grow, split files into folders such as css/, js/, and images/. Update relative paths when you move files.",
          "A clean structure makes publishing and debugging easier in the next guide.",
        ],
        images: [
          {
            src: "assets/guides/github-repo/08-organizing-project.svg",
            alt: "Placeholder: project folder tree",
            caption: "Replace with a screenshot of your organized project tree",
          },
        ],
        tips: ["If CSS “doesn’t work” later, check the href path first."],
        links: [
          {
            label: "Next: Publish with GitHub Pages",
            href: "#/github-pages",
          },
        ],
      }),
    ],
  });
}
