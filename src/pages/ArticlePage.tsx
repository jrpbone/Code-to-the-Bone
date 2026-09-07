import { Link, useParams } from "react-router-dom";
import { articles, articleTags } from "../data/articles";
import { FACEBOOK_PAGE_URL } from "../lib/config";
import ArticleGallery from "../components/ArticleGallery";
import DownloadChecksum from "../components/DownloadChecksum";
import { ExternalIcon, FacebookIcon } from "../components/Icons";

export default function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((entry) => entry.slug === slug);

  if (!article) {
    return (
      <section className="mx-auto min-h-[60vh] max-w-3xl px-5 py-20 sm:px-8">
        <p className="font-mono text-sm text-teal">404 / NOT FOUND</p>
        <h1 className="mt-4 font-display text-4xl font-bold">Article not found</h1>
        <p className="mt-5 text-slate">This article may have moved or is no longer available.</p>
        <Link to="/articles" className="mt-8 inline-block rounded-md bg-navy-800 px-5 py-3 font-medium text-surface">Browse articles</Link>
      </section>
    );
  }

  const hasImages = Boolean(article.images?.length);
  const tags = articleTags(article);
  const publicationDate = article.publishedAt ? new Date(article.publishedAt) : null;

  const codeDownload = article.hasCode && article.codeZip ? (
            <section aria-label="Download article code" className="mt-10 rounded-lg border border-linecool bg-surface p-6 sm:p-8">
              <p className="font-mono text-xs font-medium uppercase tracking-widest text-teal">Try it yourself</p>
              <h2 className="mt-3 font-display text-2xl font-bold">Get the code</h2>
              <p className="mt-3 leading-relaxed text-slate">Download the ZIP file to explore the code from this article.</p>
              <DownloadChecksum key={article.codeZip} zip={article.codeZip} hash={article.codeSha256} filename={article.codeChecksumFile} />
            </section>
  ) : null;

  return (
    <article className={`mx-auto px-5 py-12 sm:px-8 sm:py-16 ${hasImages ? "max-w-6xl" : "max-w-3xl"}`}>
      <Link to="/articles" className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-teal underline-offset-4 hover:underline">
        <span aria-hidden="true">←</span> All articles
      </Link>

      <header className="mt-8 max-w-4xl border-b border-linecool pb-8 sm:pb-10">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-teal">
          <span>{article.category}</span>
          {article.sample && <span className="rounded-full border border-linecool px-2 py-1">Sample article</span>}
          {publicationDate && Number.isFinite(publicationDate.getTime()) && (
            <time dateTime={article.publishedAt} className="text-slate">
              {publicationDate.toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}
            </time>
          )}
        </div>
        <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.12] tracking-tight text-navy-800 sm:text-5xl lg:text-[3.4rem]">
          {article.title}
        </h1>
        <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-slate">{article.excerpt}</p>
        {tags.length > 0 && (
          <nav aria-label="Article tags" className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                to={`/articles?tag=${encodeURIComponent(tag)}`}
                className="inline-flex min-h-11 max-w-full items-center rounded-md border border-linecool bg-surface px-3 py-2 font-mono text-xs wrap-break-word text-teal transition-colors hover:border-teal hover:bg-paleblue"
              >
                #{tag}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <div className={`mt-10 ${hasImages ? "grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12" : ""}`}>
        {hasImages && article.images && (
          <div className="min-w-0">
            <ArticleGallery key={article.slug} images={article.images} />
            {codeDownload}
          </div>
        )}
        <div className="min-w-0">
          <div className="max-w-[65ch] space-y-6 text-lg leading-[1.85] text-navy-800">
            {article.content.map((paragraph, index) => (
              <p key={index} className="whitespace-pre-line wrap-break-word">
                {paragraph.split(/(`[^`\n]+`|\[[^\]\n]+\]\(https?:\/\/[^\s)]+\))/g).map((part, partIndex) => {
                  const link = part.match(/^\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)$/);
                  if (link) {
                    return (
                      <a key={partIndex} href={link[2]} target="_blank" rel="noopener noreferrer" className="text-teal underline decoration-teal/40 underline-offset-4 hover:decoration-teal">
                        {link[1]}<span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    );
                  }
                  return part.startsWith("`") && part.endsWith("`") && part.length > 2 ? (
                    <code key={partIndex} className="rounded border border-linecool bg-paleblue px-1.5 py-0.5 font-mono text-[0.85em] text-teal-deep">
                      {part.slice(1, -1)}
                    </code>
                  ) : part;
                })}
              </p>
            ))}
          </div>

          {!hasImages && codeDownload}

          <aside className="mt-12 rounded-lg border border-linecool bg-paleblue p-6 sm:p-8" aria-label="Join the conversation">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-teal">Over to you</p>
            <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-navy-800">
              {article.facebookUrl ? "Keep the conversation going." : "What are you building?"}
            </h2>
            <p className="mt-3 leading-relaxed text-slate">
              {article.facebookUrl
                ? "Share your experience, ask a question, or join the discussion on the original Facebook post."
                : "Visit Code to the Bone on Facebook for more IT discussions topics."}
            </p>
            <a
              href={article.facebookUrl || FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 max-w-full items-center gap-2 rounded-md bg-navy-800 px-5 py-3 text-sm font-medium text-surface transition-colors hover:bg-teal"
            >
              <FacebookIcon className="h-5 w-5 shrink-0" />
              <span>{article.facebookUrl ? "Discuss on Facebook" : "Visit Facebook page"}</span>
              <ExternalIcon className="h-4 w-4 shrink-0" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </aside>
        </div>
      </div>
    </article>
  );
}
