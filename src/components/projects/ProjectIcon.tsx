import {
  IconBolt,
  IconBooks,
  IconBulb,
  IconBus,
  IconCamera,
  IconClipboardList,
  IconCloudRain,
  IconDroplet,
  IconFileCertificate,
  IconFirstAidKit,
  IconFlask,
  IconGavel,
  IconHospital,
  IconId,
  IconLamp,
  IconMailbox,
  IconMusic,
  IconPhoneCall,
  IconRecycle,
  IconRoadSign,
  IconScale,
  IconShip,
  IconSnowflake,
  IconSoup,
  IconTools,
  IconTrees,
  IconWallet,
  IconWifi,
  type TablerIcon,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const PROJECT_ICONS: Record<string, TablerIcon> = {
  "postal-codes": IconMailbox,
  "road-signs": IconRoadSign,
  "public-libraries": IconBooks,
  "emergency-112": IconPhoneCall,
  "civil-registry": IconId,
  "land-titles": IconFileCertificate,
  "solar-streetlights": IconLamp,
  "primary-care-catchment": IconHospital,
  "open-budgets": IconClipboardList,
  "waste-routes": IconRecycle,
  "urban-parks": IconTrees,
  "school-meals": IconSoup,
  "grid-outage-map": IconBolt,
  "brt-on-a-map": IconBus,
  "farm-cold-chain": IconSnowflake,
  "dual-apprenticeship": IconTools,
  "published-water": IconDroplet,
  "port-clearance": IconShip,
  "portable-pension": IconWallet,
  "court-diary": IconGavel,
  "honest-market-scales": IconScale,
  "blood-and-oxygen": IconFirstAidKit,
  "last-mile-broadband": IconWifi,
  "keep-the-drains": IconCloudRain,
  "artist-royalties": IconMusic,
  "standards-lab": IconFlask,
  "heritage-circuit": IconCamera,
};

interface ProjectIconProps {
  projectId: string;
  className?: string;
}

export function ProjectIcon({ projectId, className }: ProjectIconProps) {
  const Icon = PROJECT_ICONS[projectId] ?? IconBulb;

  return (
    <div
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent/15 md:size-12",
        className,
      )}
      aria-hidden
    >
      <Icon className="size-5 text-accent md:size-6" stroke={1.5} />
    </div>
  );
}
