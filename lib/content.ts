import { articles, articleBySlug } from "./content.generated";

export { articles, articleBySlug };
export type { Article } from "./content.generated";
import type { Article } from "./content.generated";

export type Collection = {
  slug: string;
  label: string;
  description: string;
  articles: Article[];
  articleCount: number;
};

const collectionGroups = new Map<string, Article[]>();
for (const article of articles) {
  collectionGroups.set(article.collection, [...(collectionGroups.get(article.collection) ?? []), article]);
}

export const collections: Collection[] = [...collectionGroups.entries()]
  .map(([slug, collectionArticles]) => {
    const sortedArticles = [...collectionArticles].sort((a, b) => a.order - b.order);
    const first = sortedArticles[0];
    const label = first ? first.collectionLabel : slug;
    return {
      slug,
      label,
      description: collectionArticles.find((article) => article.collectionDescription)?.collectionDescription
        ?? first?.description
        ?? `Kho kiến thức ${label} trong DevHubs Wiki.`,
      articles: sortedArticles,
      articleCount: sortedArticles.length,
    };
  })
  .sort((a, b) => (a.articles[0]?.order ?? Number.MAX_SAFE_INTEGER) - (b.articles[0]?.order ?? Number.MAX_SAFE_INTEGER));

export const collectionBySlug = new Map<string, Collection>(collections.map((collection) => [`/${collection.slug}`, collection]));

export function getCollectionGroups(collection: Collection) {
  const groups = new Map<string, Article[]>();
  for (const article of collection.articles) groups.set(article.category, [...(groups.get(article.category) ?? []), article]);
  return [...groups.entries()]
    .map(([key, items]) => ({ key, label: items[0]?.categoryLabel ?? key, items: items.sort((a, b) => a.order - b.order) }))
    .sort((a, b) => (a.items[0]?.order ?? Number.MAX_SAFE_INTEGER) - (b.items[0]?.order ?? Number.MAX_SAFE_INTEGER));
}

export function getFeaturedArticles(limit = 6) {
  const featured = articles.filter((article) => article.featured);
  const source = featured.length > 0 ? featured : articles;
  return [...source].sort((a, b) => a.priority - b.priority || a.order - b.order).slice(0, limit);
}
