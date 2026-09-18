import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WikiShell } from "@/components/wiki-shell";
import { articleBySlug, articles, type Article } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug.slice(1).split("/") })); }

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const value = await params;
  const article = articleBySlug.get(`/${(value.slug ?? []).join("/")}`);
  if (!article) return { title: "Không tìm thấy bài viết" };
  return { title: article.title, description: article.description, alternates: { canonical: `${site.url}${article.slug}` }, openGraph: { title: `${article.title} | ${site.name}`, description: article.description, url: `${site.url}${article.slug}`, type: "article", modifiedTime: article.updated } };
}

export default async function ArticleRoute({ params }: { params: Promise<{ slug?: string[] }> }) {
  const value = await params;
  const article = articleBySlug.get(`/${(value.slug ?? []).join("/")}`) as Article | undefined;
  if (!article) notFound();
  return <WikiShell article={article} />;
}
