export type BloodType =
  | "O-"
  | "O+"
  | "A-"
  | "A+"
  | "B-"
  | "B+"
  | "AB-"
  | "AB+";

export type DonorBloodSelection = BloodType | "unknown";

export type StampKey =
  | "mythBuster"
  | "bloodScholar"
  | "typeExpert"
  | "donorReady";

export type CardTheme = "crimson" | "midnight" | "pearl";
export type ThemeMode = "light" | "dark";
export type Locale = "ar" | "en";

export interface Preferences {
  theme: ThemeMode;
  locale: Locale;
}

export interface DonorCardData {
  name: string;
  bloodType: DonorBloodSelection;
  donatedToday: boolean;
  id: string;
  createdAt: string;
  theme?: CardTheme;
}

export interface Progress {
  stamps: Record<StampKey, boolean>;
  bestScore: number | null;
  card: DonorCardData | null;
}

export interface MythItem {
  id: string;
  statement: string;
  answer: "fact" | "myth";
  explanation: string;
}

export type EligibilityAnswer = "yes" | "no" | "na";

export interface EligibilityQuestion {
  id: string;
  question: string;
  passIf: "yes" | "no";
  allowNa?: boolean;
  flagReason: string;
}
