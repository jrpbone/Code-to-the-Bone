import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { articleTags, type Article } from "../data/articles";
import ImageArrows from "./ImageArrows";

type ArticleCardProps = {
  article: Article;
  headingLevel?: 2 | 3;
};

export default function ArticleCard({ article, headingLevel = 3 }: ArticleCardProps) {
  const titleId = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const images = article.images ?? [];
  const currentIndex = Math.min(selectedIndex, Math.max(0, images.length - 1));
  const cover = images[currentIndex];
  const step = (direction: number) => setSelectedIndex(index =>
    (Math.min(index, images.length - 1) + direction + images.length) % images.length
  );
  const tags = articleTags(article);
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-linecool bg-surface transition-colors hover:border-teal">
      {cover && (
        <div className="px-6 pt-6 sm:px-7 sm:pt-7">
          <div className="on-dark overflow-hidden rounded-lg border border-navy-700 bg-navy-900">
            <div className="image-frame-bar">
              <span className="text-cyan-bright">FIG. {String(currentIndex + 1).padStart(2, "0")}</span>
              <span role="status" aria-live="polite" aria-atomic="true">{currentIndex + 1} / {images.length}</span>
            </div>
          <div className="image-canvas relative flex aspect-4/3 items-center justify-center">
            <Link to={`/articles/${article.slug}`} aria-label={`Read ${article.title}`} className="block h-full w-full p-3 focus-visible:outline-offset-4">
              <img src={cover.src} alt={cover.alt} loading="lazy" decoding="async" className="image-artwork h-full w-full object-contain" />
            </Link>
            {images.length > 1 && (
                <ImageArrows onPrevious={() => step(-1)} onNext={() => step(1)} />
            )}
          </div>
          </div>
        </div>
      )}
      <Link
        to={`/articles/${article.slug}`}
        aria-labelledby={titleId}
        className="group flex flex-1 flex-col p-6 focus-visible:outline-offset-4 sm:p-7"
      >


        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-teal">
            {article.category}
          </span>
          {article.sample && (
            <span className="rounded-full border border-cyan/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-teal">
              sample
            </span>
          )}
        </div>

        <span aria-hidden="true" className="mt-4 h-0.5 w-10 bg-cyan" />
        <Heading
          id={titleId}
          className="mt-4 font-display text-xl font-bold leading-snug tracking-tight text-navy-800 group-hover:text-teal"
        >
          {article.title}
        </Heading>
        {article.publishedAt && (
          <time dateTime={article.publishedAt} className="mt-3 font-mono text-xs text-slate">
            {new Intl.DateTimeFormat("en", {
              year: "numeric",
              month: "short",
              day: "numeric",
              timeZone: "UTC",
            }).format(new Date(article.publishedAt))}
          </time>
        )}
        <p className="mt-3 text-[15px] leading-relaxed text-slate">{article.excerpt}</p>
        <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-teal">
          Read article <span aria-hidden="true">→</span>
        </span>
      </Link>
      {tags.length > 0 && (
        <div aria-label="Article topics" className="flex flex-wrap gap-2 border-t border-linecool px-6 py-4 sm:px-7">
          {tags.map(tag => (
            <Link key={tag} to={`/articles?tag=${encodeURIComponent(tag)}`} className="max-w-full wrap-break-word rounded-full border border-linecool bg-mist px-3 py-1.5 text-xs font-medium text-teal transition-colors hover:border-teal hover:bg-paleblue">
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
