import type { EligibilityQuestion } from "@/types";

export const WHY_IT_MATTERS = {
  lead: "Blood can't be manufactured, and parts of it only last days, so hospitals need a constant flow of donors.",
  whoStat:
    "The WHO estimates that donations from at least 1% of a population are needed to meet a country's most basic needs.",
};

export interface WhoNeedsBloodItem {
  id: string;
  label: string;
  detail: string;
  icon: "ambulance" | "baby" | "heart-pulse" | "ribbon" | "stethoscope" | "flame";
}

export const WHO_NEEDS_BLOOD: WhoNeedsBloodItem[] = [
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
];

export const SPLIT_TARGETS = [
  {
    id: "rbc",
    component: "Red cells",
    recipient: "an accident victim",
    colorClass: "bg-blood-600 text-white",
    cardBorder: "border-blood-200 bg-blood-50/70",
  },
  {
    id: "plasma",
    component: "Plasma",
    recipient: "a burn patient",
    colorClass: "bg-plasma-400 text-ink",
    cardBorder: "border-amber-200 bg-amber-50/70",
  },
  {
    id: "platelets",
    component: "Platelets",
    recipient: "a child with leukaemia",
    colorClass: "bg-violet-400 text-white",
    cardBorder: "border-violet-200 bg-violet-50/70",
  },
] as const;

export const ELIGIBILITY_QUESTIONS: EligibilityQuestion[] = [
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
    question: "Have you had a fever, or taken antibiotics, in the last 2 weeks?",
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
];

export const ELIGIBILITY_PASS_TEXT =
  "Looks like you're good to go! 🎉 Head to the donation booth. The medical team will do a quick final check.";

export const ELIGIBILITY_WAIT_TEXT =
  "You might need to wait a little. That's totally normal! Chat with the medical team at the booth; they'll tell you exactly when you can donate.";

export const ELIGIBILITY_DISCLAIMER =
  "This is a quick guide, not a medical assessment. Final eligibility is decided by the medical staff.";

export interface DonationDayStep {
  step: number;
  title: string;
  duration: string;
  description: string;
}

export const DONATION_DAY_STEPS: DonationDayStep[] = [
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
];

export const DONATION_TOTAL_TIME = "about 45–60 minutes.";

export const BEFORE_CHECKLIST: string[] = [
  "Eat a proper meal 2–3 hours before",
  "Drink an extra 500 mL of water",
  "Get a good night's sleep",
  "Bring your ID",
  "Wear sleeves that roll up easily",
];

export const AFTER_CHECKLIST: string[] = [
  "Rest for 10–15 minutes and enjoy your snack",
  "Drink extra fluids for the next 24–48 hours",
  "Keep the bandage on for a few hours",
  "Avoid heavy lifting and intense exercise for the rest of the day",
  "Skip smoking for a couple of hours",
  "Eat iron-rich food: lentils (ads), ful, liver, spinach, dates",
  "Feeling dizzy? Sit or lie down with your feet raised",
  "Bruise? Apply a cold pack wrapped in cloth",
];
