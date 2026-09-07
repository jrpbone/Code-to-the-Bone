import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { articles, articleTags, searchArticles } from "../data/articles";

const topics = [...new Set(articles.flatMap(articleTags))].sort();

export default function Articles() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const tag = (params.get("tag") ?? "").replace(/^#+/, "").trim().toLocaleLowerCase();
  const [input, setInput] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchArticles(articles, query, tag);
  useEffect(() => setInput(query), [query]);

  function updateSearch(value: string) {
    const next = new URLSearchParams(params);
    if (value.trim()) next.set("q", value.trim());
    else next.delete("q");
    setParams(next, { preventScrollReset: true });
  }

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateSearch(input);
  }

  function clearSearch() {
    setInput("");
    updateSearch("");
    inputRef.current?.focus();
  }

  return (
    <section aria-labelledby="articles-heading" className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <Link
        to="/"
        className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-teal underline-offset-4 hover:underline"
      >
        <span aria-hidden="true">←</span> Back home
      </Link>

      <p className="mt-8 font-mono text-xs font-medium uppercase tracking-[0.24em] text-teal">
        Explore the archive
      </p>
      <h1
        id="articles-heading"
        className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-navy-800 sm:text-5xl"
      >
        All articles<span className="text-cyan">.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate">
        Browse coding tips, small projects, and developer humor. Follow a topic or find your next read.
      </p>

      <form
        role="search"
        aria-label="Search articles"
        onSubmit={search}
        onReset={(event) => {
          event.preventDefault();
          clearSearch();
        }}
        className="mt-8 rounded-lg border border-linecool bg-surface p-5 sm:p-6"
      >
        <label htmlFor="article-search" className="block text-sm font-medium text-navy-800">
          Search articles
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            ref={inputRef}
            id="article-search"
            name="q"
            type="search"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Try web development or #programming"
            className="min-h-11 min-w-0 flex-1 rounded-md border border-linecool bg-mist px-4 py-3 text-base text-navy-800 placeholder:text-slate"
          />
          <button
            type="submit"
            className="min-h-11 rounded-md bg-navy-800 px-6 py-3 text-sm font-medium text-surface transition-colors hover:bg-teal"
          >
            Search
          </button>
          <button
            type="reset"
            className="min-h-11 rounded-md border border-linecool px-5 py-3 text-sm font-medium text-teal transition-colors hover:border-teal"
          >
            Clear
          </button>
        </div>
      </form>

      <div className="mt-6 flex flex-wrap gap-2" aria-label="Filter articles by topic">
        {["", ...topics].map(topic => {
          const next = new URLSearchParams(params);
          if (topic) next.set("tag", topic);
          else next.delete("tag");
          return (
            <Link key={topic} to={{ pathname: "/articles", search: next.toString() }} preventScrollReset aria-current={tag === topic ? "true" : undefined} className={`max-w-full wrap-break-word rounded-full border px-3 py-2 text-sm transition-colors ${tag === topic ? "border-navy-800 bg-navy-800 text-surface" : "border-linecool bg-surface text-teal hover:border-teal"}`}>
              {topic ? `#${topic}` : "All topics"}
            </Link>
          );
        })}
      </div>

      <p role="status" aria-live="polite" aria-atomic="true" className="mb-6 mt-8 text-sm text-slate">
        {results.length} {results.length === 1 ? "article" : "articles"}
        {query ? ` found for “${query}”` : " to explore"}
        {tag && ` tagged #${tag}`}
      </p>

      {results.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => (
            <ArticleCard key={article.slug} article={article} headingLevel={2} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-linecool bg-surface px-6 py-12 text-center">
          <h2 className="font-display text-xl font-bold text-navy-800">No articles found</h2>
          <p className="mt-3 text-slate">Try another word or reset the filters to see all articles.</p>
          <button
            type="button"
            onClick={() => { setInput(""); setParams({}); inputRef.current?.focus(); }}
            className="mt-5 min-h-11 rounded-md bg-navy-800 px-5 py-3 text-sm font-medium text-surface transition-colors hover:bg-teal"
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
