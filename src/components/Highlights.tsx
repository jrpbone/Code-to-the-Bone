import { Link } from "react-router-dom";
import { articles } from "../data/articles";
import ArticleCard from "./ArticleCard";
import SectionHead from "./SectionHead";

export default function Highlights() {
  return (
    <section id="content" aria-labelledby="content-heading" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHead
          num="01"
          label="EXPLORE"
          title={
            <span id="content-heading">
              Latest articles<span className="text-cyan">.</span>
            </span>
          }
          blurb="Coding tips, small projects, and developer humor. Find something worth reading."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 9).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/articles"
            className="inline-flex min-h-11 items-center gap-3 rounded-md border border-linecool bg-surface px-5 py-3 text-[15px] font-medium text-navy-800 transition-colors hover:border-teal hover:text-teal"
          >
            View all articles
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
