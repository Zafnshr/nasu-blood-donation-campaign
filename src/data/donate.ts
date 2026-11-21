import type { EligibilityQuestion, Locale } from "@/types";

export const WHY_IT_MATTERS_BY_LOCALE: Record<
  Locale,
  { lead: string; whoStat: string }
> = {
  ar: {
    lead: "لا يمكن تصنيع الدم في المصانع، وبعض مكوّناته لا تدوم سوى أيام قليلة، لذا تحتاج المستشفيات إلى تدفق مستمر من المتبرعين.",
    whoStat:
      "تُقدّر منظمة الصحة العالمية أن تبرّع ١٪ على الأقل من السكان ضروري لتلبية الاحتياجات الأساسية لأي بلد.",
  },
  en: {
    lead: "Blood can't be manufactured, and parts of it only last days, so hospitals need a constant flow of donors.",
    whoStat:
      "The WHO estimates that donations from at least 1% of a population are needed to meet a country's most basic needs.",
  },
};

export const WHY_IT_MATTERS = WHY_IT_MATTERS_BY_LOCALE.en;

export interface WhoNeedsBloodItem {
  id: string;
  label: string;
  detail: string;
  icon: "ambulance" | "baby" | "heart-pulse" | "ribbon" | "stethoscope" | "flame";
}

export const WHO_NEEDS_BLOOD_BY_LOCALE: Record<Locale, WhoNeedsBloodItem[]> = {
  ar: [
    {
      id: "trauma",
      label: "مصابو الحوادث والطوارئ",
      detail: "تعويض سريع لكرات الدم الحمراء والبلازما لإنقاذ الأرواح.",
      icon: "ambulance",
    },
    {
      id: "mothers",
      label: "الأمهات عند النزيف الحاد",
      detail: "دعم حاسم أثناء مضاعفات الولادة.",
      icon: "baby",
    },
    {
      id: "thalassaemia",
      label: "أطفال الثلاسيميا",
      detail: "يحتاجون نقل دم منتظم كل بضعة أسابيع مدى الحياة.",
      icon: "heart-pulse",
    },
    {
      id: "cancer",
      label: "مرضى السرطان والعلاج الكيماوي",
      detail: "صفائح دموية وكرات حمراء حتى يتعافى نخاع العظم.",
      icon: "ribbon",
    },
    {
      id: "surgery",
      label: "الجراحات الكبرى وزراعة الأعضاء",
      detail: "رصيد أمان ضروري للعمليات المجدولة والطارئة.",
      icon: "stethoscope",
    },
    {
      id: "burns",
      label: "مرضى الحروق",
      detail: "بروتينات البلازما والسوائل لدعم التعافي.",
      icon: "flame",
    },
  ],
  en: [
    {
      id: "trauma",
      label: "Accident & trauma victims",
      detail: "Rapid red-cell and plasma replacement during emergencies.",
      icon: "ambulance",
    },
    {
      id: "mothers",
      label: "Mothers with heavy bleeding",
      detail: "Life-saving support during complications in childbirth.",
      icon: "baby",
    },
    {
      id: "thalassaemia",
      label: "Children with thalassaemia",
      detail: "Need transfusions every few weeks for life.",
      icon: "heart-pulse",
    },
    {
      id: "cancer",
      label: "Cancer patients on chemotherapy",
      detail: "Platelets and red cells while bone marrow recovers.",
      icon: "ribbon",
    },
    {
      id: "surgery",
      label: "Major surgery & transplants",
      detail: "Safe surgical backup for planned and urgent operations.",
      icon: "stethoscope",
    },
    {
      id: "burns",
      label: "Burn patients",
      detail: "Plasma proteins and fluid support during healing.",
      icon: "flame",
    },
  ],
};

export const WHO_NEEDS_BLOOD = WHO_NEEDS_BLOOD_BY_LOCALE.en;

export const SPLIT_TARGETS_BY_LOCALE = {
  ar: [
    {
      id: "rbc",
      component: "كرات حمراء",
      recipient: "مصاب حادث",
      colorClass: "bg-blood-600 text-white",
      cardBorder: "border-blood-200 bg-blood-50/70 dark:border-blood-500/30 dark:bg-blood-950/40",
    },
    {
      id: "plasma",
      component: "بلازما",
      recipient: "مريض حروق",
      colorClass: "bg-plasma-400 text-ink",
      cardBorder: "border-amber-200 bg-amber-50/70 dark:border-amber-500/30 dark:bg-amber-950/30",
    },
    {
      id: "platelets",
      component: "صفائح دموية",
      recipient: "طفل مصاب باللوكيميا",
      colorClass: "bg-violet-500 text-white",
      cardBorder: "border-violet-200 bg-violet-50/70 dark:border-violet-500/30 dark:bg-violet-950/30",
    },
  ],
  en: [
    {
      id: "rbc",
      component: "Red cells",
      recipient: "an accident victim",
      colorClass: "bg-blood-600 text-white",
      cardBorder: "border-blood-200 bg-blood-50/70 dark:border-blood-500/30 dark:bg-blood-950/40",
    },
    {
      id: "plasma",
      component: "Plasma",
      recipient: "a burn patient",
      colorClass: "bg-plasma-400 text-ink",
      cardBorder: "border-amber-200 bg-amber-50/70 dark:border-amber-500/30 dark:bg-amber-950/30",
    },
    {
      id: "platelets",
      component: "Platelets",
      recipient: "a child with leukaemia",
      colorClass: "bg-violet-500 text-white",
      cardBorder: "border-violet-200 bg-violet-50/70 dark:border-violet-500/30 dark:bg-violet-950/30",
    },
  ],
} as const;

