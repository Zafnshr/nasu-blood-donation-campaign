export interface TubeLayer {
  id: "plasma" | "buffy" | "rbc";
  label: string;
  percentage: string;
  description: string;
  colorClass: string;
  accentHex: string;
}

export const TUBE_LAYERS: TubeLayer[] = [
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
];

export const BLOOD_QUICK_FACTS = [
  {
    value: "~5 L",
    text: "An adult has about 5 litres of blood.",
  },
  {
    value: "450–500 mL",
    text: "A donation is about 450–500 mL, roughly 10% of it.",
  },
  {
    value: "2M / sec",
    text: "Your bone marrow makes about 2 million red cells every second.",
  },
];

export const MARROW_STEPS = [
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
];

export interface RecoveryItem {
  id: string;
  label: string;
  fullDay: number;
  timeframe: string;
}

export const RECOVERY_ITEMS: RecoveryItem[] = [
  {
    id: "fluid",
    label: "Fluid volume",
    fullDay: 1,
    timeframe: "about 24 hours",
  },
  {
    id: "plasma",
    label: "Plasma proteins",
    fullDay: 2,
    timeframe: "1–2 days",
  },
  {
    id: "platelets",
    label: "Platelets",
    fullDay: 7,
    timeframe: "within about a week",
  },
  {
    id: "rbc",
    label: "Red blood cells",
    fullDay: 56,
    timeframe: "4–8 weeks",
  },
  {
    id: "iron",
    label: "Iron stores",
    fullDay: 84,
    timeframe: "can take 8+ weeks, so eat iron-rich food",
  },
];

export const RECOVERY_NOTE =
  "Most blood services ask you to wait 8–16 weeks between whole-blood donations. Always follow your local blood bank's rules.";

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

export const BLOOD_COMPONENTS: BloodComponentInfo[] = [
  {
    id: "rbc",
    name: "Red blood cells",
    accentHex: "#e11d48",
    badgeClass: "bg-blood-100 text-blood-800",
    borderClass: "border-blood-200",
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
    badgeClass: "bg-plasma-100 text-amber-900",
    borderClass: "border-amber-200",
    usedFor: [
      "Burns",
      "Liver disease",
      "Clotting disorders",
      "Major bleeding",
    ],
    storage: "Frozen in deep storage",
    shelfLife: "Up to 1 year",
  },
  {
    id: "platelets",
    name: "Platelets",
    accentHex: "#a78bfa",
    badgeClass: "bg-violet-100 text-violet-900",
    borderClass: "border-violet-200",
    usedFor: [
      "Cancer & chemotherapy",
      "Leukaemia",
      "Bone-marrow transplants",
      "Surgery",
    ],
    storage: "Kept at room temperature, gently shaken",
    shelfLife: "Only 5–7 days",
  },
];

export interface CollectionStep {
  step: number;
  title: string;
  description: string;
}

export const COLLECTION_JOURNEY: CollectionStep[] = [
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
];
