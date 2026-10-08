import Link from "next/link";
import {
  IconAlertTriangle,
  IconBabyCarriage,
  IconBolt,
  IconBook,
  IconBriefcase,
  IconBuilding,
  IconBuildingBank,
  IconBuildingFactory2,
  IconBuildingStore,
  IconChartBar,
  IconCoin,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDroplet,
  IconGasStation,
  IconGavel,
  IconHeartbeat,
  IconHome,
  IconHomeBolt,
  IconMapPin,
  IconMovie,
  IconMusic,
  IconPalette,
  IconPhoto,
  IconPlane,
  IconPlant2,
  IconPlug,
  IconRoad,
  IconRocket,
  IconScale,
  IconSchool,
  IconShield,
  IconStethoscope,
  IconSun,
  IconTrain,
  IconTruck,
  IconUserCheck,
  IconUsers,
  IconWifi,
  IconWorldWww,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";
import { FadeIn } from "@/components/motion";
import { getSourceById } from "@/content/sources";
import type { SectorDriverIconId, SectorKeyDriver } from "@/types/content";

const DRIVER_ICONS: Record<SectorDriverIconId, TablerIcon> = {
  chart: IconChartBar,
  factory: IconBuildingFactory2,
  oil: IconGasStation,
  briefcase: IconBriefcase,
  wifi: IconWifi,
  "world-www": IconWorldWww,
  rocket: IconRocket,
  "device-mobile": IconDeviceMobile,
  scale: IconScale,
  vote: IconUserCheck,
  "building-bank": IconBuildingBank,
  "device-desktop": IconDeviceDesktop,
  book: IconBook,
  school: IconSchool,
  users: IconUsers,
  stethoscope: IconStethoscope,
  bolt: IconBolt,
  plug: IconPlug,
  sun: IconSun,
  "home-bolt": IconHomeBolt,
  alert: IconAlertTriangle,
  shield: IconShield,
  building: IconBuilding,
  gavel: IconGavel,
  heart: IconHeartbeat,
  heartbeat: IconHeartbeat,
  "baby-carriage": IconBabyCarriage,
  plant: IconPlant2,
  droplet: IconDroplet,
  truck: IconTruck,
  movie: IconMovie,
  music: IconMusic,
  palette: IconPalette,
  coin: IconCoin,
  "building-store": IconBuildingStore,
  road: IconRoad,
  train: IconTrain,
  plane: IconPlane,
  home: IconHome,
  "map-pin": IconMapPin,
  photo: IconPhoto,
};

interface SectorKeyDriversProps {
  drivers: SectorKeyDriver[];
  title: string;
  lead: string;
  sourceLabel: string;
}

export function SectorKeyDrivers({
  drivers,
  title,
  lead,
  sourceLabel,
}: SectorKeyDriversProps) {
  if (drivers.length === 0) return null;

  return (
    <FadeIn>
      <div className="mb-8 max-w-2xl">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{lead}</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {drivers.map((driver) => {
          const Icon = DRIVER_ICONS[driver.icon];
          const source = getSourceById(driver.sourceId);

          return (
            <li
              key={driver.id}
              className="flex flex-col rounded-xl border border-border bg-card p-5 transition hover:border-accent/40"
            >
              <div className="flex items-start gap-3">
                <span
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent"
                  aria-hidden
                >
                  <Icon className="size-5" stroke={1.5} />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {driver.label}
                  </p>
                  <p className="mt-1 font-serif text-2xl font-bold tabular-nums tracking-tight text-foreground">
                    {driver.baseline}
                  </p>
                </div>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {driver.why}
              </p>
              {source ? (
                <p className="mt-4 border-t border-border pt-3 text-[0.6875rem] text-muted-foreground">
                  <span className="font-medium text-foreground/80">{sourceLabel} </span>
                  <Link
                    href={`/sources#${source.id}`}
                    className="font-medium text-accent transition hover:underline"
                  >
                    {source.publisher}, {source.year}
                  </Link>
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </FadeIn>
  );
}
