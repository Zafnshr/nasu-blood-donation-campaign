import type { BloodType, DonorBloodSelection } from "@/types";

export const BLOOD_TYPES = [
  "O-",
  "O+",
  "A-",
  "A+",
  "B-",
  "B+",
  "AB-",
  "AB+",
] as const satisfies readonly BloodType[];

export interface BloodAntigens {
  a: boolean;
  b: boolean;
  rh: boolean;
}

export function getAntigens(type: BloodType): BloodAntigens {
  const group = type.slice(0, -1);
  const sign = type.slice(-1);
  return {
    a: group.includes("A"),
    b: group.includes("B"),
    rh: sign === "+",
  };
}

export function formatBloodType(type: DonorBloodSelection): string {
  if (type === "unknown") return "?";
  return type.replace("-", "\u2212");
}

/**
 * Red cell transfusion safety:
 * Every antigen present on donor RBCs (A, B, RhD) must also be tolerated by the recipient.
 */
export function canGiveRedCells(
  donor: BloodType,
  recipient: BloodType
): boolean {
  const d = getAntigens(donor);
  const r = getAntigens(recipient);
  if (d.a && !r.a) return false;
  if (d.b && !r.b) return false;
  if (d.rh && !r.rh) return false;
  return true;
}

export function redCellRecipients(donor: BloodType): BloodType[] {
  return BLOOD_TYPES.filter((recipient) => canGiveRedCells(donor, recipient));
}

export function redCellDonors(recipient: BloodType): BloodType[] {
  return BLOOD_TYPES.filter((donor) => canGiveRedCells(donor, recipient));
}

/**
 * Plasma transfusion safety (reversed ABO, Rh ignored):
 * Donor plasma antibodies must not attack recipient RBC antigens,
 * so recipient ABO antigens must be a subset of donor ABO antigens.
 */
export function canGivePlasma(donor: BloodType, recipient: BloodType): boolean {
  const d = getAntigens(donor);
  const r = getAntigens(recipient);
  if (r.a && !d.a) return false;
  if (r.b && !d.b) return false;
  return true;
}

export function plasmaRecipients(donor: BloodType): BloodType[] {
  return BLOOD_TYPES.filter((recipient) => canGivePlasma(donor, recipient));
}

export function describeRedCellCompatibility(
  donor: BloodType,
  recipient: BloodType
): string {
  const d = getAntigens(donor);
  const r = getAntigens(recipient);

  const missing: string[] = [];
  if (d.a && !r.a) missing.push("A");
  if (d.b && !r.b) missing.push("B");
  if (d.rh && !r.rh) missing.push("RhD");

  if (missing.length === 0) {
    if (donor === "O-") {
      return `O− has no A, B, or RhD antigens, so it's safe for ${formatBloodType(recipient)}.`;
    }
    const donorLabels: string[] = [];
    if (d.a) donorLabels.push("A");
    if (d.b) donorLabels.push("B");
    if (d.rh) donorLabels.push("RhD");
    if (donorLabels.length === 0) {
      return `O− has no antigens that ${formatBloodType(recipient)} reacts to.`;
    }
    return `${formatBloodType(recipient)} already carries ${donorLabels.join(" & ")}, so ${formatBloodType(donor)} red cells are a safe match.`;
  }

  return `${formatBloodType(donor)} carries ${missing.join(" & ")}, which ${formatBloodType(recipient)} doesn't have — that could trigger an immune reaction.`;
}

/**
 * Fisher-Yates shuffle returning a new array.
 * Call only inside event handlers, never during render.
 */
export function shuffle<T>(arr: readonly T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}
