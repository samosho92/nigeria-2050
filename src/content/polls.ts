import { NIGERIA_MAP_REGIONS } from "@/content/nigeria-map";

export type PulseCategoryId =
  | "pay"
  | "commute"
  | "meals"
  | "till"
  | "power"
  | "data"
  | "ride"
  | "basket";

export interface PollOption {
  id: string;
  label: string;
}

export interface PulseCategory {
  id: PulseCategoryId;
  wheel: string;
}

export interface PulsePoll {
  id: string;
  category: PulseCategoryId;
  question: string;
  hint: string;
  options: PollOption[];
}

export interface PulseChoice {
  id: string;
  label: string;
}

export const PULSE_MIN_AGE = 18;

export const PULSE_AGES: PulseChoice[] = [
  { id: "18-24", label: "18–24" },
  { id: "25-34", label: "25–34" },
  { id: "35-44", label: "35–44" },
  { id: "45-54", label: "45–54" },
  { id: "55-plus", label: "55+" },
];

export const PULSE_GENDERS: PulseChoice[] = [
  { id: "woman", label: "Woman" },
  { id: "man", label: "Man" },
  { id: "another", label: "Another identity" },
  { id: "skip", label: "Prefer not to say" },
];

export const PULSE_ZONES: PulseChoice[] = [
  ...NIGERIA_MAP_REGIONS.map((region) => ({ id: region.id, label: region.label })),
  { id: "diaspora", label: "Outside Nigeria" },
  { id: "skip", label: "Prefer not to say" },
];

export const PULSE_CATEGORIES: PulseCategory[] = [
  { id: "pay", wheel: "Pay" },
  { id: "commute", wheel: "Commute" },
  { id: "meals", wheel: "Meals" },
  { id: "till", wheel: "Till" },
  { id: "power", wheel: "Power" },
  { id: "data", wheel: "Data" },
  { id: "ride", wheel: "Ride" },
  { id: "basket", wheel: "Basket" },
];

const SKIP: PollOption = { id: "skip", label: "Prefer not to say" };

