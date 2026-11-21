import type { Locale } from "@/types";

export interface TubeLayer {
  id: "plasma" | "buffy" | "rbc";
  label: string;
  percentage: string;
  description: string;
  colorClass: string;
  accentHex: string;
}

export const TUBE_LAYERS_BY_LOCALE: Record<Locale, TubeLayer[]> = {
  ar: [
    {
      id: "plasma",
      label: "البلازما",
      percentage: "٥٥٪",
      description:
        "سائل أصفر يتكوّن من ٩٢٪ ماء تقريباً. ينقل المغذيات والهرمونات والبروتينات وعوامل التجلط.",
      colorClass: "bg-plasma-400 text-ink",
      accentHex: "#fbbf24",
    },
    {
      id: "buffy",
      label: "الخلايا البيضاء والصفائح",
      percentage: "<١٪",
      description:
        "الخلايا البيضاء تحارب العدوى، والصفائح تسدّ النزيف وتساعد على تجلط الدم.",
      colorClass: "bg-violet-300 text-ink",
      accentHex: "#a78bfa",
    },
    {
      id: "rbc",
      label: "كرات الدم الحمراء",
      percentage: "~٤٤٪",
      description:
        "مليئة بالهيموجلوبين الذي ينقل الأكسجين إلى كل خلية، وتعيش كل خلية نحو ١٢٠ يوماً.",
      colorClass: "bg-blood-600 text-white",
      accentHex: "#e11d48",
    },
  ],
  en: [
    {
      id: "plasma",
      label: "Plasma",
      percentage: "55%",
      description:
        "Yellowish liquid, about 92% water. Carries nutrients, hormones, proteins and clotting factors.",
      colorClass: "bg-plasma-400 text-ink",
      accentHex: "#fbbf24",
    },
    {
      id: "buffy",
      label: "White cells & platelets",
      percentage: "<1%",
      description:
        "White cells fight infection; platelets plug leaks and help blood clot.",
      colorClass: "bg-violet-300 text-ink",
      accentHex: "#a78bfa",
    },
    {
      id: "rbc",
      label: "Red blood cells",
      percentage: "~44%",
      description:
        "Packed with haemoglobin, which carries oxygen to every cell. Each one lives about 120 days.",
      colorClass: "bg-blood-600 text-white",
      accentHex: "#e11d48",
    },
  ],
};

export const TUBE_LAYERS = TUBE_LAYERS_BY_LOCALE.en;

export const BLOOD_QUICK_FACTS_BY_LOCALE: Record<
  Locale,
  { value: string; text: string }[]
> = {
  ar: [
    { value: "~٥ لتر", text: "يمتلك الشخص البالغ نحو ٥ لترات من الدم." },
    {
      value: "٤٥٠–٥٠٠ مل",
      text: "كمية التبرع نحو ٤٥٠–٥٠٠ مل، أي قرابة ١٠٪ من دمك فقط.",
    },
    {
      value: "٢ مليون / ث",
      text: "يصنع نخاع العظم نحو مليوني كرة دم حمراء كل ثانية.",
    },
  ],
  en: [
    { value: "~5 L", text: "An adult has about 5 litres of blood." },
    {
      value: "450–500 mL",
      text: "A donation is about 450–500 mL, roughly 10% of it.",
    },
    {
      value: "2M / sec",
      text: "Your bone marrow makes about 2 million red cells every second.",
    },
  ],
};

export const BLOOD_QUICK_FACTS = BLOOD_QUICK_FACTS_BY_LOCALE.en;

export const MARROW_STEPS_BY_LOCALE: Record<
  Locale,
  { step: number; title: string; text: string }[]
