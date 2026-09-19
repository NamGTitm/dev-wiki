import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WikiShell } from "@/components/wiki-shell";
import { articleBySlug, articles, collectionBySlug, collections, type Article } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return [
    ...collections.map((collection) => ({ slug: [collection.slug] })),
    ...articles.map((article) => ({ slug: article.slug.slice(1).split("/") })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const value = await params;
  const slug = `/${(value.slug ?? []).join("/")}`;
  const article = articleBySlug.get(slug);
  if (article) return { title: article.title, description: article.description, alternates: { canonical: `${site.url}${article.slug}` }, openGraph: { title: `${article.title} | ${site.name}`, description: article.description, url: `${site.url}${article.slug}`, type: "article", modifiedTime: article.updated } };
  const collection = collectionBySlug.get(slug);
  if (collection) return { title: collection.label, description: collection.description, alternates: { canonical: `${site.url}/${collection.slug}` }, openGraph: { title: `${collection.label} | ${site.name}`, description: collection.description, url: `${site.url}/${collection.slug}`, type: "website" } };
  return { title: "Không tìm thấy nội dung" };
}

export default async function ArticleRoute({ params }: { params: Promise<{ slug?: string[] }> }) {
  const value = await params;
  const slug = `/${(value.slug ?? []).join("/")}`;
  const article = articleBySlug.get(slug) as Article | undefined;
  if (article) return <WikiShell article={article} />;
  const collection = collectionBySlug.get(slug);
  if (collection) return <WikiShell collection={collection} />;
  notFound();
}