export const PULSE_POLLS: PulsePoll[] = [
  {
    id: "salary",
    category: "pay",
    question: "How much do you take home in a typical month?",
    hint: "After tax and deductions, in naira. A band is enough.",
    options: [
      { id: "under-50k", label: "Under ₦50,000" },
      { id: "50-99k", label: "₦50,000–₦99,999" },
      { id: "100-199k", label: "₦100,000–₦199,999" },
      { id: "200-499k", label: "₦200,000–₦499,999" },
      { id: "500-999k", label: "₦500,000–₦999,999" },
      { id: "1-3m", label: "₦1m–₦2.99m" },
      { id: "3m-plus", label: "₦3m or more" },
      SKIP,
    ],
  },
  {
    id: "pay-source",
    category: "pay",
    question: "How do you mainly earn that money?",
    hint: "The largest source this month.",
    options: [
      { id: "salary", label: "Salary or wages from one employer" },
      { id: "trade", label: "Trade, shop, or market stall" },
      { id: "gig", label: "Gig, freelance, or daily hire" },
      { id: "farm", label: "Farming or livestock" },
      { id: "remit", label: "Remittance or family support" },
      { id: "mix", label: "A mix of the above" },
    ],
  },
  {
    id: "pay-dependants",
    category: "pay",
    question: "How many people does that income support?",
    hint: "Count anyone who eats or pays bills from it, including you.",
    options: [
      { id: "1", label: "Just me" },
      { id: "2", label: "2 people" },
      { id: "3-4", label: "3–4 people" },
      { id: "5-7", label: "5–7 people" },
      { id: "8-plus", label: "8 or more" },
      SKIP,
    ],
  },
  {
    id: "pay-stretch",
    category: "pay",
    question: "When in the month does the money usually run tight?",
    hint: "A typical month, not a one-off shock.",
    options: [
      { id: "lasts", label: "It lasts the month" },
      { id: "last-week", label: "Tight in the last week" },
      { id: "mid", label: "Tight by mid-month" },
      { id: "first-ten", label: "Tight in the first ten days" },
      SKIP,
    ],
  },
  {
    id: "commute-time",
    category: "commute",
    question: "How long is your one-way commute on a typical workday?",
    hint: "Home to work or school, one direction.",
    options: [
      { id: "none", label: "I work or study from home" },
      { id: "under-30", label: "Under 30 minutes" },
      { id: "30-60", label: "30–60 minutes" },
      { id: "1-2h", label: "1–2 hours" },
      { id: "over-2h", label: "Over 2 hours" },
    ],
  },
  {
    id: "commute-days",
    category: "commute",
    question: "How many days a week do you leave home for work or school?",
    hint: "A typical week.",
    options: [
      { id: "0", label: "0. I stay home." },
      { id: "1-2", label: "1–2 days" },
      { id: "3-4", label: "3–4 days" },
      { id: "5", label: "5 days" },
      { id: "6-7", label: "6–7 days" },
    ],
  },
  {
    id: "commute-cost",
    category: "commute",
    question: "What do you spend on transport on a typical workday?",
    hint: "Fares, fuel, or ride-hail for that day, one person.",
    options: [
      { id: "none", label: "I do not commute" },
      { id: "under-500", label: "Under ₦500" },
      { id: "500-999", label: "₦500–₦999" },
      { id: "1-2k", label: "₦1,000–₦1,999" },
      { id: "2-4k", label: "₦2,000–₦3,999" },
      { id: "4k-plus", label: "₦4,000 or more" },
    ],
  },
  {
    id: "commute-leave",
    category: "commute",
    question: "What time do you usually leave home?",
    hint: "Workday or school day.",
    options: [
      { id: "home", label: "I work or study from home" },
      { id: "before-6", label: "Before 6:00" },
      { id: "6-7", label: "6:00–7:00" },
      { id: "7-8", label: "7:00–8:00" },
      { id: "after-8", label: "After 8:00" },
    ],
  },
  {
    id: "meals",
    category: "meals",
    question: "How much do you spend on meals for yourself on a typical day?",
    hint: "Street food, canteen, cook-at-home ingredients, counted for you alone.",
    options: [
      { id: "under-1k", label: "Under ₦1,000" },
      { id: "1-2.5k", label: "₦1,000–₦2,499" },
      { id: "2.5-5k", label: "₦2,500–₦4,999" },
      { id: "5-10k", label: "₦5,000–₦9,999" },
      { id: "10k-plus", label: "₦10,000 or more" },
    ],
  },
  {
    id: "meals-where",
    category: "meals",
    question: "Where do you eat your main meal on a typical workday?",
    hint: "The meal that fills you most.",
    options: [
      { id: "home", label: "Cooked at home" },
      { id: "buka", label: "Buka, canteen, or street food" },
      { id: "office", label: "Office or school meal" },
      { id: "delivery", label: "Delivery or a sit-down restaurant" },
      { id: "mix", label: "A mix" },
    ],
  },
  {
    id: "meals-cooked",
    category: "meals",
    question: "How many of yesterday's meals did you cook at home?",
    hint: "Breakfast, lunch, dinner. Count a reheated pot as cooked.",
    options: [
      { id: "all", label: "All of them" },
      { id: "two", label: "Two" },
      { id: "one", label: "One" },
      { id: "none", label: "None. I bought food." },
    ],
  },
  {
    id: "meals-protein",
    category: "meals",
    question: "What was the main protein in yesterday's main meal?",
    hint: "The one on the plate, not the snack.",
    options: [
      { id: "fish", label: "Fish" },
      { id: "chicken", label: "Chicken" },
      { id: "red", label: "Beef, goat, or other red meat" },
      { id: "eggs-beans", label: "Eggs or beans" },
      { id: "none", label: "No animal protein or beans yesterday" },
    ],
  },
  {
    id: "pay-method",
    category: "till",
    question: "How do you usually pay at a shop or stall?",
    hint: "The method you reach for first.",
    options: [
      { id: "cash", label: "Cash" },
      { id: "transfer", label: "Bank transfer / USSD" },
      { id: "pos", label: "POS or card" },
      { id: "wallet", label: "Mobile wallet (OPay, PalmPay, and similar)" },
      { id: "mix", label: "A mix, depending on the stall" },
    ],
  },
  {
    id: "till-credit",
    category: "till",
    question: "When you buy something over ₦20,000, how do you usually pay?",
    hint: "Phone, generator, cloth, or a household item at that size.",
    options: [
      { id: "full", label: "The full amount, same day" },
      { id: "parts", label: "Transfer in parts" },
      { id: "bnpl", label: "POS installment or buy-now-pay-later" },
      { id: "borrow", label: "Borrow from family or a cooperative" },
      { id: "wait", label: "I wait until I have it" },
    ],
  },
  {
    id: "till-brand",
    category: "till",
    question: "At the shop, what usually decides the brand you pick?",
    hint: "A typical pack: soap, rice, phone credit, or drink.",
    options: [
      { id: "price", label: "The lowest price" },
      { id: "known", label: "The brand I already know" },
      { id: "seller", label: "What the seller recommends" },
      { id: "ad", label: "What I saw advertised" },
      { id: "stock", label: "Whatever is in stock" },
    ],
  },
  {
    id: "till-discover",
    category: "till",
    question: "How do you usually hear about a new product?",
    hint: "The first place you noticed the last thing you tried.",
    options: [
      { id: "whatsapp", label: "WhatsApp or a status" },
      { id: "social", label: "Instagram, TikTok, or YouTube" },
      { id: "broadcast", label: "Radio or TV" },
      { id: "friend", label: "A friend or the stall" },
      { id: "pack", label: "A poster or the pack on the shelf" },
    ],
  },
  {
    id: "power-backup",
    category: "power",
    question: "What do you spend on generator, inverter, or solar top-up in a typical month?",
    hint: "Fuel, diesel, or the units you buy when the grid is quiet.",
    options: [
      { id: "none", label: "Nothing. I wait for the grid." },
      { id: "under-10k", label: "Under ₦10,000" },
      { id: "10-30k", label: "₦10,000–₦29,999" },
      { id: "30-80k", label: "₦30,000–₦79,999" },
      { id: "80k-plus", label: "₦80,000 or more" },
    ],
  },
  {
    id: "power-grid",
    category: "power",
    question: "How many hours of grid power did you have yesterday?",
    hint: "PHCN / DisCo supply at the place you slept.",
    options: [
      { id: "under-4", label: "Under 4 hours" },
      { id: "4-8", label: "4–8 hours" },
      { id: "8-16", label: "8–16 hours" },
      { id: "16-24", label: "16–24 hours" },
      { id: "unknown", label: "I do not know" },
    ],
  },
  {
    id: "power-charge",
    category: "power",
    question: "How do you usually charge your phone when the grid is off?",
    hint: "The method you used most last week.",
    options: [
      { id: "bank", label: "A power bank charged on the grid" },
      { id: "gen", label: "Generator or inverter at home" },
      { id: "kiosk", label: "A shop or kiosk charge" },
      { id: "neighbour", label: "A neighbour or the office" },
      { id: "wait", label: "I wait for the grid" },
    ],
  },
  {
    id: "power-first",
    category: "power",
    question: "What do you run first when the light comes back?",
    hint: "The switch you reach for.",
    options: [
      { id: "fan", label: "Fan" },
      { id: "ac", label: "Air conditioner" },
      { id: "fridge", label: "Fridge and freezer" },
      { id: "devices", label: "Phone and laptop" },
      { id: "lights", label: "Lights only" },
    ],
  },
  {
    id: "data-spend",
    category: "data",
    question: "What do you spend on mobile data and airtime in a typical month?",
    hint: "Your lines, not the whole household unless you buy for everyone.",
    options: [
      { id: "under-3k", label: "Under ₦3,000" },
      { id: "3-8k", label: "₦3,000–₦7,999" },
      { id: "8-15k", label: "₦8,000–₦14,999" },
      { id: "15-30k", label: "₦15,000–₦29,999" },
      { id: "30k-plus", label: "₦30,000 or more" },
    ],
  },
  {
    id: "data-network",
    category: "data",
    question: "Which network carries most of your data this month?",
    hint: "The SIM you buy bundles on.",
    options: [
      { id: "mtn", label: "MTN" },
      { id: "airtel", label: "Airtel" },
      { id: "glo", label: "Glo" },
      { id: "9mobile", label: "9mobile" },
      { id: "split", label: "I split across two or more" },
    ],
  },
  {
    id: "data-home",
    category: "data",
    question: "How do you get online at home?",
    hint: "The connection you use after work.",
    options: [
      { id: "mobile", label: "Mobile data only" },
      { id: "wifi", label: "Home Wi-Fi (fibre or LTE)" },
      { id: "neighbour", label: "A neighbour's Wi-Fi" },
      { id: "office", label: "Office or campus" },
      { id: "mix", label: "A mix" },
    ],
  },
  {
    id: "data-sims",
    category: "data",
    question: "How many active SIMs do you use?",
    hint: "Lines you topped up this month.",
    options: [
      { id: "1", label: "1" },
      { id: "2", label: "2" },
      { id: "3", label: "3" },
      { id: "4-plus", label: "4 or more" },
    ],
  },
  {
    id: "commute-mode",
    category: "ride",
    question: "How do you usually get around town?",
    hint: "The mode you use most days.",
    options: [
      { id: "walk", label: "Walk" },
      { id: "okada", label: "Okada or keke" },
      { id: "bus", label: "Danfo, BRT, or another bus" },
      { id: "car", label: "Private car or ride-hail" },
      { id: "mix", label: "A mix" },
    ],
  },
  {
    id: "ride-hail",
    category: "ride",
    question: "How often do you use a ride-hail app in a typical week?",
    hint: "Bolt, Uber, inDrive, or similar.",
    options: [
      { id: "never", label: "Never" },
      { id: "1-2", label: "1–2 trips" },
      { id: "3-6", label: "3–6 trips" },
      { id: "daily", label: "Almost daily" },
      { id: "driven", label: "I drive or am driven" },
    ],
  },
  {
    id: "ride-own",
    category: "ride",
    question: "Do you have a vehicle you can use any day?",
    hint: "Car or motorcycle, even if someone else holds the papers.",
    options: [
      { id: "car", label: "Yes, a car" },
      { id: "bike", label: "Yes, a motorcycle" },
      { id: "share", label: "I share one in the household" },
      { id: "no", label: "No" },
    ],
  },
  {
    id: "ride-lastmile",
    category: "ride",
    question: "How do you cover the last stretch from the main road to your door?",
    hint: "The last kilometre on a typical day.",
    options: [
      { id: "walk", label: "Walk" },
      { id: "okada", label: "Okada or keke" },
      { id: "own", label: "My own vehicle" },
      { id: "bus", label: "The bus drops me at the door" },
      { id: "mix", label: "A mix" },
    ],
  },
  {
    id: "grocery-decision",
    category: "basket",
    question: "Who usually decides what the household buys at the market or shop?",
    hint: "Groceries and household staples.",
    options: [
      { id: "me", label: "I do" },
      { id: "partner", label: "My spouse or partner" },
      { id: "shared", label: "We decide together" },
      { id: "elder", label: "A parent or older relative" },
      { id: "alone", label: "I shop only for myself" },
    ],
  },
  {
    id: "basket-where",
    category: "basket",
    question: "Where did you buy most of the household food last week?",
    hint: "By naira spent, not by number of visits.",
    options: [
      { id: "market", label: "Open market" },
      { id: "kiosk", label: "Neighbourhood shop or kiosk" },
      { id: "super", label: "Supermarket" },
      { id: "online", label: "Online (Jumia, Chowdeck, and similar)" },
      { id: "mix", label: "A mix" },
    ],
  },
  {
    id: "basket-switch",
    category: "basket",
    question: "When the usual brand is expensive, what do you do?",
    hint: "Rice, soap, oil, or another staple you buy often.",
    options: [
      { id: "cheaper", label: "Buy a cheaper brand" },
      { id: "smaller", label: "Buy a smaller pack of the usual brand" },
      { id: "promo", label: "Wait for a promo" },
      { id: "same", label: "Buy the usual brand anyway" },
      { id: "skip", label: "Skip that item" },
    ],
  },
  {
    id: "basket-bulk",
    category: "basket",
    question: "How often do you buy a month's staples in one trip?",
    hint: "Rice, oil, garri, or similar dry goods.",
    options: [
      { id: "weekly", label: "Most weeks I buy a little" },
      { id: "fortnight", label: "About twice a month" },
      { id: "monthly", label: "Once a month" },
      { id: "deal", label: "I stock when I see a price drop" },
    ],
  },
];