> = {
  ar: [
    {
      step: 1,
      title: "استشعار الأكسجين",
      text: "يستشعر جسمك انخفاضاً طفيفاً في الخلايا الحمراء / الأكسجين",
    },
    {
      step: 2,
      title: "إشارة الإريثروبويتين",
      text: "تُفرز الكليتان هرموناً محفزاً يُسمى EPO",
    },
    {
      step: 3,
      title: "مصنع النخاع",
      text: "تُسرّع الخلايا الجذعية في نخاع العظم وتيرة الإنتاج",
    },
    {
      step: 4,
      title: "خلايا جديدة",
      text: "تدخل كرات دم حمراء فتية إلى مجرى دمك",
    },
  ],
  en: [
    {
      step: 1,
      title: "Oxygen check",
      text: "Your body senses fewer red cells / less oxygen",
    },
    {
      step: 2,
      title: "EPO signal",
      text: "Kidneys release a hormone called EPO",
    },
    {
      step: 3,
      title: "Marrow factory",
      text: "Bone marrow stem cells speed up production",
    },
    {
      step: 4,
      title: "Fresh cells",
      text: "New red cells enter your bloodstream",
    },
  ],
};

export const MARROW_STEPS = MARROW_STEPS_BY_LOCALE.en;

export interface RecoveryItem {
  id: string;
  label: string;
  fullDay: number;
  timeframe: string;
}

export const RECOVERY_ITEMS_BY_LOCALE: Record<Locale, RecoveryItem[]> = {
  ar: [
    { id: "fluid", label: "حجم السوائل", fullDay: 1, timeframe: "نحو ٢٤ ساعة" },
    { id: "plasma", label: "بروتينات البلازما", fullDay: 2, timeframe: "١–٢ يوم" },
    { id: "platelets", label: "الصفائح الدموية", fullDay: 7, timeframe: "خلال أسبوع تقريباً" },
    { id: "rbc", label: "كرات الدم الحمراء", fullDay: 56, timeframe: "٤–٨ أسابيع" },
    {
      id: "iron",
      label: "مخزون الحديد",
      fullDay: 84,
      timeframe: "قد يستغرق +٨ أسابيع، لذا تناول أطعمة غنية بالحديد",
    },
  ],
  en: [
    { id: "fluid", label: "Fluid volume", fullDay: 1, timeframe: "about 24 hours" },
    { id: "plasma", label: "Plasma proteins", fullDay: 2, timeframe: "1–2 days" },
    { id: "platelets", label: "Platelets", fullDay: 7, timeframe: "within about a week" },
    { id: "rbc", label: "Red blood cells", fullDay: 56, timeframe: "4–8 weeks" },
    {
      id: "iron",
      label: "Iron stores",
      fullDay: 84,
      timeframe: "can take 8+ weeks, so eat iron-rich food",
    },
  ],
};

export const RECOVERY_ITEMS = RECOVERY_ITEMS_BY_LOCALE.en;

export const RECOVERY_NOTE_BY_LOCALE: Record<Locale, string> = {
  ar: "تطلب معظم بنوك الدم الانتظار ٨–١٦ أسبوعاً بين التبرع بالدم الكامل والآخر. اتبع دائماً إرشادات بنك الدم المحلي.",
  en: "Most blood services ask you to wait 8–16 weeks between whole-blood donations. Always follow your local blood bank's rules.",
};

export const RECOVERY_NOTE = RECOVERY_NOTE_BY_LOCALE.en;

export interface BloodComponentInfo {
  id: "rbc" | "plasma" | "platelets";
  name: string;
  accentHex: string;
  badgeClass: string;
  borderClass: string;
  usedFor: string[];
  storage: string;
  shelfLife: string;
}

