import type { EraId } from "@/content/timeline";

/** Curated, portrait-first faces for the homepage teaser, keep this short. */
export const HOME_FEATURED_ICON_IDS = [
  "funmilayo-ransome-kuti",
  "nnamdi-azikiwe",
  "chinua-achebe",
  "wole-soyinka",
  "fela-kuti",
  "ngozi-okonjo-iweala",
  "aliko-dangote",
  "burna-boy",
] as const;

/** Four faces per era on the timeline. */
export const ERA_FEATURED_ICON_IDS: Record<EraId, readonly string[]> = {
  "pre-colonial": ["olaudah-equiano", "efunroye-tinubu", "ovonramwen", "jaja-of-opobo"],
  colonial: ["samuel-ajayi-crowther", "herbert-macaulay", "funmilayo-ransome-kuti", "margaret-ekpo"],
  independence: ["nnamdi-azikiwe", "obafemi-awolowo", "ahmadu-bello", "tafawa-balewa"],
  "first-republic": ["anthony-enahoro", "aminu-kano", "jaja-wachuku", "tai-solarin"],
  "civil-war": ["yakubu-gowon", "chinua-achebe", "christopher-okigbo", "wole-soyinka"],
  "military-rule": ["murtala-muhammed", "fela-kuti", "gani-fawehinmi", "shehu-shagari"],
  democracy: ["olusegun-obasanjo", "ngozi-okonjo-iweala", "goodluck-jonathan", "chimamanda-adichie"],
  reform: ["aliko-dangote", "burna-boy", "asisat-oshoala", "tobi-amusan"],
};