export const PULSE_META = {
  title: "How Nigeria actually lives",
  eyebrow: "Street Pulse",
  name: "Street Pulse",
  description:
    "Eight questions per round, drawn from a larger pool. Spin, answer, then see how other readers answered. Refresh the page for a new round. Age band, gender, and zone travel with the ballot.",
  profileLead:
    "Three bands, then the wheel. We keep answers in ranges. You must be 18 or older.",
  researchNote:
    "Answers are anonymous. Naija2050 does not sell your personal information.",
  emptyChart: "You are the first on this question. Share the page and come back for a crowd.",
  smallChart: "Treat a small n as a signal. The bars are live votes from this site.",
};

export function getPulseCategory(id: string): PulseCategory | undefined {
  return PULSE_CATEGORIES.find((category) => category.id === id);
}

export function getPulseWheelLabel(poll: PulsePoll): string {
  return getPulseCategory(poll.category)?.wheel ?? poll.category;
}

export function pollsInCategory(categoryId: string): PulsePoll[] {
  return PULSE_POLLS.filter((poll) => poll.category === categoryId);
}

export function unansweredPulsePolls(
  voted: Record<string, string>,
  categoryId?: string,
): PulsePoll[] {
  return PULSE_POLLS.filter((poll) => {
    if (voted[poll.id]) return false;
    if (categoryId && poll.category !== categoryId) return false;
    return true;
  });
}

