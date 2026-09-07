export type ArticleImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type Article = {
  slug: string;
  title: string;
  category: "Tips" | "Projects" | "Humor" | "News";
  excerpt: string;
  content: string[];
  tags: string[];
  publishedAt?: string;
  facebookUrl?: string;
  images?: ArticleImage[];
  /** Whether the article includes code. Set true with codeZip to offer a download. */
  hasCode?: boolean;
  /** ZIP in public/downloads, referenced as /downloads/filename.zip. Omit to hide the button. */
  codeZip?: string;
  /** File inside the ZIP to verify after extraction. */
  codeChecksumFile?: string;
  /** SHA-256 of codeChecksumFile. Regenerate whenever that file changes. */
  codeSha256?: string;
  sample: boolean;
};

// Add posts with a unique slug, ISO publication date, and direct Facebook post
// URL. Set sample to false for real posts. Undated examples appear last.
// Store images in public/images/articles/<slug>/ and reference them as
// /images/articles/<slug>/01.webp. Array order controls gallery order and the
// first image is the card cover. Tags accept words with or without a leading #.
const entries: Article[] = [
  {
    slug: "start-with-web-unless-you-need-native-features",
    title: "Start with web unless you need native features",
    category: "Tips",
    excerpt: "A quick tip on what you need to build",
    tags: ["programming", "webdevelopment", "mobiledevelopment", "softwaredevelopment"],
    images: [
      {
        src: "/images/articles/I/p1.png",
        alt: "Guide to choosing between web, mobile, and desktop development"
      }],
    content: [
      "A beginner developer wants to build one simple app. He spends days choosing between web, mobile, and desktop development. Finally, he chooses mobile. The app works well on Android, but then he shares it with his friends. Some use iPhones. Others do not want to install an app. Every update requires another download.",
      "The problem was not his code.",
      "He chose the platform before understanding his users. For most beginner projects, starting with a web app is the practical choice. Anyone with a browser can open it through a link. You can test your idea, collect feedback, and release updates without asking users to install anything again. You can even turn it into a Progressive Web App later.",
      "A PWA can be installed like a normal app and may support offline features. Move to mobile when your project needs deeper access to phone features, app-store distribution, or a strongly native experience. Choose desktop when the application needs deeper operating-system access or is built for computer-focused workflows.",
      "So guys, do not start by asking which platform is the best. Start by asking where your users are. Your first platform does not need to be your final platform.",
      "Which one did you choose for your first project?"
    ],
    sample: false,
  },
  {
    slug: "do-not-give-your-AI-agent-the-master-key",
    title: "Do not give your AI agent the master key",
    category: "Tips",
    excerpt: "Don't let your AI agent become your next admin account.",
    tags: ["ArtificialIntelligence", "Automation", "CyberSecurity", "IT"],
    images: [
      {
        src: "/images/articles/II/p2.png",
        alt: "Don't give your AI agent the master key"
      }],
    content: [
      "Don't let your AI agent become your next admin account.",
      "An AI agent can read emails, update files, call APIs, deploy code, and trigger workflows. That power is useful, but it can also turn one bad instruction into a very expensive afternoon. OWASP calls this risk excessive agency: too much functionality, too many permissions, or too much autonomy.",
      "For example, an agent that summarises support tickets may only need read access. It does not need permission to delete messages, change user roles, or issue refunds.",
      "Before putting any agent on autopilot:",
      `1. Give it a dedicated identity.
       2. Start with read-only access.
       3. Allowlist only the tools it needs.
       4. Require approval for deletes, payments, deployments, and external messages.
       5. Log every action so you can trace what happened.`,
      "The goal is not to make AI useless. It is to make mistakes small, visible, and reversible.",
      "So, automate the work, not the risk.",
      "What is one permission you would never give an AI agent?",
    ],
    sample: false,
  },
  {
    slug: "automate-one-boring-task-with-python",
    title: "Automate one boring task with Python",
    category: "Projects",
    excerpt: "Automation kills the boring work.",
    tags: ["Python", "Automation", "Programming", "IT"],
    images: [
      {
        src: "/images/articles/III/p3.png",
        alt: "Automation folder duty"
      },
      {
        src: "/images/articles/III/p3-code.png",
        alt: "Automation code"
      },
    ],
    content: [
      "Your Downloads folder is a practical place to start learning Python automation. PDFs, screenshots, spreadsheets, and ZIP files all land in the same place. Then you spend time dragging them into folders. Again.",
      "You can write a small Python script that sorts them using rules you choose.",
      "For example:",
      `• PDF files go into Documents.,
       • JPG and PNG files go into Images.,
       • CSV and XLSX files go into Spreadsheets.,
       • ZIP files go into Archives.`,        
      "Python includes `pathlib` for working with file paths and `shutil` for operations such as moving files. The basic flow is simple: check each file's extension, choose its destination, then move it. Start with a test folder containing copies of a few files.",
      "Make your first version print the planned moves so you can check the rules. Add a check to skip files when the destination already has the same name. Once the results look right, enable the moves and run it when needed.",
      "So guys, pick one repetitive task and turn it into a small project you can actually use.",
      "What is one boring computer task you keep doing manually?",
    ],
    sample: false,
    hasCode: true,
    codeZip: "/downloads/III/organizer.zip",
    codeChecksumFile: "organize_files.py",
    codeSha256: "c056318023794993a4e2e7c65f40ff1134247b62733ef11b262cc498abe43962",
  },
  {
    slug: "gpt-6-astra",
    title: "GPT-6 Astra",
    category: "News",
    excerpt: "AGI era begins with GPT-6 Astra, the first AI agent that can read, write, and reason across multiple modalities.",
    tags: ["ArtificialIntelligence", "IT", "OpenAI"],
    images: [
      {
        src: "/images/articles/IV/p4.png",
        alt: "Sam Altman"
      }],
    content: [
    "GPT-6 Astra lets you change direction while your AI is still working.",
    "That could be useful when a requirement changes halfway through a coding task. OpenAI's new flagship model is built for complex work across code, research, and computer tools. Two additions stand out for developers.",
    "First, mid-turn steering. Through the Responses API over a WebSocket connection, you can send a correction while Astra works. Completed work is preserved as it continues with your update. For example, imagine an assistant building a dashboard when you realise it needs to use your existing design system. You could send that requirement during the task.",
    "Second, async tool calling. Astra can work on independent parts of a request while a tool is running. Think of a coding assistant reviewing documentation while it waits for a test run. Your application still runs the tools and manages their results.",
    "Astra also supports a 1.05-million-token context window, giving it room for substantial project material in one request.",
    "My takeaway: these capabilities could make AI assistants easier to work with during the messy middle of a project.",
    "A useful first experiment would be one familiar task. Track completion time, corrections needed, and whether the result actually passes your checks.",
    "Which would help your workflow more: changing instructions mid-task or keeping work moving while tools run?",

    "Sources:",

    `[OpenAI GPT-6 Astra guide](https://developers.openai.com/api/docs/guides/latest-model): mid-turn steering, async tool calling, and multistep work.",
     [OpenAI GPT-6 Astra model specifications](https://developers.openai.com/api/docs/models/gpt-6-astra): context window.",`
    ],
    sample: false,
  },
];

export function newestFirst(items: readonly Article[]): Article[] {
  const timestamp = (article: Article) => {
    const value = article.publishedAt ? Date.parse(article.publishedAt) : NaN;
    return Number.isFinite(value) ? value : -Infinity;
  };
  return [...items].sort((a, b) => timestamp(b) - timestamp(a));
}

function normalizeTag(tag: string): string {
  return tag.trim().replace(/^#+/, "").toLocaleLowerCase();
}

export function articleTags(article: Article): string[] {
  return [...new Set(article.tags.map(normalizeTag).filter(Boolean))];
}

export function searchArticles(items: readonly Article[], query: string, tag = ""): Article[] {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).map(term => term.replace(/^#+/, "")).filter(Boolean);
  const selectedTag = normalizeTag(tag);
  return items.filter((article) => {
    const tags = articleTags(article);
    const text = [article.title, article.category, article.excerpt, ...article.content, ...tags].join(" ").toLocaleLowerCase();
    return (!selectedTag || tags.includes(selectedTag)) && terms.every((term) => text.includes(term));
  });
}

export const articles = newestFirst(entries);
