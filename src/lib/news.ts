import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@/i18n';

/** Entry ids look like "hr/big-news" — the slug is the file name. */
export const slugOf = (entry: CollectionEntry<'news'>) => entry.id.split('/').slice(1).join('/');
export const langOf = (entry: CollectionEntry<'news'>) => entry.id.split('/')[0] as Lang;

export async function getNews(lang: Lang) {
  const all = await getCollection('news', (e) => langOf(e) === lang);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getTranslation(entry: CollectionEntry<'news'>, lang: Lang) {
  const all = await getCollection('news', (e) => langOf(e) === lang && e.data.key === entry.data.key);
  return all[0];
}
