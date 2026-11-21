import type { StampKey } from "@/types";

export const CAMPAIGN_INFO = {
  brand: "NASU Blood Drive",
  fullTitle: "NASU Blood Donation Campaign",
  closingLine: "Ready to give? Find the NASU campaign team at the donation booth.",
  disclaimer:
    "Educational content for awareness only. Eligibility and all medical decisions are made by qualified blood bank staff.",
};

export interface StampMeta {
  key: StampKey;
  label: string;
  hint: string;
  href: string;
}

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

export const HOME_STATS = [
  { value: "Up to 3", label: "lives per donation" },
  { value: "~10 min", label: "to donate" },
  { value: "~5 L", label: "of blood in an adult" },
  { value: "4–8 weeks", label: "to rebuild red cells" },
];

export const JOURNEY_TILES: {
  href: string;
  tab: string;
  title: string;
  duration: string;
  stampKey: StampKey | null;
}[] = [
  {
    href: "/play",
    tab: "Play",
    title: "Fact or Myth",
    duration: "2 min",
    stampKey: "mythBuster",
  },
  {
    href: "/learn",
    tab: "Learn",
    title: "Your blood, explained",
    duration: "3 min",
    stampKey: "bloodScholar",
  },
  {
    href: "/donate",
    tab: "Donate",
    title: "Why & how to donate",
    duration: "2 min",
    stampKey: "donorReady",
  },
  {
    href: "/card",
    tab: "Card",
    title: "Your donor card",
    duration: "1 min",
    stampKey: null,
  },
];
