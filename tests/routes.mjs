import assert from "node:assert/strict";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";

const server = await createServer({ server: { port: 0, strictPort: false }, logLevel: "error" });
try {
  const { AppRoutes } = await server.ssrLoadModule("/src/App.tsx");
  const { articles } = await server.ssrLoadModule("/src/data/articles.ts");
  const original = [...articles];
  const render = (path) => renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [path] }, createElement(AppRoutes)));
  const cardCount = (html) => (html.match(/<article\b/g) || []).length;
  try {
    articles.splice(0, articles.length, ...Array.from({ length: 12 }, (_, i) => ({
      slug: `fixture-${i}`, title: `Fixture ${i}`, category: "Tips", excerpt: "Article excerpt",
      content: ["Complete article text."], tags: [i === 0 ? "webdevelopment" : "humor"], images: [{ src: "/fixture-portrait.webp", alt: "Portrait diagram", caption: "Platform choices" }, { src: "/fixture-second.webp", alt: "Second diagram" }], sample: false, publishedAt: "2026-09-07",
      facebookUrl: `https://www.facebook.com/example/posts/${i + 1}`,
      hasCode: i !== 1,
      codeZip: i <= 1 ? "/downloads/example-code.zip" : undefined,
    })));
    assert.equal(cardCount(render("/")), 9, "homepage is capped at nine cards");
    const archive = render("/articles");
    assert.equal(cardCount(archive), 12, "archive includes all entries");
    assert.match(archive, /role="search"/);
    assert.match(archive, /type="submit"/);
    const detail = render("/articles/fixture-0");
    assert.match(detail, /Complete article text/);
    assert.match(detail, /href="\/downloads\/example-code.zip" download=""/);
    assert.match(detail, /Download code/);
    assert.doesNotMatch(render("/articles/fixture-1"), /Download article code|Download code/);
    assert.doesNotMatch(render("/articles/fixture-2"), /Download article code|Download code/);
    assert.match(detail, /href="https:\/\/www.facebook.com\/example\/posts\/1"/);
    assert.match(detail, /Discuss on Facebook/);
    assert.match(detail, /href="\/#about"/);
    assert.match(detail, /Portrait diagram/);
    assert.match(detail, /object-contain/);
    assert.match(detail, /<dialog/);
    assert.match(detail, /href="\/articles\?tag=webdevelopment"/);
    assert.equal(cardCount(render("/articles?tag=webdevelopment")), 1);
    assert.equal(cardCount(render("/articles?q=complete&tag=webdevelopment")), 1);
    assert.match(render("/articles?tag=missing"), /No articles found/);
    assert.doesNotMatch(detail, /Read preview|Sample preview|sample article/i);
    assert.match(render("/articles/missing"), /Article not found/);
    assert.match(render("/unknown"), /Page not found/);
  } finally {
    articles.splice(0, articles.length, ...original);
  }
  assert.match(render(`/articles/${articles[0].slug}`), /Visit Facebook page/);
  await server.listen();
  const port = server.httpServer.address().port;
  for (const path of ["/articles", `/articles/${articles[0].slug}`]) {
    const response = await fetch(`http://127.0.0.1:${port}${path}`);
    assert.equal(response.status, 200, `direct URL ${path}`);
    assert.match(await response.text(), /\/src\/main.tsx/);
  }
  console.log("Route checks passed: homepage limit, archive, article CTA, missing routes, sample fallback, direct URL serving.");
} finally {
  await server.close();
}