export const SPLIT_TARGETS = SPLIT_TARGETS_BY_LOCALE.en;

export const ELIGIBILITY_QUESTIONS_BY_LOCALE: Record<
  Locale,
  EligibilityQuestion[]
> = {
  ar: [
    {
      id: "age",
      question: "هل عمرك ١٨ عاماً أو أكثر؟",
      passIf: "yes",
      flagReason: "يجب أن يكون المتبرع ١٨ عاماً على الأقل.",
    },
    {
      id: "weight",
      question: "هل وزنك ٥٠ كجم على الأقل؟",
      passIf: "yes",
      flagReason:
        "الوزن الأدنى ٥٠ كجم يضمن بقاء التبرع بنحو ٤٥٠ مل آمناً لك.",
    },
    {
      id: "healthy",
      question: "هل تشعر بصحة جيدة وعافية اليوم؟",
      passIf: "yes",
      flagReason: "يفضّل التبرع فقط عندما تكون في كامل صحتك وعافيتك.",
    },
    {
      id: "recent-donation",
      question: "هل تبرعت بالدم خلال آخر ٣ أشهر؟",
      passIf: "no",
      flagReason:
        "يحتاج جسمك لوقت كافٍ بين التبرعات لتعويض الخلايا الحمراء والحديد.",
    },
    {
      id: "tattoo",
      question: "هل أجريت وشماً أو ثقباً أو حجامة خلال آخر ٦ أشهر؟",
      passIf: "no",
      flagReason:
        "عادة ما توجد فترة تأجيل مؤقتة بعد الوشم أو الثقب أو الحجامة.",
    },
    {
      id: "fever",
      question: "هل أصبت بحمى أو تناولت مضاداً حيوياً خلال آخر أسبوعين؟",
      passIf: "no",
      flagReason:
        "انتظر حتى يزول أي التهاب تماماً وتنتهي دورة المضاد الحيوي.",
    },
    {
      id: "pregnancy",
      question: "هل أنتِ حامل أو وضعتِ مولوداً خلال آخر ٦ أشهر؟",
      passIf: "no",
      allowNa: true,
      flagReason:
        "يتطلب الحمل والولادة الحديثة فترة راحة لتعافي الجسم ومخزون الحديد.",
    },
  ],
  en: [
    {
      id: "age",
      question: "Are you 18 or older?",
      passIf: "yes",
      flagReason: "Donors generally need to be at least 18 years old.",
    },
    {
      id: "weight",
      question: "Do you weigh at least 50 kg?",
      passIf: "yes",
      flagReason:
        "A minimum weight of 50 kg helps ensure donating ~450 mL stays safe for you.",
    },
    {
      id: "healthy",
      question: "Are you feeling healthy and well today?",
      passIf: "yes",
      flagReason: "It's best to donate only when you're feeling completely well.",
    },
    {
      id: "recent-donation",
      question: "Have you donated blood in the last 3 months?",
      passIf: "no",
      flagReason:
        "Your body needs time between donations to fully rebuild red blood cells and iron.",
    },
    {
      id: "tattoo",
      question:
        "Have you had a tattoo, piercing or cupping (hijama) in the last 6 months?",
      passIf: "no",
      flagReason:
        "A short waiting period usually applies after tattoos, piercings or hijama.",
    },
    {
      id: "fever",
      question:
        "Have you had a fever, or taken antibiotics, in the last 2 weeks?",
      passIf: "no",
      flagReason:
        "Wait until any infection has fully cleared and antibiotics are finished.",
    },
    {
      id: "pregnancy",
      question: "Are you pregnant, or have you given birth in the last 6 months?",
      passIf: "no",
      allowNa: true,
      flagReason:
        "Pregnancy and recent childbirth require a deferral so your iron and body can recover.",
    },
  ],
};

export const ELIGIBILITY_QUESTIONS = ELIGIBILITY_QUESTIONS_BY_LOCALE.en;

export const ELIGIBILITY_PASS_TEXT_BY_LOCALE: Record<Locale, string> = {
  ar: "يبدو أنك مستعد تماماً للتبرع! 🎉 توجه إلى نقطة التبرع وسيقوم الفريق الطبي بفحص نهائي سريع.",
  en: "Looks like you're good to go! 🎉 Head to the donation booth. The medical team will do a quick final check.",
};

export const ELIGIBILITY_WAIT_TEXT_BY_LOCALE: Record<Locale, string> = {
  ar: "قد تحتاج للانتظار قليلاً، وهذا طبيعي جداً! تحدّث مع الفريق الطبي في النقطة ليخبرك بالموعد الأنسب.",
  en: "You might need to wait a little. That's totally normal! Chat with the medical team at the booth; they'll tell you exactly when you can donate.",
};

