export const langs = ['hr', 'en'] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = 'hr';

export type Localized<T = string> = Record<Lang, T>;

/** Page routes per language. Paths are relative to the site base and end with a slash. */
export const routes = {
  home: { hr: '', en: 'en/' },
  about: { hr: 'o-nama/', en: 'en/about/' },
  program: { hr: 'program/', en: 'en/program/' },
  speakers: { hr: 'govornici/', en: 'en/speakers/' },
  news: { hr: 'novosti/', en: 'en/news/' },
  privacy: { hr: 'privatnost/', en: 'en/privacy/' },
} satisfies Record<string, Localized>;

export type RouteKey = keyof typeof routes;

const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

/** Prefix a site-relative path with the configured base (GitHub Pages project sites live under /<repo>/). */
export function withBase(path = ''): string {
  return base + path.replace(/^\//, '');
}

export function href(key: RouteKey, lang: Lang, hash?: string): string {
  return withBase(routes[key][lang]) + (hash ? `#${hash}` : '');
}

export function newsHref(lang: Lang, slug: string): string {
  return withBase(`${routes.news[lang]}${slug}/`);
}

export const locales: Record<Lang, string> = { hr: 'hr-HR', en: 'en-US' };

export function formatDate(date: Date, lang: Lang, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) {
  return new Intl.DateTimeFormat(locales[lang], opts).format(date);
}

/** UI copy. Long-form content lives in src/content and src/data. */
export const ui = {
  hr: {
    'site.tagline': 'Gaming, Web3 & AI konferencija',
    'site.description':
      'Game Changer je prva gaming i Web3 poslovna konferencija u regiji — platforma koja povezuje tehnologiju, kapital i znanje u procesu digitalne transformacije.',
    'nav.about': 'O nama',
    'nav.program': 'Program',
    'nav.speakers': 'Govornici',
    'nav.news': 'Novosti',
    'nav.partners': 'Partneri',
    'nav.menu': 'Izbornik',
    'nav.close': 'Zatvori',
    'nav.skip': 'Preskoči na sadržaj',
    'nav.switch': 'Switch to English',

    'hero.eyebrow': 'Zagreb · 12. 10. 2023. · Cinestar Z Centar',
    'hero.title': 'Where ideas transform into innovations.',
    'hero.lead':
      'Jedan dan, pet dvorana i više od 110 govornika. Game Changer 2.0 spaja gaming industriju, Web3, umjetnu inteligenciju, kibernetičku sigurnost i e-trgovinu na jednoj pozornici.',
    'hero.cta.program': 'Pogledaj program',
    'hero.cta.video': 'Aftermovie',
    'stats.speakers': 'govornika',
    'stats.visitors': 'posjetitelja',
    'stats.halls': 'dvorana',
    'stats.women': 'panelistica',

    'topics.label': 'Teme konferencije',

    'intro.kicker': 'In tech we believe',
    'intro.title': 'Konferencija koja mijenja pravila igre.',
    'intro.what.title': 'Što je Game Changer?',
    'intro.what.body':
      'Game Changer je kontinuirana serija događaja uživo koji podupiru najbolje prakse u suočavanju s digitalnom revolucijom, s polazištem u gaming i Web3 ekosustavu. Potičemo prilike za tvrtke, pojedince i organizacije da izgrade infrastrukturu 21. stoljeća.',
    'intro.why.title': 'Zašto Game Changer?',
    'intro.why.body':
      'Kako se pridružiti velikom valu gaminga, koja su nam nova znanja potrebna i kako inovirati poslovne ciljeve? Game Changer stvara jedinstveno okruženje koje povezuje digitalne i poslovne lidere s generacijama koje dolaze — kroz snažan prijenos znanja i iskustva.',
    'intro.more': 'Misija, cilj i vizija',

    'halls.kicker': 'Program',
    'halls.title': 'Pet dvorana. Pet priča.',
    'halls.lead': 'Svaka dvorana ima svoju temu, domaćina i partnera — od Web3 i AI-ja do kibernetičke sigurnosti i startup pozornice.',
    'halls.hall': 'Dvorana',
    'halls.host': 'Domaćin',
    'halls.hosts': 'Domaćini',
    'halls.sessions': 'sesija',
    'halls.partner': 'Partner dvorane',

    'speakers.kicker': 'Govornici',
    'speakers.title': 'Ljudi koji pokreću promjenu.',
    'speakers.all': 'Svi govornici',
    'speakers.lead':
      'Osnivači, inženjeri, kreativci, investitori i istraživači iz cijele regije — više od stotinu govornika na jednom mjestu.',
    'speakers.search': 'Pretraži po imenu ili tvrtki',
    'speakers.filter.all': 'Sve dvorane',
    'speakers.empty': 'Nema govornika za ovu pretragu.',
    'speakers.count': 'govornika',
    'speakers.bio': 'Biografija',
    'speakers.sessions': 'Nastupa u programu',
    'speakers.website': 'Web stranica',
    'speakers.open': 'Otvori profil',

    'record.kicker': 'Game Changer 2.0',
    'record.title': 'Konferencija koja je oborila rekord.',
    'record.body':
      'U Z Centru okupilo se više od 1.100 posjetitelja i 110 govornika, a udio panelistica narastao je sa 17\u00a0% na 34\u00a0%. Expo zona, Investor lounge i Change the Beat party zaokružili su dan.',
    'record.cta': 'Pročitaj priču',

    'news.kicker': 'Novosti',
    'news.title': 'Trending on Game Changer',
    'news.all': 'Sve novosti',
    'news.read': 'Pročitaj više',
    'news.back': 'Sve novosti',
    'news.lead': 'Najave, izvještaji i velike vijesti s Game Changer događaja u Zagrebu i Ljubljani.',
    'news.related': 'Pročitaj i ovo',

    'video.kicker': 'Aftermovie',
    'video.title': 'Osjeti atmosferu.',
    'video.play': 'Pokreni video',
    'video.consent': 'Video se učitava s YouTubea tek kada ga pokreneš.',

    'press.kicker': 'Drugi o nama',
    'press.title': 'Pratilo nas je više od 45 medija.',
    'press.read': 'Pročitaj članak',

    'partners.kicker': 'Partneri',
    'partners.title': 'Hvala partnerima koji su omogućili Game Changer.',
    'tier.friend': 'Prijatelj konferencije',
    'tier.hall-partner': 'Partneri dvorana',
    'tier.panel-partner': 'Partneri panela',
    'tier.coffee-break-partner': 'Coffee break partner',
    'tier.good-vibe-partner': 'Good vibe partneri',
    'tier.community-partner': 'Partneri zajednice',
    'tier.media-partner': 'Medijski partneri',

    'sustain.title': 'Game Changer se pridružio globalnoj inicijativi za održivost u event industriji.',
    'sustain.body': 'Game Changer je službeni potpisnik (Endorser) Principa održivih događaja — jer budućnost tehnologije mora biti i ekološki održiva.',

    'program.kicker': 'Program',
    'program.title': 'Program konferencije',
    'program.lead': 'Četvrtak, 12. listopada 2023. — pet paralelnih dvorana od 9:30 do zatvaranja uz Change the Beat party.',
    'program.time': 'Vrijeme',
    'program.jury': 'Stručni žiri',
    'program.visit': 'Posjeti stranicu',
    'program.pitch': 'O startupu',
    'program.allHalls': 'Sve dvorane',

    'about.kicker': 'O nama',
    'about.title': 'Misija, cilj i vizija',
    'about.mission': 'Misija',
    'about.goal': 'Cilj',
    'about.vision': 'Vizija',
    'about.press.kicker': 'Mediji s prošlih konferencija',
    'about.press.title': 'Dokaz kvalitete.',
    'about.press.body':
      'Prošle godine naše konferencije pratilo je više od 45 medija, od kojih su većina najugledniji hrvatski mediji. Ogromna popraćenost samo je jedan u nizu dokaza da je Game Changer najkvalitetnija tech lifestyle konferencija u Hrvatskoj.',
    'about.hosp.title': 'Hospitality',
    'about.hosp.location': 'Lokacija',
    'about.hosp.location.body': 'Konferencije se održavaju u Zagrebu, u Z Centru na zapadnom dijelu grada.',
    'about.hosp.transport': 'Prijevoz',
    'about.hosp.transport.body': 'Kako biste sigurno stigli na mjesto održavanja, provjerite redovne linije ZET-a.',
    'about.hosp.stay': 'Smještaj',
    'about.hosp.stay.body': 'Tijekom konferencije nudimo smještaj u blizini Z Centra.',

    'footer.about': 'Game Changer je platforma za tehnološku i digitalnu transformaciju kroz gaming, Web3 i AI.',
    'footer.explore': 'Istraži',
    'footer.contact': 'Kontakt',
    'footer.privacy': 'Privatnost',

    'privacy.title': 'Privatnost',
    'notfound.title': 'Game over.',
    'notfound.body': 'Ova stranica ne postoji ili je premještena.',
    'notfound.cta': 'Natrag na početnu',
  },
  en: {
    'site.tagline': 'Gaming, Web3 & AI conference',
    'site.description':
      'Game Changer is the region’s first gaming and Web3 business conference — a platform connecting technology, capital and knowledge in the process of digital transformation.',
    'nav.about': 'About',
    'nav.program': 'Program',
    'nav.speakers': 'Speakers',
    'nav.news': 'News',
    'nav.partners': 'Partners',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.skip': 'Skip to content',
    'nav.switch': 'Prebaci na hrvatski',

    'hero.eyebrow': 'Zagreb · 12 Oct 2023 · Cinestar Z Centar',
    'hero.title': 'Where ideas transform into innovations.',
    'hero.lead':
      'One day, five halls and more than 110 speakers. Game Changer 2.0 brings the gaming industry, Web3, artificial intelligence, cybersecurity and e-commerce together on one stage.',
    'hero.cta.program': 'See the program',
    'hero.cta.video': 'Aftermovie',
    'stats.speakers': 'speakers',
    'stats.visitors': 'visitors',
    'stats.halls': 'halls',
    'stats.women': 'women panelists',

    'topics.label': 'Conference topics',

    'intro.kicker': 'In tech we believe',
    'intro.title': 'A conference that changes the rules of the game.',
    'intro.what.title': 'What is Game Changer?',
    'intro.what.body':
      'Game Changer is a continuous series of live events supporting best practices in facing the digital revolution, starting from the gaming and Web3 ecosystem. We create opportunities for companies, individuals and organisations to build 21st-century infrastructure.',
    'intro.why.title': 'Why Game Changer?',
    'intro.why.body':
      'How do you join the big wave of gaming, what new knowledge do we need, and how do we innovate business goals? Game Changer creates a unique environment connecting digital and business leaders with the generations to come — through a strong transfer of knowledge and experience.',
    'intro.more': 'Mission, goal & vision',

    'halls.kicker': 'Program',
    'halls.title': 'Five halls. Five stories.',
    'halls.lead': 'Every hall has its own theme, host and partner — from Web3 and AI to cybersecurity and the startup stage.',
    'halls.hall': 'Hall',
    'halls.host': 'Host',
    'halls.hosts': 'Hosts',
    'halls.sessions': 'sessions',
    'halls.partner': 'Hall partner',

    'speakers.kicker': 'Speakers',
    'speakers.title': 'The people driving change.',
    'speakers.all': 'All speakers',
    'speakers.lead':
      'Founders, engineers, creatives, investors and researchers from across the region — more than a hundred speakers in one place.',
    'speakers.search': 'Search by name or company',
    'speakers.filter.all': 'All halls',
    'speakers.empty': 'No speakers match this search.',
    'speakers.count': 'speakers',
    'speakers.bio': 'Biography',
    'speakers.sessions': 'On the program',
    'speakers.website': 'Website',
    'speakers.open': 'Open profile',

    'record.kicker': 'Game Changer 2.0',
    'record.title': 'The conference that broke the record.',
    'record.body':
      'More than 1,100 visitors and 110 speakers gathered at Z Centar, and the share of women panelists rose from 17% to 34%. An Expo zone, Investor lounge and the Change the Beat party rounded off the day.',
    'record.cta': 'Read the story',

    'news.kicker': 'News',
    'news.title': 'Trending on Game Changer',
    'news.all': 'All news',
    'news.read': 'Read more',
    'news.back': 'All news',
    'news.lead': 'Announcements, reports and big news from Game Changer events in Zagreb and Ljubljana.',
    'news.related': 'Keep reading',

    'video.kicker': 'Aftermovie',
    'video.title': 'Feel the atmosphere.',
    'video.play': 'Play video',
    'video.consent': 'The video loads from YouTube only once you press play.',

    'press.kicker': 'In the press',
    'press.title': 'Covered by more than 45 media outlets.',
    'press.read': 'Read article',

    'partners.kicker': 'Partners',
    'partners.title': 'Thank you to the partners who made Game Changer happen.',
    'tier.friend': 'Friend of the conference',
    'tier.hall-partner': 'Hall partners',
    'tier.panel-partner': 'Panel partners',
    'tier.coffee-break-partner': 'Coffee break partner',
    'tier.good-vibe-partner': 'Good vibe partners',
    'tier.community-partner': 'Community partners',
    'tier.media-partner': 'Media partners',

    'sustain.title': 'Game Changer joined the global initiative for sustainability in the event industry.',
    'sustain.body': 'Game Changer is an official endorser of the Principles for Sustainable Events — because the future of technology has to be ecologically sustainable too.',

    'program.kicker': 'Program',
    'program.title': 'Conference program',
    'program.lead': 'Thursday, 12 October 2023 — five parallel halls from 9:30 until the Change the Beat party.',
    'program.time': 'Time',
    'program.jury': 'Jury',
    'program.visit': 'Visit website',
    'program.pitch': 'About the startup',
    'program.allHalls': 'All halls',

    'about.kicker': 'About',
    'about.title': 'Mission, goal & vision',
    'about.mission': 'Mission',
    'about.goal': 'Goal',
    'about.vision': 'Vision',
    'about.press.kicker': 'Media at past conferences',
    'about.press.title': 'Proof of quality.',
    'about.press.body':
      'Last year our conferences were covered by more than 45 media outlets, most of them the most respected in Croatia. That coverage is one more proof that Game Changer is the leading tech lifestyle conference in Croatia.',
    'about.hosp.title': 'Hospitality',
    'about.hosp.location': 'Location',
    'about.hosp.location.body': 'Conferences are held in Zagreb, at Z Centar in the western part of the city.',
    'about.hosp.transport': 'Transport',
    'about.hosp.transport.body': 'To arrive safely at the venue, check the regular ZET public transport lines.',
    'about.hosp.stay': 'Accommodation',
    'about.hosp.stay.body': 'During the conference we offer accommodation near Z Centar.',

    'footer.about': 'Game Changer is a platform for technological and digital transformation through gaming, Web3 and AI.',
    'footer.explore': 'Explore',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy',

    'privacy.title': 'Privacy',
    'notfound.title': 'Game over.',
    'notfound.body': 'This page doesn’t exist or has been moved.',
    'notfound.cta': 'Back to home',
  },
} as const;

export type UIKey = keyof (typeof ui)['hr'];

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}
