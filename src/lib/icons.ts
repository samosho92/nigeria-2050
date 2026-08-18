import type { IconFigure } from "@/types/content";
import { ERA_FEATURED_ICON_IDS, HOME_FEATURED_ICON_IDS } from "@/content/icons/featured";
import { getIconById } from "@/content/icons";
import type { EraId } from "@/content/timeline";

export function iconShortName(name: string): string {
  const nick = name.match(/\(([^)]+)\)/);
  if (nick?.[1]) return nick[1];
  return name.replace(/\s*\([^)]*\)/g, "").trim();
}

export function iconInitials(name: string): string {
  const parts = name
    .replaceAll(/[()‘’']/g, " ")
    .split(/\s+/)
    .filter((part) => part && !/^(of|the|alhaja|sir|lady|dr|chief)$/i.test(part));
  const letters = parts
    .filter((part) => /^[\p{L}]/u.test(part))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "");
  return letters.join("") || name.slice(0, 2).toUpperCase();
}

function figuresFromIds(ids: readonly string[]): IconFigure[] {
  return ids.map((id) => getIconById(id)).filter((figure): figure is IconFigure => Boolean(figure));
}

export function getFeaturedHomeIcons(): IconFigure[] {
  return figuresFromIds(HOME_FEATURED_ICON_IDS);
}

export function getFeaturedIconsForEra(eraId: EraId): IconFigure[] {
  return figuresFromIds(ERA_FEATURED_ICON_IDS[eraId] ?? []);
}

export function getAllEraFeaturedIcons(): Record<EraId, IconFigure[]> {
  return Object.fromEntries(
    (Object.keys(ERA_FEATURED_ICON_IDS) as EraId[]).map((eraId) => [
      eraId,
      getFeaturedIconsForEra(eraId),
    ]),
  ) as Record<EraId, IconFigure[]>;
}