export const PULSE_SESSION_SIZE = 8;

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

/** Draw up to eight unanswered questions, one from each category when possible. */
export function pickPulseSession(
  voted: Record<string, string>,
  size = PULSE_SESSION_SIZE,
): PulsePoll[] {
  const remaining = unansweredPulsePolls(voted);
  if (remaining.length <= size) return shuffle(remaining);

  const picked: PulsePoll[] = [];
  const used = new Set<string>();

  for (const category of shuffle(PULSE_CATEGORIES)) {
    if (picked.length >= size) break;
    const open = shuffle(unansweredPulsePolls(voted, category.id)).filter((poll) => !used.has(poll.id));
    const poll = open[0];
    if (!poll) continue;
    picked.push(poll);
    used.add(poll.id);
  }

  for (const poll of shuffle(remaining.filter((item) => !used.has(item.id)))) {
    if (picked.length >= size) break;
    picked.push(poll);
    used.add(poll.id);
  }

  return shuffle(picked);
}

export function pickRandomPulsePoll(
  voted: Record<string, string>,
  categoryId?: string,
): PulsePoll | undefined {
  if (categoryId) {
    const open = unansweredPulsePolls(voted, categoryId);
    return open[Math.floor(Math.random() * open.length)];
  }

  const openCategories = PULSE_CATEGORIES.filter(
    (category) => unansweredPulsePolls(voted, category.id).length > 0,
  );
  const category = openCategories[Math.floor(Math.random() * openCategories.length)];
  if (!category) return undefined;
  return pickRandomPulsePoll(voted, category.id);
}

export function getPulsePoll(id: string): PulsePoll | undefined {
  return PULSE_POLLS.find((poll) => poll.id === id);
}

export function isPulsePollId(id: string): boolean {
  return PULSE_POLLS.some((poll) => poll.id === id);
}

export function isPulseOptionId(pollId: string, optionId: string): boolean {
  return getPulsePoll(pollId)?.options.some((option) => option.id === optionId) ?? false;
}

export function isPulseAge(id: string): boolean {
  return PULSE_AGES.some((item) => item.id === id);
}

export function isPulseGender(id: string): boolean {
  return PULSE_GENDERS.some((item) => item.id === id);
}

export function isPulseZone(id: string): boolean {
  return PULSE_ZONES.some((item) => item.id === id);
}