export const BLOOD_COMPONENTS_BY_LOCALE: Record<Locale, BloodComponentInfo[]> = {
  ar: [
    {
      id: "rbc",
      name: "كرات الدم الحمراء",
      accentHex: "#e11d48",
      badgeClass: "bg-blood-100 text-blood-800 dark:bg-blood-950 dark:text-rose-200",
      borderClass: "border-blood-200 dark:border-blood-500/25",
      usedFor: [
        "الجراحات",
        "الحوادث والصدمات",
        "الأنيميا الحادة",
        "الثلاسيميا",
        "الأنيميا المنجلية",
      ],
      storage: "تُحفظ مبردة عند ٢–٦ درجات مئوية",
      shelfLife: "حتى ٤٢ يوماً",
    },
    {
      id: "plasma",
      name: "البلازما",
      accentHex: "#f59e0b",
      badgeClass: "bg-plasma-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-200",
      borderClass: "border-amber-200 dark:border-amber-500/25",
      usedFor: ["الحروق", "أمراض الكبد", "اضطرابات التجلط", "النزيف الحاد"],
      storage: "تُجمّد في حفظ عميق",
      shelfLife: "حتى سنة واحدة",
    },
    {
      id: "platelets",
      name: "الصفائح الدموية",
      accentHex: "#a78bfa",
      badgeClass: "bg-violet-100 text-violet-900 dark:bg-violet-950/70 dark:text-violet-200",
      borderClass: "border-violet-200 dark:border-violet-500/25",
      usedFor: [
        "مرضى السرطان والعلاج الكيماوي",
        "اللوكيميا",
        "زراعة نخاع العظم",
        "العمليات الجراحية",
      ],
      storage: "تُحفظ بدرجة حرارة الغرفة مع تحريك لطيف مستمر",
      shelfLife: "٥–٧ أيام فقط",
    },
  ],
  en: [
    {
      id: "rbc",
      name: "Red blood cells",
      accentHex: "#e11d48",
      badgeClass: "bg-blood-100 text-blood-800 dark:bg-blood-950 dark:text-rose-200",
      borderClass: "border-blood-200 dark:border-blood-500/25",
      usedFor: [
        "Surgery",
        "Accidents & trauma",
        "Severe anaemia",
        "Thalassaemia",
        "Sickle cell disease",
      ],
      storage: "Stored chilled at 2–6 °C",
      shelfLife: "Up to 42 days",
    },
    {
      id: "plasma",
      name: "Plasma",
      accentHex: "#f59e0b",
      badgeClass: "bg-plasma-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-200",
      borderClass: "border-amber-200 dark:border-amber-500/25",
      usedFor: ["Burns", "Liver disease", "Clotting disorders", "Major bleeding"],
      storage: "Frozen in deep storage",
      shelfLife: "Up to 1 year",
    },
    {
      id: "platelets",
      name: "Platelets",
      accentHex: "#a78bfa",
      badgeClass: "bg-violet-100 text-violet-900 dark:bg-violet-950/70 dark:text-violet-200",
      borderClass: "border-violet-200 dark:border-violet-500/25",
      usedFor: [
        "Cancer & chemotherapy",
        "Leukaemia",
        "Bone-marrow transplants",
        "Surgery",
      ],
      storage: "Kept at room temperature, gently shaken",
      shelfLife: "Only 5–7 days",
    },
  ],
};

export const BLOOD_COMPONENTS = BLOOD_COMPONENTS_BY_LOCALE.en;

export interface CollectionStep {
  step: number;
  title: string;
  description: string;
}

export const COLLECTION_JOURNEY_BY_LOCALE: Record<Locale, CollectionStep[]> = {
  ar: [
    {
      step: 1,
      title: "الجمع والترقيم",
      description: "كيس دم وأنابيب فحص بباركود تتبّع فريد.",
    },
    {
      step: 2,
      title: "الفحص المخبري",
      description: "تحديد الفصيلة وفحص الفيروسات مثل HIV والتهاب الكبد B و C والزهري.",
    },
    {
      step: 3,
      title: "الفصل بالطرد المركزي",
      description: "يُفصل الدم إلى كرات حمراء وبلازما وصفائح دموية.",
    },
    {
      step: 4,
      title: "الحفظ والتخزين",
      description: "يُحفظ كل مكوّن في درجة الحرارة المناسبة له.",
    },
    {
      step: 5,
      title: "المطابقة والنقل",
      description: "تُجرى مطابقة التوافق ثم يُنقل للمريض المحتاج.",
    },
  ],
  en: [
    {
      step: 1,
      title: "Collected & labelled",
      description: "Barcode-tracked bag and test tubes.",
    },
    {
      step: 2,
      title: "Tested",
      description:
        "Blood group plus screening for HIV, hepatitis B & C and syphilis.",
    },
    {
      step: 3,
      title: "Separated",
      description:
        "Spun in a centrifuge into red cells, plasma and platelets.",
    },
    {
      step: 4,
      title: "Stored",
      description: "Each part kept at its own temperature.",
    },
    {
      step: 5,
      title: "Matched & transfused",
      description: "Cross-matched and given to patients who need it.",
    },
  ],
};

export const COLLECTION_JOURNEY = COLLECTION_JOURNEY_BY_LOCALE.en;
