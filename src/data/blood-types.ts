import type { DonorBloodSelection, Locale } from "@/types";

export const BLOOD_TYPES_INTRO_BY_LOCALE: Record<Locale, string> = {
  ar: "تعتمد فصيلة دمك على علامات (مستضدات) على سطح كرات الدم الحمراء. يحدد A و B مجموعتك (A أو B أو AB أو O)، بينما يحدد عامل RhD كونك موجباً (+) أو سالباً (–).",
  en: "Your blood type depends on markers (antigens) on your red cells. A and B decide your group (A, B, AB or O). The RhD marker makes you positive (+) or negative (–).",
};

export const BLOOD_TYPES_INTRO = BLOOD_TYPES_INTRO_BY_LOCALE.en;

export const BLOOD_TYPES_FUN_FACT_BY_LOCALE: Record<Locale, string> = {
  ar: "اكتشف العالم كارل لاندشتاينر فصائل الدم عام ١٩٠١، وحصل بفضلها على جائزة نوبل عام ١٩٣٠.",
  en: "Blood groups were discovered by Karl Landsteiner in 1901, earning him a Nobel Prize in 1930.",
};

export const BLOOD_TYPES_FUN_FACT = BLOOD_TYPES_FUN_FACT_BY_LOCALE.en;

export const BLOOD_TYPES_PLASMA_NOTE_BY_LOCALE: Record<Locale, string> = {
  ar: "بلازما AB يمكن إعطاؤها لأي شخص، بينما بلازما O تُعطى لمرضى فصيلة O فقط.",
  en: "Plasma works the other way round: AB plasma can be given to anyone, while O plasma only goes to O patients.",
};

export const BLOOD_TYPES_PLASMA_NOTE = BLOOD_TYPES_PLASMA_NOTE_BY_LOCALE.en;

export const BLOOD_TYPES_GLOBAL_NOTE_BY_LOCALE: Record<Locale, string> = {
  ar: "فصيلة O+ هي الأكثر شيوعاً في العالم، بينما AB− من أندر الفصائل.",
  en: "O+ is the most common type worldwide, and AB- is one of the rarest.",
};

export const BLOOD_TYPES_GLOBAL_NOTE = BLOOD_TYPES_GLOBAL_NOTE_BY_LOCALE.en;

export const BLOOD_TYPE_TITLES_BY_LOCALE: Record<
  Locale,
  Record<DonorBloodSelection, { title: string; subtitle: string }>
> = {
  ar: {
    "O-": {
      title: "المتبرع العام",
      subtitle: "يمكن لكرات دمك الحمراء إنقاذ أي شخص في حالات الطوارئ.",
    },
    "O+": {
      title: "منقذ الأرواح",
      subtitle: "الفصيلة الأكثر شيوعاً، لذا فالطلب على دمك مستمر دائماً.",
    },
    "A-": {
      title: "الفئة النفيسة",
      subtitle: "تساعد كرات دمك كل مرضى فصائل A و AB.",
    },
    "A+": {
      title: "روح الفريق",
      subtitle: "من أكثر الفصائل شيوعاً؛ تساعد مرضى A+ و AB+.",
    },
    "B-": {
      title: "الفصيلة النادرة",
      subtitle: "من أندر الفصائل؛ يمكنك مساعدة كل مرضى B و AB.",
    },
    "B+": {
      title: "الشرارة المضيئة",
      subtitle: "تساعد كرات دمك مرضى فصائل B+ و AB+.",
    },
    "AB-": {
      title: "الأندر على الإطلاق",
      subtitle: "فصيلة نادرة جداً، والبلازما الخاصة بك تساعد مرضى كل الفصائل.",
    },
    "AB+": {
      title: "المستقبل العام",
      subtitle: "تستقبل كرات دم حمراء من الجميع، وبلازمك تساعد الجميع.",
    },
    unknown: {
      title: "بطل المستقبل",
      subtitle: "ستكتشف فصيلة دمك مجاناً بعد أول تبرع لك.",
    },
  },
  en: {
    "O-": {
      title: "The Universal Donor",
      subtitle: "Your red cells can go to anyone in an emergency.",
    },
    "O+": {
      title: "The Lifesaver",
      subtitle: "The most common type, so your blood is always in demand.",
    },
    "A-": {
      title: "The Precious Few",
      subtitle: "Your red cells can help every A and AB patient.",
    },
    "A+": {
      title: "The Team Player",
      subtitle: "One of the most common types; you help A+ and AB+ patients.",
    },
    "B-": {
      title: "The Rare One",
      subtitle: "One of the rarest types; you can help every B and AB patient.",
    },
    "B+": {
      title: "The Bright Spark",
      subtitle: "Your red cells help B+ and AB+ patients.",
    },
    "AB-": {
      title: "The Rarest of All",
      subtitle:
        "Super rare, and your plasma can help patients of every type.",
    },
    "AB+": {
      title: "The Universal Receiver",
      subtitle:
        "You can receive red cells from every type, and your plasma helps everyone.",
    },
    unknown: {
      title: "Future Hero",
      subtitle: "You'll discover your blood type after your first donation.",
    },
  },
};

export const BLOOD_TYPE_TITLES = BLOOD_TYPE_TITLES_BY_LOCALE.en;