export const ELIGIBILITY_DISCLAIMER_BY_LOCALE: Record<Locale, string> = {
  ar: "هذا دليل سريع وليس تقييماً طبياً. القرار النهائي للأهلية يعود إلى الطاقم الطبي.",
  en: "This is a quick guide, not a medical assessment. Final eligibility is decided by the medical staff.",
};

export const ELIGIBILITY_PASS_TEXT = ELIGIBILITY_PASS_TEXT_BY_LOCALE.en;
export const ELIGIBILITY_WAIT_TEXT = ELIGIBILITY_WAIT_TEXT_BY_LOCALE.en;
export const ELIGIBILITY_DISCLAIMER = ELIGIBILITY_DISCLAIMER_BY_LOCALE.en;

export interface DonationDayStep {
  step: number;
  title: string;
  duration: string;
  description: string;
}

export const DONATION_DAY_STEPS_BY_LOCALE: Record<Locale, DonationDayStep[]> = {
  ar: [
    {
      step: 1,
      title: "التسجيل",
      duration: "~٥ د",
      description: "بطاقة الهوية واستمارة قصيرة.",
    },
    {
      step: 2,
      title: "فحص صحي مصغّر",
      duration: "~١٠ د",
      description: "استبيان سريع، قياس الضغط والنبض، وفحص الهيموجلوبين بالإصبع.",
    },
    {
      step: 3,
      title: "التبرع",
      duration: "~٨–١٠ د",
      description: "سحب نحو ٤٥٠ مل فقط؛ استرخِ تماماً.",
    },
    {
      step: 4,
      title: "الراحة والضيافة",
      duration: "~١٠–١٥ د",
      description: "وجبة خفيفة وعصير، وأصبحت بطلاً منقذاً.",
    },
  ],
  en: [
    {
      step: 1,
      title: "Register",
      duration: "~5 min",
      description: "ID and a short form.",
    },
    {
      step: 2,
      title: "Mini health check",
      duration: "~10 min",
      description:
        "Questionnaire, blood pressure, pulse and a finger-prick haemoglobin test.",
    },
    {
      step: 3,
      title: "Donate",
      duration: "~8–10 min",
      description: "About 450 mL; just relax.",
    },
    {
      step: 4,
      title: "Rest & refuel",
      duration: "~10–15 min",
      description: "Snack and drink, then you're a hero.",
    },
  ],
};

export const DONATION_DAY_STEPS = DONATION_DAY_STEPS_BY_LOCALE.en;

export const DONATION_TOTAL_TIME_BY_LOCALE: Record<Locale, string> = {
  ar: "حوالي ٤٥–٦٠ دقيقة.",
  en: "about 45–60 minutes.",
};

export const DONATION_TOTAL_TIME = DONATION_TOTAL_TIME_BY_LOCALE.en;

export const BEFORE_CHECKLIST_BY_LOCALE: Record<Locale, string[]> = {
  ar: [
    "تناول وجبة متوازنة قبل التبرع بـ ٢–٣ ساعات",
    "اشرب ٥٠٠ مل إضافية من الماء",
    "احصل على قسط جيد من النوم",
    "أحضر بطاقة الهوية أو الكارنيه الجامعي",
    "ارتدِ ملابس بأكمام سهلة الرفع",
  ],
  en: [
    "Eat a proper meal 2–3 hours before",
    "Drink an extra 500 mL of water",
    "Get a good night's sleep",
    "Bring your ID",
    "Wear sleeves that roll up easily",
  ],
};

export const BEFORE_CHECKLIST = BEFORE_CHECKLIST_BY_LOCALE.en;

export const AFTER_CHECKLIST_BY_LOCALE: Record<Locale, string[]> = {
  ar: [
    "استرح ١٠–١٥ دقيقة واستمتع بالوجبة الخفيفة",
    "اشرب سوائل إضافية خلال ٢٤–٤٨ ساعة القادمة",
    "أبقِ الضمادة لعدة ساعات",
    "تجنب حمل الأثقال والتمارين الشاقة بقية اليوم",
    "تجنب التدخين لساعتين على الأقل",
    "تناول طعاماً غنياً بالحديد: العدس، الفول، الكبدة، السبانخ، التمر",
    "شعرت بدوخة؟ اجلس أو استلقِ مع رفع قدميك قليلاً",
    "ظهرت كدمة بسيطة؟ ضع كمادة باردة ملفوفة بقماش",
  ],
  en: [
    "Rest for 10–15 minutes and enjoy your snack",
    "Drink extra fluids for the next 24–48 hours",
    "Keep the bandage on for a few hours",
    "Avoid heavy lifting and intense exercise for the rest of the day",
    "Skip smoking for a couple of hours",
    "Eat iron-rich food: lentils (ads), ful, liver, spinach, dates",
    "Feeling dizzy? Sit or lie down with your feet raised",
    "Bruise? Apply a cold pack wrapped in cloth",
  ],
};

export const AFTER_CHECKLIST = AFTER_CHECKLIST_BY_LOCALE.en;
