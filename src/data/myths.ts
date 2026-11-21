import type { MythItem } from "@/types";

export const MYTHS: MythItem[] = [
  {
    id: "m1",
    statement: "Donating blood really hurts.",
    answer: "myth",
    explanation:
      "You'll feel a quick pinch when the needle goes in. After that, most donors feel little to nothing.",
  },
  {
    id: "m2",
    statement: "You can catch an infection from donating blood.",
    answer: "myth",
    explanation:
      "Every needle and bag is sterile, used once, then thrown away. Donating can't infect you.",
  },
  {
    id: "m3",
    statement:
      "Your body replaces the donated fluid (plasma) within about 1–2 days.",
    answer: "fact",
    explanation:
      "Plasma volume bounces back within roughly 24–48 hours, especially if you drink plenty of water.",
  },
  {
    id: "m4",
    statement: "Red blood cells take a few weeks to fully replenish.",
    answer: "fact",
    explanation:
      "Your bone marrow rebuilds them over about 4–8 weeks. That's why there's a waiting period between donations.",
  },
  {
    id: "m5",
    statement: "One whole blood donation can help up to 3 people.",
    answer: "fact",
    explanation:
      "Your blood is separated into red cells, plasma and platelets, and each can go to a different patient.",
  },
  {
    id: "m6",
    statement: "If you have a tattoo, you can never donate blood.",
    answer: "myth",
    explanation:
      "You usually just wait a few months after a new tattoo or piercing. The exact period depends on local rules.",
  },
  {
    id: "m7",
    statement: "Vegetarians can't donate because they lack iron.",
    answer: "myth",
    explanation:
      "If your haemoglobin passes the quick finger-prick check, you can donate, whatever your diet.",
  },
  {
    id: "m8",
    statement: "The actual donation only takes about 8–10 minutes.",
    answer: "fact",
    explanation:
      "The needle part is quick. The whole visit, including the check-up and a snack, is around 45–60 minutes.",
  },
  {
    id: "m9",
    statement: "Donating blood leaves you weak for weeks.",
    answer: "myth",
    explanation:
      "Most people feel normal the same day. Rest, hydrate and eat well and you're good.",
  },
  {
    id: "m10",
    statement:
      "O negative red cells can be given to almost anyone in an emergency.",
    answer: "fact",
    explanation:
      "O- red cells have no A, B or RhD antigens, so emergency teams reach for them when there's no time to test.",
  },
  {
    id: "m11",
    statement: "Blood can be made in a lab, so donors aren't really needed.",
    answer: "myth",
    explanation:
      "There's still no substitute for human blood at scale. Every unit comes from a donor like you.",
  },
  {
    id: "m12",
    statement: "You need to know your blood type before you can donate.",
    answer: "myth",
    explanation:
      "No need! Your blood is typed and tested after donation. It's a free way to find out.",
  },
];
