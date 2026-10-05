import type { ImageMetadata } from 'astro';
import type { Localized } from '@/i18n';
import speakersJson from '@/data/speakers.json';
import programJson from '@/data/program.json';
import sponsorsJson from '@/data/sponsors.json';
import mediaJson from '@/data/media.json';

export interface Speaker {
  id: string;
  name: string;
  role: Localized;
  bio: Localized<string[]>;
  links: string[];
}

export interface PersonRef {
  name: string;
  id: string | null;
}

export interface Session {
  start: string;
  end: string;
  title: Localized;
  tag?: Localized;
  partner?: string;
  speakers?: PersonRef[];
  pitch?: number;
}

export interface Hall {
  number: string;
  name: Localized;
  /** Short label for filters / tabs. */
  short: string;
  partner: string | null;
  hosts: PersonRef[];
  jury?: PersonRef[];
  sessions: Session[];
}

export interface Pitch {
  name: string;
  url: string | null;
  text: Localized<string[]>;
}

export interface SponsorTier {
  tier: string;
  items: { logo: string; name: string; url: string | null }[];
}

export interface PressItem {
  outlet: string;
  url: string | null;
  quote: Localized;
}

export const speakers = speakersJson as Speaker[];
export const program = programJson as unknown as {
  date: Localized;
  halls: Hall[];
  pitches: Record<string, Pitch>;
};
export const sponsorTiers = sponsorsJson as SponsorTier[];
export const press = mediaJson as PressItem[];

export const speakerById = new Map(speakers.map((s) => [s.id, s]));

/** Halls in their numeric order (the legacy site listed them by importance). */
export const halls = [...program.halls].sort((a, b) => Number(a.number) - Number(b.number));

export const isBreak = (s: Session) => !s.speakers?.length && s.pitch === undefined && /break|party|opening/i.test(s.title.en);

/** Every hall a speaker appears in (as panelist, host or jury), with the sessions they speak in. */
export function speakerAppearances(id: string) {
  const out: { hall: Hall; session?: Session; role: 'speaker' | 'host' | 'jury' }[] = [];
  for (const hall of halls) {
    if (hall.hosts.some((h) => h.id === id)) out.push({ hall, role: 'host' });
    if (hall.jury?.some((h) => h.id === id)) out.push({ hall, role: 'jury' });
    for (const session of hall.sessions) {
      if (session.speakers?.some((s) => s.id === id)) out.push({ hall, session, role: 'speaker' });
    }
  }
  return out;
}

export function speakerHalls(id: string): string[] {
  return [...new Set(speakerAppearances(id).map((a) => a.hall.number))];
}

// ---------- images ----------
const speakerImages = import.meta.glob<{ default: ImageMetadata }>('/src/assets/speakers/*.webp', { eager: true });
const partnerImages = import.meta.glob<{ default: ImageMetadata }>('/src/assets/partners/*.webp', { eager: true });

export function speakerImage(id: string): ImageMetadata {
  const mod = speakerImages[`/src/assets/speakers/${id}.webp`];
  if (!mod) throw new Error(`Missing portrait for speaker "${id}"`);
  return mod.default;
}

const logoKey = (file: string) => file.replace(/\.[a-z]+$/i, '').toLowerCase();

export function partnerLogo(file: string): ImageMetadata | undefined {
  return partnerImages[`/src/assets/partners/${logoKey(file)}.webp`]?.default;
}

/** Readable partner names for alt text (the legacy markup had none). */
const partnerNames: Record<string, string> = {
  'jutarnji-list': 'Jutarnji list', cola: 'Coca-Cola HBC', adiko: 'Addiko Bank', samsung: 'Samsung', 'eu-komisija': 'Europska komisija',
  herbalife: 'Herbalife', crowe: 'Crowe', podravka: 'Podravka', revuto: 'Revuto', apis: 'APIS IT', schneiderelectric: 'Schneider Electric',
  rit: 'RIT Croatia', philips: 'Philips OneBlade', laqo: 'LAQO', garden: 'Garden Gourmet', 'hr-lutrija': 'Hrvatska Lutrija', papar: 'Papar',
  hgspot: 'HGSPOT', delonghi: "De'Longhi", tanqueray: 'Tanqueray', hennessy: 'Hennessy', joberty: 'Joberty', grow: 'GROW!',
  'w3b-game': 'W3B GAME', croai: 'CroAI', cgda: 'Croatian Game Development Alliance', polygon: 'Polygon', iab: 'IAB Croatia',
  ecommerce: 'eCommerce Hrvatska', wespa: 'Wespa Spaces', ubik: 'UBIK', zcentar: 'Z Centar', eal: 'EAL', hog: 'Hall of Game',
  crostartup: 'CRO Startup', 'odlican-tri': 'Odličan tri', jysk: 'JYSK', uber: 'Uber', dxtalks: 'DX Talks', bug: 'BUG',
  coinpedia: 'Coinpedia', beincripto: 'BeInCrypto', division: 'Division', 'cryptorunner-com-all-white-logo': 'CryptoRunner',
  go2digital: 'Go2Digital', netokracija: 'Netokracija', 'laganini-logo': 'Laganini FM', 'lider-logo': 'Lider', 'znatko-logo': 'Znatko',
  ppd: 'PPD Global',
};

export function partnerName(file: string): string {
  return partnerNames[logoKey(file)] ?? logoKey(file);
}

/** Logos that ship on a solid background and must not be recoloured. */
export const opaqueLogos = new Set(['papar', 'jysk', 'garden', 'ppd', 'hog', 'polygon']);
export const isOpaqueLogo = (file: string) => opaqueLogos.has(logoKey(file));
/** Dark-on-transparent logos that need inverting on the dark theme. */
export const isDarkLogo = (file: string) => logoKey(file) === 'eal';
