import { SECTORS } from "@/content/sectors";
import {
  getVignetteCity,
  getVignetteSeason,
  type VignetteCity,
  type VignetteSeasonId,
} from "@/content/your-2050-settings";
import { sanitizeDisplayName } from "@/lib/ask-guardrails";
import { siteUrl } from "@/lib/site";
import type { Sector } from "@/types/content";

function pick<T>(items: T[], seed: number): T {
  return items[seed % items.length];
}

function hashSeed(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function metric(sector: Sector, key: string): string | undefined {
  const projection = sector.projections.find((entry) => entry.year === 2050);
  const value = projection?.metrics[key];
  return value === undefined ? undefined : String(value);
}

function greet(name: string | undefined): string {
  const trimmed = name?.trim();
  return trimmed ? `${trimmed}, ` : "";
}

export interface Your2050Input {
  sectorSlugs: string[];
  name?: string;
  cityId?: string;
  seasonId?: VignetteSeasonId | string;
}

export interface Your2050Vignette {
  title: string;
  body: string;
  sectors: Sector[];
  shareText: string;
  setting?: string;
}

function openingParagraph(
  input: Your2050Input,
  city: VignetteCity,
  seasonId: VignetteSeasonId,
  seed: number,
): string {
  const weather = city.weather[seasonId];
  const who = greet(input.name);
  return pick(
    [
      `${who}${weather.dawn} ${weather.air} This is ${city.name} in 2050, ${city.region}, in a climate that still has moods and a country that has finally learned to plan around them.`,
      `${who}You wake in ${city.name}. ${weather.dawn} ${weather.air} Nobody calls it the future. It is only a weekday, and the weather is doing what the weather here has always done, only you are less afraid of it.`,
      `${who}${weather.dawn} You step outside. ${weather.air} The year is 2050. ${city.name} does not announce itself. It simply holds.`,
    ],
    seed,
  );
}

function sectorParagraph(
  sector: Sector,
  city: VignetteCity,
  seasonId: VignetteSeasonId,
  seed: number,
  slot: "primary" | "secondary",
): string {
  const later =
    slot === "secondary"
      ? pick(
          [
            `Later, the day changes its subject.`,
            `By afternoon the city shows you another of its trades.`,
            `On the way home, a second story insists on being lived.`,
          ],
          seed + 3,
        )
      : "";
  const scene = pick(scenesForSector(sector, city, seasonId), seed + slot.length);
  return [later, scene].filter(Boolean).join(" ");
}

function scenesForSector(
  sector: Sector,
  city: VignetteCity,
  seasonId: VignetteSeasonId,
): string[] {
  const cityName = city.name;
  const rainy = seasonId === "rainy";
  const harmattan = seasonId === "harmattan";
  const writers: Record<string, () => string[]> = {
    economy: () => {
      const gdp = metric(sector, "gdp") ?? "$4.2T";
      const capita = metric(sector, "gdpPerCapita") ?? "$12,500";
      const manufacturing = metric(sector, "manufacturingShare") ?? "22%";
      return [
        `By late morning the market in ${cityName} does not feel like a waiting room for oil money. A tailor takes payment with a tap. A lorry leaves a warehouse whose goods were made here. People still haggle. They haggle like people who expect next year to arrive on time. If you listen, a radio mentions a ${gdp} country and a ${capita} life as if they were weather reports, and manufacturing at ${manufacturing} of output as if it were ordinary.`,
        `Lunch in ${cityName} is the sound of a middle class that has stopped apologising. Offices, workshops, cards tapping against wood. Oil is a smaller rumour at the port. The country has grown up in the numbers (output around ${gdp}, income near ${capita}) and, more surprisingly, in the way a stranger will sell you something without first asking whether the lights will last the hour.`,
      ];
    },
    technology: () => [
      `Your phone does a quiet, unfashionable thing: it works. Identity, a payment, a record if you need one. In a room above a street in ${cityName}, someone ships software that will be used in Accra before night. Technology is no longer a rumour imported in a suitcase. It is background, like weather, except this weather was built.`,
      `A young engineer in ${cityName} complains about a deploy the way an older generation complained about generators. That is the tell. Digital public rails (identity, payments, the boring civic stuff) have become furniture. You do not praise a chair for existing. You sit.`,
    ],
    governance: () => [
      `You pass a government office in ${cityName} and, against old instinct, you do not cross the street. A form has a status. A budget is a page you can find. Trust is not love. It is the feeling that a contract might hold if you have to test it, and that an election result might be allowed to remain a result.`,
      `In a municipal waiting room, the queue moves. Nobody blesses this as a miracle. They take a number. Outside, ${cityName} keeps being a city. Institutions that work look, from the pavement, almost like manners.`,
    ],
    education: () => [
      `A schoolyard at break in ${cityName}. Socks, dust, a teacher who arrived. The children are not selling sachet water in the intersection. You can hear literacy in how they argue, which is to say they argue as if the future is a room they have already been shown.`,
      `Afternoon classes. Ceiling fans, a chalkboard or its grandchild, a girl who will not lower her voice. Nigeria's bet has always been its young. In 2050 the bet is being paid in classrooms that stay open, and in a workforce that was trained at home and did not have to leave to become real.`,
    ],
    energy: () => {
        const capacity = metric(sector, "gridDelivery") ?? "85 GW";
      return [
        `The fan was already on when you woke. No one in ${cityName} discusses the grid unless it fails, and today it does not. At the edge of town, solar and gas do unfashionable work. ${capacity} sounds like a ministry sentence. On this street it is only this: light that stays, heat you can argue with, evening lamps that come up like a decision.`,
        `A kettle boils without a ceremony. That is the whole energy story, if you live it from a kitchen in ${cityName}. Generators still exist, the way umbrellas exist, for the day the sky misbehaves. They are not the government of the house.`,
      ];
    },
    security: () => [
      `You take the longer walk through ${cityName} because you want to, not because the shorter one is a calculation. Dusk is still dusk. It is not an alarm. A football match runs five minutes into dark and the parents do not start doing maths.`,
      `Safety here is not a parade. It is a baseline: shops open later, a bus stop that does not feel like a dare, investment that no longer arrives wearing a helmet. You notice it most when you forget to notice it.`,
    ],
    healthcare: () => {
      const life = metric(sector, "lifeExpectancy") ?? "68 years";
      return [
        `The clinic in ${cityName} smells of antiseptic and ${rainy ? "wet concrete" : harmattan ? "dust that the nurses keep sweeping" : "hot linoleum"}. A number is called. A nurse who trained here, and stayed, checks a blood pressure as if this were the most ordinary mercy. Life expectancy is a statistic until you watch an older woman walk in on her own. They say ${life}. She is busy living it.`,
        `You wait, and the wait ends. That used to be the plot of a whole afternoon. Universal coverage, on a form, is a phrase. In this corridor it is a card that works, a vaccine in a fridge that stays cold, a country that decided 400 million bodies were not a rumour.`,
      ];
    },
    agriculture: () => [
      `Fruit that tastes like the country, not like a port. In ${cityName} a grain lorry passes, high and slow. The climate has not become gentle (it never promised to) but the farms have learned new habits: seed that can stand a shorter rain, soil that is not treated like a mine. A bag of rice does not come with a rumour.`,
      `Someone is frying something that grew near here. That should not feel like news. In 2050 it still does, a little, because you remember when staples were a foreign policy. Nigeria feeding itself is not a slogan on this street. It is lunch.`,
    ],
    "creative-economy": () => [
      `From a studio in ${cityName}, a beat leaks into the street and does not need a visa. A fashion rail. A camera. A producer arguing about light as if light were a national resource, which it is. Culture pays rent now. That is the quiet revolution, quieter than oil, and harder to steal.`,
      `You catch a chorus through an open window and know it will be playing in another country by nightfall, credited, paid, made here. The creative trades have stopped being a hobby the uncles tolerated. They are an industry with sweat and invoices.`,
    ],
    manufacturing: () => {
      const share = metric(sector, "manufacturingGdpShare") ?? "22%";
      return [
        `A Made-in-Nigeria stamp that is not an apology. From a flyover in ${cityName} you can hear an industrial hum, steel and blister packs and a dashboard assembled within reach of this weather. Manufacturing at ${share} of output is a chart. On the ground it is shift change, and a canteen, and pride that does not need a speech.`,
        `The afternoon smells faintly of hot metal and soap. Factories, not just depots. West Africa's workshop has an address, and today the address is near enough that a mechanic's cousin has a proper wage.`,
      ];
    },
    "financial-inclusion": () => [
      `An agent under an awning in ${cityName}, rain or dust, who is no longer a curiosity. You pay for tomatoes with a tap. Credit that is small and serious exists for a woman who used to keep her savings in a wrapper. Money moves without a cousin abroad having to bless it first.`,
      `The informal has not vanished. It has been given rails. A market stall, a regulated account, a transfer that lands before the ${harmattan ? "dust" : rainy ? "next downpour" : "sun"} does. Inclusion, lived, is the end of asking permission to be in the economy.`,
    ],
    transportation: () => [
      `You board something in ${cityName} that leaves when it says it will. A rail, or a lane that is actually a lane. The old joke about sitting in traffic until you forget your own name has become a story grandparents tell, the way they tell stories about generators.`,
      `Cargo moves like a country that has decided the map should connect people to each other, not only to the sea. You watch a bus pull away on time and feel, briefly, the luxury of expecting the next one.`,
    ],
  };

  const write = writers[sector.slug];
  if (write) return write();

  return [
    `You spend the middle of the day inside ${cityName}'s ${sector.title.toLowerCase()} story. It does not arrive as a speech. It arrives as a queue that moves, a tool that works, a plan that survived contact with weather.`,
  ];
}

function closingParagraph(
  city: VignetteCity,
  seasonId: VignetteSeasonId,
  seed: number,
): string {
  const weather = city.weather[seasonId];
  return pick(
    [
      `${weather.evening} You walk home. You do not call it a miracle. You call it a Tuesday. Somewhere a planner would say this is only the base case, if the assumptions hold. You fold the thought away. Tonight it is a city, a season, and a country that did not waste the next twenty-five years.`,
      `${weather.evening} ${city.name} keeps its weather, because climate is not a rumour you can vote out. What changed is smaller and harder: the lights, the clinic, the train, the courage to treat 2050 as a place you might arrive. This scene is a scenario. It is also, if you squint, a dare.`,
      `Night. ${weather.evening} You eat with a window open. The future, when it works, is not fireworks. It is the ordinary privilege of not bracing. Remember that none of this is promised. Remember, too, how a promised thing begins: as a day someone decided to inhabit.`,
    ],
    seed + 7,
  );
}

export function generateYour2050Vignette(input: Your2050Input): Your2050Vignette {
  const name = sanitizeDisplayName(input.name);
  const sectors = input.sectorSlugs
    .map((slug) => SECTORS.find((sector) => sector.slug === slug))
    .filter((sector): sector is Sector => Boolean(sector));

  if (sectors.length === 0) {
    return {
      title: "Pick a sector to begin",
      body: "Choose one or two sectors, a city, and a season. We will write you a day in 2050 from the sourced projections, not from thin air.",
      sectors: [],
      shareText: "",
    };
  }

  const city = getVignetteCity(input.cityId ?? "lagos");
  const season = getVignetteSeason(input.seasonId ?? "rainy");
  const seasonId = season.id;
  const seed = hashSeed(
    `${sectors.map((s) => s.slug).join("-")}|${city.id}|${seasonId}|${name ?? ""}`,
  );

  const primary = sectors[0];
  const secondary = sectors[1];
  const weather = city.weather[seasonId];

  const body = [
    openingParagraph({ ...input, name }, city, seasonId, seed),
    sectorParagraph(primary, city, seasonId, seed, "primary"),
    secondary
      ? sectorParagraph(secondary, city, seasonId, seed + 11, "secondary")
      : "",
    closingParagraph(city, seasonId, seed),
  ]
    .filter(Boolean)
    .join("\n\n");

  const setting = `${city.name} · ${season.label} · 2050`;

  return {
    title: weather.title,
    setting,
    body,
    sectors,
    shareText: buildVignetteShareText(body, sectors, siteUrl, setting),
  };
}

export function buildVignetteShareText(
  body: string,
  sectors: Sector[],
  baseUrl = siteUrl,
  setting?: string,
): string {
  const url = `${baseUrl.replace(/\/$/, "")}/your-2050`;
  const sectorLine = sectors.map((s) => s.title).join(" + ");
  return [
    setting ? `${setting}` : `Your Nigeria 2050`,
    sectorLine,
    "",
    body,
    "",
    `A fiction grounded in sourced Naija2050 projections. Not a guarantee.`,
    url,
  ].join("\n");
}

export function getVignetteSharePayload(
  vignette: Your2050Vignette,
  baseUrl?: string,
): { title: string; text: string; url: string } {
  const origin =
    baseUrl ??
    (typeof window !== "undefined" ? window.location.origin : siteUrl);
  const url = `${origin.replace(/\/$/, "")}/your-2050`;
  const text =
    vignette.shareText ||
    buildVignetteShareText(vignette.body, vignette.sectors, origin, vignette.setting);

  return {
    title: vignette.title,
    text,
    url,
  };
}

function isShareCanceled(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

/** Share vignette via Web Share API, falling back to clipboard. */
export async function shareVignette(
  vignette: Your2050Vignette,
): Promise<"shared" | "copied" | "canceled"> {
  const payload = getVignetteSharePayload(vignette);

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    const shareData: ShareData = {
      title: payload.title,
      text: payload.text,
      url: payload.url,
    };

    const canShare =
      typeof navigator.canShare !== "function" || navigator.canShare(shareData);

    if (canShare) {
      try {
        await navigator.share(shareData);
        return "shared";
      } catch (error) {
        if (isShareCanceled(error)) return "canceled";
      }
    }
  }

  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(payload.text);
    return "copied";
  }

  throw new Error("Sharing is not supported in this browser.");
}
