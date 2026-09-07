import assert from "node:assert/strict";
import test from "node:test";
import { articleTags, newestFirst, searchArticles, type Article } from "../src/data/articles.ts";

const makeArticle = (slug: string, publishedAt?: string): Article => ({
  slug, publishedAt, title: slug, category: "Tips", excerpt: "A useful starting point",
  content: ["Handle an unexpected network timeout."], tags: [], sample: false,
});

test("newest posts precede older posts and undated samples without changing source order", () => {
  const input = [makeArticle("sample"), makeArticle("older", "2026-01-01"), makeArticle("newer", "2026-09-01"), makeArticle("invalid", "invalid")];
  assert.deepEqual(newestFirst(input).map(item => item.slug), ["newer", "older", "sample", "invalid"]);
  assert.deepEqual(input.map(item => item.slug), ["sample", "older", "newer", "invalid"]);
});

test("search matches all words across category and content regardless of case and spacing", () => {
  const input = [makeArticle("git"), { ...makeArticle("weather"), category: "Projects" as const }];
  assert.deepEqual(searchArticles(input, "  PROJECTS   timeout ").map(item => item.slug), ["weather"]);
  assert.equal(searchArticles(input, "missing phrase").length, 0);
  assert.deepEqual(searchArticles(input, "   "), input);
});

test("tag filters match exact normalized topics and combine with text search", () => {
  const input = [{ ...makeArticle("one"), tags: ["#Web", "web", " ", "##Programming"] }, { ...makeArticle("two"), tags: ["webdevelopment"] }];
  assert.deepEqual(articleTags(input[0]), ["web", "programming"]);
  assert.deepEqual(searchArticles(input, "timeout", "#WEB").map(item => item.slug), ["one"]);
  assert.equal(searchArticles(input, "absent", "web").length, 0);
});

test("latest-nine selection keeps the most recent posts when the archive grows", () => {
  const input = Array.from({ length: 12 }, (_, i) => makeArticle(`post-${i + 1}`, `2026-01-${String(i + 1).padStart(2, "0")}`));
  assert.deepEqual(newestFirst(input).slice(0, 9).map(item => item.slug), ["post-12", "post-11", "post-10", "post-9", "post-8", "post-7", "post-6", "post-5", "post-4"]);
});

test("search finds topic tags with or without a hashtag", () => {
  const input = [{ ...makeArticle("platform-choice"), tags: ["#WebDevelopment", "programming"] }];
  assert.equal(searchArticles(input, "webdevelopment").length, 1);
  assert.equal(searchArticles(input, "#WEBDEVELOPMENT").length, 1);
  assert.equal(searchArticles(input, "#webdevelopment timeout").length, 1);
  assert.equal(searchArticles(input, "#unrelated").length, 0);
});
