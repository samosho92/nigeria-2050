import type { IconFigure } from "@/types/content";
import { ERA_FEATURED_ICON_IDS, HOME_FEATURED_ICON_IDS } from "@/content/icons/featured";
import { getIconById } from "@/content/icons";
import type { EraId } from "@/content/timeline";

export { iconInitials, iconShortName } from "@/lib/icon-names";

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
