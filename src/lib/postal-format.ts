import type { PostalBand, PostalPlace } from "@/content/postal-code-engine";

export function formatPostalCode(plate: string, place: PostalPlace): string {
  return `${plate}-${place.band}${place.district}-${place.unit}`;
}

export function formatStreetCode(
  plate: string,
  band: PostalBand,
  district: string,
  unit: string,
): string {
  return `${plate}-${band}${district}-${unit}`;
}
