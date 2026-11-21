import type { Locale, StampKey } from "@/types";

export const CAMPAIGN_INFO_BY_LOCALE: Record<
  Locale,
  {
    brand: string;
    fullTitle: string;
    university: string;
    closingLine: string;
    closingCtaBtn: string;
    disclaimer: string;
    footerMadeWith: string;
    footerLoveWord: string;
    footerFor: string;
  }
> = {
  ar: {
    brand: "حملة NASU للتبرع",
    fullTitle: "حملة NASU للتبرع بالدم",
    university: "جامعة عين شمس الأهلية",
    closingLine: "جاهز للتبرع؟ ابحث عن فريق حملة NASU في نقطة التبرع.",
    closingCtaBtn: "افحص أهليتك",
    disclaimer:
      "محتوى توعوي وتعليمي فقط. قرار الأهلية وكافة القرارات الطبية يتخذها الفريق الطبي المختص ببنك الدم.",
    footerMadeWith: "صُنع بـ",
    footerLoveWord: "حب",
    footerFor: "لحملة NASU للتبرع بالدم",
  },
  en: {
    brand: "NASU Blood Drive",
    fullTitle: "NASU Blood Donation Campaign",
    university: "Ain Shams National University",
    closingLine:
      "Ready to give? Find the NASU campaign team at the donation booth.",
    closingCtaBtn: "Check eligibility",
    disclaimer:
      "Educational content for awareness only. Eligibility and all medical decisions are made by qualified blood bank staff.",
    footerMadeWith: "Made with",
    footerLoveWord: "love",
    footerFor: "for the NASU Blood Donation Campaign",
  },
};

export const CAMPAIGN_INFO = CAMPAIGN_INFO_BY_LOCALE.en;

export interface StampMeta {
  key: StampKey;
  label: string;
  hint: string;
  href: string;
}

const STAMPS_AR: StampMeta[] = [
  {
    key: "mythBuster",
    label: "محطّم الخرافات",
    hint: "أكمل جولة من ١٠ بطاقات في لعبة حقيقة أم خرافة",
    href: "/play",
  },
  {
    key: "bloodScholar",
    label: "باحث الدم",
    hint: "قم بتدوير أنبوبة الطرد المركزي في قسم تعلّم",
    href: "/learn#blood-101",
  },
  {
    key: "typeExpert",
    label: "خبير الفصائل",
    hint: "أكمل لعبة مطابقة المتبرعين",
    href: "/learn#match",
  },
  {
    key: "donorReady",
    label: "جاهز للتبرع",
    hint: "أكمل فحص الأهلية السريع في ٣٠ ثانية",
    href: "/donate#eligibility",
  },
];

export const STAMPS_META: StampMeta[] = [
  {
    key: "mythBuster",
    label: "Myth Buster",
    hint: "Finish a 10-card Fact or Myth round",
    href: "/play",
  },
  {
    key: "bloodScholar",
    label: "Blood Scholar",
    hint: "Spin the centrifuge tube in Learn",
    href: "/learn#blood-101",
  },
  {
    key: "typeExpert",
    label: "Type Expert",
    hint: "Complete the Match-the-Donor game",
    href: "/learn#match",
  },
  {
    key: "donorReady",
    label: "Donor Ready",
    hint: "Finish the 30-second eligibility check",
    href: "/donate#eligibility",
  },
];

export function getStampsMeta(locale: Locale): StampMeta[] {
  return locale === "ar" ? STAMPS_AR : STAMPS_META;
}

export const HOME_STATS_BY_LOCALE: Record<
  Locale,
  { value: string; label: string }[]
> = {
  ar: [
    { value: "حتى ٣", label: "أرواح لكل تبرع" },
    { value: "~١٠ د", label: "مدة التبرع الفعلي" },
    { value: "~٥ لتر", label: "حجم الدم لدى البالغ" },
    { value: "٤–٨ أسابيع", label: "لتجديد كرات الدم الحمراء" },
  ],
  en: [
    { value: "Up to 3", label: "lives per donation" },
    { value: "~10 min", label: "to donate" },
    { value: "~5 L", label: "of blood in an adult" },
    { value: "4–8 weeks", label: "to rebuild red cells" },
  ],
};

export const HOME_STATS = HOME_STATS_BY_LOCALE.en;

export interface JourneyTileItem {
  href: string;
  tab: string;
  title: string;
  duration: string;
  stampKey: StampKey | null;
  iconKey: "play" | "learn" | "donate" | "card";
}

export const JOURNEY_TILES_BY_LOCALE: Record<Locale, JourneyTileItem[]> = {
  ar: [
    {
      href: "/play",
      tab: "العب",
      title: "حقيقة أم خرافة",
      duration: "دقيقتان",
      stampKey: "mythBuster",
      iconKey: "play",
    },
    {
      href: "/learn",
      tab: "تعلّم",
      title: "دمك بأسلوب بسيط",
      duration: "٣ دقائق",
      stampKey: "bloodScholar",
      iconKey: "learn",
    },
    {
      href: "/donate",
      tab: "تبرّع",
      title: "لماذا وكيف تتبرع",
      duration: "دقيقتان",
      stampKey: "donorReady",
      iconKey: "donate",
    },
    {
      href: "/card",
      tab: "البطاقة",
      title: "بطاقة المتبرع",
      duration: "دقيقة واحدة",
      stampKey: null,
      iconKey: "card",
    },
  ],
  en: [
    {
      href: "/play",
      tab: "Play",
      title: "Fact or Myth",
      duration: "2 min",
      stampKey: "mythBuster",
      iconKey: "play",
    },
    {
      href: "/learn",
      tab: "Learn",
      title: "Your blood, explained",
      duration: "3 min",
      stampKey: "bloodScholar",
      iconKey: "learn",
    },
    {
      href: "/donate",
      tab: "Donate",
      title: "Why & how to donate",
      duration: "2 min",
      stampKey: "donorReady",
      iconKey: "donate",
    },
    {
      href: "/card",
      tab: "Card",
      title: "Your donor card",
      duration: "1 min",
      stampKey: null,
      iconKey: "card",
    },
  ],
};

export const JOURNEY_TILES = JOURNEY_TILES_BY_LOCALE.en;
