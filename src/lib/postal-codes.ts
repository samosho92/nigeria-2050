import {
  POSTAL_CAPITALS,
  formatPostalCode,
  formatStreetCode,
  streetZonesFor,
  type PostalBand,
  type PostalCapital,
  type PostalPlace,
  type PostalStreetZone,
} from "@/content/postal-code-engine";
import { NIGERIA_MAP_REGIONS } from "@/content/nigeria-map";

export interface PostalLookupHit {
  id: string;
  code: string;
  capitalId: string;
  capital: string;
  state: string;
  zoneLabel: string;
  place: PostalPlace;
  street?: PostalStreetZone;
}

function zoneLabel(zoneId: string): string {
  return NIGERIA_MAP_REGIONS.find((region) => region.id === zoneId)?.label ?? zoneId;
}

function hitsForCapital(city: PostalCapital): PostalLookupHit[] {
  const zone = zoneLabel(city.zoneId);
  const bandHits = [city.rural, city.periurban, city.urban].map((place) => ({
    id: `${city.id}-${place.band}`,
    code: formatPostalCode(city.plate, place),
    capitalId: city.id,
    capital: city.capital,
    state: city.state,
    zoneLabel: zone,
    place,
  }));

  const streetHits = (["U", "P"] as PostalBand[]).flatMap((band) => {
    const parent = band === "U" ? city.urban : city.periurban;
    return streetZonesFor(city, band).map((streetZone) => ({
      id: `${city.id}-${band}-${streetZone.unit}`,
      code: formatStreetCode(city.plate, band, parent.district, streetZone.unit),
      capitalId: city.id,
      capital: city.capital,
      state: city.state,
      zoneLabel: zone,
      place: parent,
      street: streetZone,
    }));
  });

  return [...bandHits, ...streetHits];
}

export const POSTAL_LOOKUP_INDEX: PostalLookupHit[] = POSTAL_CAPITALS.flatMap(hitsForCapital);

export function searchPostalIndex(query: string, limit = 8): PostalLookupHit[] {
  const q = query.trim().toLowerCase().replace(/\s+/g, "");
  if (q.length < 2) return [];
  const raw = query.trim().toLowerCase();

  const scored = POSTAL_LOOKUP_INDEX.map((hit) => {
    const hay =
      `${hit.code} ${hit.capital} ${hit.state} ${hit.place.name} ${hit.place.landmark} ${hit.street?.name ?? ""} ${hit.street?.stretch ?? ""}`.toLowerCase();
    const compact = hay.replace(/\s+/g, "");
    let score = 0;
    if (hit.code.toLowerCase().replace(/-/g, "").includes(q.replace(/-/g, ""))) score += 8;
    if (compact.includes(q)) score += 4;
    if (hit.street?.name.toLowerCase().includes(raw)) score += 7;
    if (hit.capital.toLowerCase().startsWith(raw)) score += 6;
    if (hit.state.toLowerCase().startsWith(raw)) score += 5;
    return { hit, score };
  })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((row) => row.hit);
}

export function transectFor(city: PostalCapital): PostalLookupHit[] {
  const zone = zoneLabel(city.zoneId);
  return [city.rural, city.periurban, city.urban].map((place) => ({
    id: `${city.id}-${place.band}`,
    code: formatPostalCode(city.plate, place),
    capitalId: city.id,
    capital: city.capital,
    state: city.state,
    zoneLabel: zone,
    place,
  }));
}

export function capitalsByZone(): { zoneId: string; label: string; cities: PostalCapital[] }[] {
  return NIGERIA_MAP_REGIONS.map((region) => ({
    zoneId: region.id,
    label: region.label,
    cities: POSTAL_CAPITALS.filter((city) => city.zoneId === region.id),
  })).filter((group) => group.cities.length > 0);
}
