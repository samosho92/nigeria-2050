export const VIGNETTE_SEASON_IDS = ["rainy", "dry", "harmattan"] as const;

export type VignetteSeasonId = (typeof VIGNETTE_SEASON_IDS)[number];

export interface VignetteSeason {
  id: VignetteSeasonId;
  label: string;
  hint: string;
}

export interface VignetteCityWeather {
  title: string;
  dawn: string;
  air: string;
  evening: string;
}

export interface VignetteCity {
  id: string;
  name: string;
  region: string;
  climate: string;
  weather: Record<VignetteSeasonId, VignetteCityWeather>;
}

export const VIGNETTE_SEASONS: VignetteSeason[] = [
  {
    id: "rainy",
    label: "Rainy season",
    hint: "Thunder, wet earth, the long green months",
  },
  {
    id: "dry",
    label: "Dry season",
    hint: "Hard sun, long shadows, heat that has a name",
  },
  {
    id: "harmattan",
    label: "Harmattan",
    hint: "Saharan dust, pale mornings, a borrowed cold",
  },
];

export const VIGNETTE_CITIES: VignetteCity[] = [
  {
    id: "lagos",
    name: "Lagos",
    region: "the Atlantic edge",
    climate: "humid coastal heat, lagoon weather, rain that arrives like a verdict",
    weather: {
      rainy: {
        title: "Rain over Lagos",
        dawn: "Rain has been falling since before the first call to prayer, the warm Atlantic kind that smells of lagoon and wet concrete.",
        air: "Humidity sits on the skin like a second shirt. Gutters talk. The Third Mainland shines as if someone polished it in the night.",
        evening: "Evening rain thins to a drizzle. Streetlights stutter on and then hold. The lagoon goes the colour of old tin.",
      },
      dry: {
        title: "A dry-season morning in Lagos",
        dawn: "No rain, for once. The lagoon lies flat and bright. Heat arrives early, clean and unapologetic.",
        air: "The air tastes of salt and exhaust that has learned manners. Hawker smoke lifts and disappears. Glare lives on every windscreen.",
        evening: "Dusk is a slow gold over the water. The city exhales. Fans keep working as if they had always been entitled to.",
      },
      harmattan: {
        title: "Harmattan on the lagoon",
        dawn: "A Lagos harmattan, rare enough to feel like a guest. The sky is pale. Dust sits on bonnets and on the tongues of leaves.",
        air: "The morning is almost cool. People wear sleeves they forgot they owned. The lagoon looks like hammered metal.",
        evening: "The sun drops red and tired. Harmattan light makes even the flyovers look older, and somehow kinder.",
      },
    },
  },
  {
    id: "abuja",
    name: "Abuja",
    region: "the central hills",
    climate: "laterite and wide sky, a capital that still remembers village dust",
    weather: {
      rainy: {
        title: "Rain on the laterite",
        dawn: "Clouds stack over the hills. The first rain turns the earth the colour of fresh rust. Abuja smells of wet grass and warm stone.",
        air: "Aso Rock goes in and out of the weather like a thought. The avenues shine. Termites click in the soaked ground.",
        evening: "The storm passes. Frogs start up. The city, for an hour, sounds like the land it was built on.",
      },
      dry: {
        title: "Hard sun over Abuja",
        dawn: "The sky is a clean, merciless blue. Heat shimmers above the dual carriageways before most offices have opened.",
        air: "Laterite dust powders the bougainvillea. Shade is a civic resource. The hills sit sharp and close.",
        evening: "The sun drops behind the rock. The air cools just enough to walk without bargaining with it.",
      },
      harmattan: {
        title: "Harmattan haze over Aso",
        dawn: "The capital wakes inside a white hush. Aso Rock is a rumour in the haze. Breath shows, briefly, like a secret.",
        air: "Dust from the Sahara has travelled this far and made itself at home. Lips chap. The city moves a little slower, as if listening.",
        evening: "Streetlights make cones in the powdery air. Harmattan evenings in Abuja feel borrowed from a northern town.",
      },
    },
  },
  {
    id: "kano",
    name: "Kano",
    region: "the Sahel edge",
    climate: "dry heat, millet country, rain that is a guest and dust that is family",
    weather: {
      rainy: {
        title: "The short rains in Kano",
        dawn: "Rain, sudden and serious, walks the old city walls. Steam lifts off the dye pits as if the ground itself were breathing.",
        air: "Green arrives overnight on land that had been the colour of bone. The air is sweet, brief, almost shy.",
        evening: "The storm has spent itself. Puddles hold the last of the sky. Millet fields drink like people who remember thirst.",
      },
      dry: {
        title: "White heat in Kano",
        dawn: "The sun is already a blade. In the shade of the walls, the city keeps its cool the way it always has: slowly, with dignity.",
        air: "Goats pick through the last dry grass. Indigo and dust share the same light. Heat has a taste, metallic and old.",
        evening: "Evening is a mercy. The call to prayer moves through warm brick. Stars come out as if they had been waiting for permission.",
      },
      harmattan: {
        title: "Harmattan in the old city",
        dawn: "The Sahara has come down to the streets. A cold you can see. Scarves, closed windows, the sun a dull orange coin.",
        air: "Dust lives in the throat. Fingertips dry. The dye pits look ancient, which they are, and new, which they also are.",
        evening: "Fires are lit earlier. The haze turns the city into a woodcut. You walk with your chin in your collar and do not mind.",
      },
    },
  },
  {
    id: "port-harcourt",
    name: "Port Harcourt",
    region: "the Niger Delta",
    climate: "mangrove rain, river humidity, green so dark it is almost black",
    weather: {
      rainy: {
        title: "Delta rain",
        dawn: "Rain on mangrove, rain on zinc, rain on the Bonny river as if the sky had a contract it refuses to break.",
        air: "The air is thick enough to lean on. Palm fronds shine. Somewhere a creek is louder than the road.",
        evening: "Night comes early under cloud. Frogs, generators that no longer need to shout, water finding every low place.",
      },
      dry: {
        title: "A clearer Delta morning",
        dawn: "The rain has stepped back, not gone. Humidity remains, a loyal relative. The river smells of mud and distant salt.",
        air: "Light finally reaches the water hyacinth. Canoes move. The city feels briefly unburdened.",
        evening: "Clouds return as a rumour. The heat stays. You eat outside because you can, and because the air asks you to.",
      },
      harmattan: {
        title: "A thin harmattan on the creeks",
        dawn: "Even the Delta feels the dust, a light powder on leaves that usually only know rain. The morning is almost mild.",
        air: "Haze softens the refinery silhouettes. The humidity and the dryness argue, and neither wins.",
        evening: "A strange cool sits on the water. People mention it to each other, the way they mention a guest who might not stay.",
      },
    },
  },
  {
    id: "enugu",
    name: "Enugu",
    region: "the coal-city hills",
    climate: "escarpment weather, thunderstorms, air that remembers rainforest",
    weather: {
      rainy: {
        title: "Thunder over Enugu",
        dawn: "The hills go green-black. Thunder walks the escarpment. Rain arrives with the confidence of an old resident.",
        air: "Coal-city air, washed. Gutters run red with hill soil. The whole town smells of wet mango leaves.",
        evening: "After the storm, the hills look newly made. Lights come on in terraces. Crickets take the night shift.",
      },
      dry: {
        title: "Clear hills, Enugu",
        dawn: "The escarpment is sharp enough to cut the morning. Harmless sun. A breeze that feels like it studied geography.",
        air: "Dust on the older roads, clarity on the ridges. You can see farther than the city usually allows.",
        evening: "The hills hold the last light. Children play later. The air cools the way a well-built house cools.",
      },
      harmattan: {
        title: "Harmattan on the escarpment",
        dawn: "A dry cold comes down the hills. The city wears it like a borrowed jacket. Smoke from kitchens hangs low.",
        air: "The sky is white-blue. Lips crack. The coal-city silhouettes look drawn in charcoal, which is only fair.",
        evening: "Sweaters, surprising and a little proud. The harmattan makes Enugu feel like a place that can keep a secret.",
      },
    },
  },
  {
    id: "jos",
    name: "Jos",
    region: "the plateau",
    climate: "high cool air, mist, weather that other Nigerians treat as a myth",
    weather: {
      rainy: {
        title: "Cold rain on the plateau",
        dawn: "Rain on Jos is not a joke. It is cold in a country that rarely is. Mist sits in the rocks as if it paid rent.",
        air: "You want a sweater and you are not performing. Eucalyptus drip. The plateau smells of wet stone and woodsmoke.",
        evening: "The rain turns to a fine, stubborn mist. Windows close. The city feels closer to itself.",
      },
      dry: {
        title: "Bright and cool in Jos",
        dawn: "A dry-season morning on the plateau: light like glass, air you can drink. The rocks keep last night's cold.",
        air: "Sun without the usual punishment. Traders sell things that steam. You walk farther than you meant to.",
        evening: "The temperature drops with theatre. Stars over the tin-mining hills. A jacket becomes a civic fact.",
      },
      harmattan: {
        title: "Plateau harmattan",
        dawn: "Breath shows. This is not a metaphor. The harmattan on Jos is a country visiting another country.",
        air: "Dust and cold in the same lungful. The sun is bright and unhelpful. Fingers ache around a cup.",
        evening: "People linger near kitchens. The haze makes the rocks look lunar. You sleep under a blanket and believe it.",
      },
    },
  },
  {
    id: "ibadan",
    name: "Ibadan",
    region: "the forest-savannah hinge",
    climate: "rusted roofs, dense trees, rain that knows every courtyard",
    weather: {
      rainy: {
        title: "Rain on rusted roofs",
        dawn: "Ibadan takes rain personally. Zinc roofs drum. The old trees drip into courtyards that have heard this song for a century.",
        air: "The city smells of wet earth and woodsmoke and something frying. Hills hide and then return.",
        evening: "Thunder loosens its shoulders. Puddles hold the last orange. The brown roofs go almost black.",
      },
      dry: {
        title: "Dry light over Ibadan",
        dawn: "The trees look dusted. Heat gathers in the bowls between hills. A radio somewhere is already arguing.",
        air: "Brown grass at the city's edge. Cocoa-coloured roofs hold the sun. The air is thick, familiar, unfancy.",
        evening: "The hills keep a little cool. People sit outside because the houses remember how to breathe.",
      },
      harmattan: {
        title: "Harmattan over the seven hills",
        dawn: "A pale wash over Ibadan. The hills are suggestions. Dust on the rust, dust on the leaves, dust in the first greeting.",
        air: "Cool enough for a long sleeve. The city, usually loud with green, looks sketched.",
        evening: "Woodsmoke and harmattan become the same colour. You walk home along a ridge and see the city as a single thought.",
      },
    },
  },
  {
    id: "maiduguri",
    name: "Maiduguri",
    region: "the far north",
    climate: "Sahel light, a short rain, wind that has crossed deserts to get here",
    weather: {
      rainy: {
        title: "The Sahel drinks",
        dawn: "Rain in Maiduguri is an event with witnesses. The ground darkens as if ink had been spilled on purpose.",
        air: "Steam, then sweetness. Children in the wet. The city remembers that the land can still surprise it.",
        evening: "The rain has gone as fast as it came. Puddles hold a sky that will be dry again by morning, and nobody wastes the hour.",
      },
      dry: {
        title: "Sahel dry season",
        dawn: "Light like a clean knife. Long shadows. The air is honest about how little water it is carrying.",
        air: "Heat builds without humidity's cushion. Shade is strategy. The horizon is a straight line with opinions.",
        evening: "The heat lets go all at once. Stars over the Borno plain. You can walk, and the walking feels like a recovered right.",
      },
      harmattan: {
        title: "Dust over Maiduguri",
        dawn: "The wind arrives with the desert still in its mouth. A cold that startles. The sun is a coin lost in milk.",
        air: "Cloth over faces, not from fear. From weather. The city moves inside the dust the way fish move inside a river.",
        evening: "Fires, tea, a redness at the edge of the world. Harmattan nights here are older than the country.",
      },
    },
  },
];

export function getVignetteCity(id: string): VignetteCity {
  return VIGNETTE_CITIES.find((city) => city.id === id) ?? VIGNETTE_CITIES[0];
}

export function getVignetteSeason(id: string): VignetteSeason {
  return VIGNETTE_SEASONS.find((season) => season.id === id) ?? VIGNETTE_SEASONS[0];
}
