import type { DonorBloodSelection } from "@/types";

export const BLOOD_TYPES_INTRO =
  "Your blood type depends on markers (antigens) on your red cells. A and B decide your group (A, B, AB or O). The RhD marker makes you positive (+) or negative (–).";

export const BLOOD_TYPES_FUN_FACT =
  "Blood groups were discovered by Karl Landsteiner in 1901, earning him a Nobel Prize in 1930.";

export const BLOOD_TYPES_PLASMA_NOTE =
  "Plasma works the other way round: AB plasma can be given to anyone, while O plasma only goes to O patients.";

export const BLOOD_TYPES_GLOBAL_NOTE =
  "O+ is the most common type worldwide, and AB- is one of the rarest.";

export const BLOOD_TYPE_TITLES: Record<
  DonorBloodSelection,
  { title: string; subtitle: string }
> = {
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
};
