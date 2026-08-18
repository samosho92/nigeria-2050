import { getPostalCapital } from "@/content/postal-code-engine";

export type Agency = "police" | "fire" | "ambulance";
export type UnitStatus = "available" | "assigned" | "on-scene" | "offline";
export type Speaker = "system" | "taker" | "caller" | "dispatcher" | "unit";
export type PipelineId =
  | "answer"
  | "locate"
  | "classify"
  | "protocol"
  | "assign"
  | "ack"
  | "enroute"
  | "scene"
  | "close";
export type LanguageId = "en" | "pcm" | "ha" | "yo" | "ig";

export const EMERGENCY_STANDARD = {
  number: "112",
  name: "NG-112",
  inspiredBy: "EU 112, US 911",
  answerSeconds: 10,
  ackSeconds: 30,
  nightCallTakersMin: 2,
  dispatcherMin: 1,
} as const;

export const DISPATCH_LANGUAGES: { id: LanguageId; label: string }[] = [
  { id: "en", label: "English" },
  { id: "pcm", label: "Pidgin" },
  { id: "ha", label: "Hausa" },
  { id: "yo", label: "Yoruba" },
  { id: "ig", label: "Igbo" },
];

export const AGENCY_LABEL: Record<Agency, string> = {
  police: "Police",
  fire: "Fire",
  ambulance: "Ambulance",
};

export const UNIT_STATUS_LABEL: Record<UnitStatus, string> = {
  available: "Available",
  assigned: "Assigned",
  "on-scene": "On scene",
  offline: "Offline",
};

/** The desk is a pipeline. Skip a step and you have a hotline, not dispatch. */
export const DISPATCH_PIPELINE: {
  id: PipelineId;
  step: string;
  title: string;
  clock: string;
  owner: string;
  detail: string;
}[] = [
  {
    id: "answer",
    step: "1",
    title: "Answer",
    clock: "0–10 s",
    owner: "Call-taker",
    detail:
      "A trained person picks up. Not an IVR, not a personal mobile, not voicemail. Language is offered in the first sentence: English, Pidgin, Hausa, Yoruba, Igbo.",
  },
  {
    id: "locate",
    step: "2",
    title: "Locate",
    clock: "10–40 s",
    owner: "Call-taker",
    detail:
      "Postal code first, landmark second. Urban: street zone and odd/even side (FC-U01-001 is not the even side). Rural: cluster code plus a named place — the hinterland has no invented street.",
  },
  {
    id: "classify",
    step: "3",
    title: "Classify",
    clock: "with locate",
    owner: "Call-taker",
    detail:
      "Police, fire, ambulance, or more than one. The caller does not have to know the agency. The desk does.",
  },
  {
    id: "protocol",
    step: "4",
    title: "Protocol",
    clock: "while assigning",
    owner: "Call-taker",
    detail:
      "A short card, not a chat. Breathing / conscious; what is burning and whether people are inside; whether anyone is in immediate danger. Stay on the line. Do not turn the caller into the unit.",
  },
  {
    id: "assign",
    step: "5",
    title: "Assign",
    clock: "under 60 s",
    owner: "Dispatcher",
    detail:
      "Nearest capable unit of the right type, on a radio the desk can hear. A phone in someone’s pocket is not a roster.",
  },
  {
    id: "ack",
    step: "6",
    title: "Radio ACK",
    clock: "30 s",
    owner: "Unit",
    detail:
      "The unit says the call sign back. If ACK does not arrive, assign the next unit. Never dump the caller into voicemail while you wait.",
  },
  {
    id: "enroute",
    step: "7",
    title: "En route",
    clock: "ETA on the ticket",
    owner: "Unit",
    detail:
      "The ticket carries the code, the side of the street, and the protocol notes. The unit does not re-interview the caller for the address.",
  },
  {
    id: "scene",
    step: "8",
    title: "On scene",
    clock: "logged",
    owner: "Unit",
    detail:
      "Arrival is a timestamp, not a WhatsApp status. If the unit cannot find the code, that is a postal-layer bug — it goes back to the index, not a lecture for the caller.",
  },
  {
    id: "close",
    step: "9",
    title: "Close",
    clock: "end of job",
    owner: "Dispatcher",
    detail:
      "Outcome code, time stamps, agencies on scene. The public report is weekly medians — not a live map of someone’s emergency.",
  },
];

export const AGENCY_PROTOCOL: Record<
  Agency,
  { title: string; ask: string[]; never: string }
> = {
  ambulance: {
    title: "Ambulance card",
    ask: [
      "Is the person breathing?",
      "Are they conscious?",
      "Confirm the code and the side of the street.",
      "Stay on the line until the unit is with them.",
    ],
    never: "Do not ask the caller to transport the patient unless the unit says so.",
  },
  fire: {
    title: "Fire card",
    ask: [
      "What is burning — building, vehicle, bush?",
      "Is anyone inside, and can they get out?",
      "Confirm the code. Note a water point only if the caller already knows one.",
    ],
    never: "Do not send the caller back in. Do not invent a hydrant that is not on the ticket.",
  },
  police: {
    title: "Police card",
    ask: [
      "Is anyone in immediate danger right now?",
      "Can the caller stay in a safer place?",
      "Confirm the code. Weapons: yes or no — no further detail on the open line unless the unit asks.",
    ],
    never: "The call-taker is not an investigator. Get the unit moving; take a statement later.",
  },
};

export interface LaunchGate {
  nightCallTakers: number;
  dispatchers: number;
  radio: Record<Agency, boolean>;
  postalUrbanLoaded: boolean;
  overflowClusterId: string | null;
  nightVoicemail: boolean;
}

export interface DispatchUnit {
  id: string;
  callSign: string;
  agency: Agency;
  base: string;
  covers: string;
  status: UnitStatus;
  etaMin: number;
}

export interface DispatchCluster {
  id: string;
  capitalId: string;
  psap: string;
  languages: LanguageId[];
  summary: string;
  gate: LaunchGate;
  units: DispatchUnit[];
}

export interface DispatchBeat {
  t: number;
  stage: PipelineId;
  speaker: Speaker;
  line: string;
  unitIds?: string[];
}

export interface DispatchIncident {
  id: string;
  clusterId: string;
  title: string;
  agencies: Agency[];
  language: LanguageId;
  code: string;
  place: string;
  band: "urban" | "periurban" | "rural";
  summary: string;
  beats: DispatchBeat[];
}

export interface ClusterReport {
  clusterId: string;
  weekLabel: string;
  calls: number;
  answerSec: number;
  dispatchSec: number;
  ackPct: number;
  voicemailPct: number;
}

const radioAll: Record<Agency, boolean> = { police: true, fire: true, ambulance: true };

export const DISPATCH_CLUSTERS: DispatchCluster[] = [
  {
    id: "abuja",
    capitalId: "abuja",
    psap: "FCT PSAP — Central Area",
    languages: ["en", "pcm", "ha"],
    summary:
      "Seed cluster. Urban codes are loaded. Night desk has two call-takers and a dispatcher. This is what ‘launched’ means.",
    gate: {
      nightCallTakers: 2,
      dispatchers: 1,
      radio: radioAll,
      postalUrbanLoaded: true,
      overflowClusterId: "ikeja",
      nightVoicemail: false,
    },
    units: [
      {
        id: "fc-pol-1",
        callSign: "FC-POL-01",
        agency: "police",
        base: "Central Area division",
        covers: "FC-U01",
        status: "available",
        etaMin: 6,
      },
      {
        id: "fc-amb-1",
        callSign: "FC-AMB-01",
        agency: "ambulance",
        base: "National Hospital stand-by",
        covers: "FC-U01 / FC-P01",
        status: "available",
        etaMin: 8,
      },
      {
        id: "fc-amb-2",
        callSign: "FC-AMB-02",
        agency: "ambulance",
        base: "Garki clinic",
        covers: "FC-U01",
        status: "on-scene",
        etaMin: 18,
      },
      {
        id: "fc-fir-1",
        callSign: "FC-FIR-01",
        agency: "fire",
        base: "Central Area station",
        covers: "FC-U01",
        status: "available",
        etaMin: 7,
      },
    ],
  },
  {
    id: "ikeja",
    capitalId: "ikeja",
    psap: "Lagos PSAP — Alausa",
    languages: ["en", "pcm", "yo"],
    summary:
      "Busy cluster. Overflow from FCT can land here. Multi-agency tickets are normal; ACK timeouts are not.",
    gate: {
      nightCallTakers: 3,
      dispatchers: 2,
      radio: radioAll,
      postalUrbanLoaded: true,
      overflowClusterId: "abuja",
      nightVoicemail: false,
    },
    units: [
      {
        id: "la-pol-1",
        callSign: "LA-POL-01",
        agency: "police",
        base: "Ikeja division",
        covers: "LA-U01",
        status: "assigned",
        etaMin: 9,
      },
      {
        id: "la-fir-1",
        callSign: "LA-FIR-01",
        agency: "fire",
        base: "Ikeja station",
        covers: "LA-U01",
        status: "available",
        etaMin: 5,
      },
      {
        id: "la-fir-2",
        callSign: "LA-FIR-02",
        agency: "fire",
        base: "Ojodu post",
        covers: "LA-P01",
        status: "available",
        etaMin: 11,
      },
      {
        id: "la-amb-1",
        callSign: "LA-AMB-01",
        agency: "ambulance",
        base: "Ikeja GRA stand-by",
        covers: "LA-U01",
        status: "available",
        etaMin: 7,
      },
    ],
  },
  {
    id: "kano",
    capitalId: "kano",
    psap: "Kano PSAP — Municipal",
    languages: ["ha", "en", "pcm"],
    summary:
      "Hausa first on the night desk. A unit without radio ACK is offline, even if a phone rings in the yard.",
    gate: {
      nightCallTakers: 2,
      dispatchers: 1,
      radio: { police: true, fire: false, ambulance: true },
      postalUrbanLoaded: true,
      overflowClusterId: "abuja",
      nightVoicemail: false,
    },
    units: [
      {
        id: "kn-pol-1",
        callSign: "KN-POL-01",
        agency: "police",
        base: "Municipal division",
        covers: "KN-U01",
        status: "available",
        etaMin: 7,
      },
      {
        id: "kn-amb-1",
        callSign: "KN-AMB-01",
        agency: "ambulance",
        base: "Murtala Mohammed Specialist stand-by",
        covers: "KN-U01",
        status: "available",
        etaMin: 9,
      },
      {
        id: "kn-fir-1",
        callSign: "KN-FIR-01",
        agency: "fire",
        base: "Sabon Gari post",
        covers: "KN-U01",
        status: "offline",
        etaMin: 14,
      },
    ],
  },
  {
    id: "enugu",
    capitalId: "enugu",
    psap: "Enugu PSAP — Independence Layout",
    languages: ["ig", "en", "pcm"],
    summary: "Igbo first. Urban walk is short; the desk still needs the code, not ‘by Shoprite’.",
    gate: {
      nightCallTakers: 2,
      dispatchers: 1,
      radio: radioAll,
      postalUrbanLoaded: true,
      overflowClusterId: "port-harcourt",
      nightVoicemail: false,
    },
    units: [
      {
        id: "en-pol-1",
        callSign: "EN-POL-01",
        agency: "police",
        base: "Independence Layout",
        covers: "EN-U01",
        status: "available",
        etaMin: 6,
      },
      {
        id: "en-amb-1",
        callSign: "EN-AMB-01",
        agency: "ambulance",
        base: "UNTH stand-by",
        covers: "EN-U01",
        status: "available",
        etaMin: 10,
      },
      {
        id: "en-fir-1",
        callSign: "EN-FIR-01",
        agency: "fire",
        base: "Ogui station",
        covers: "EN-U01",
        status: "available",
        etaMin: 8,
      },
    ],
  },
  {
    id: "port-harcourt",
    capitalId: "port-harcourt",
    psap: "Rivers PSAP — GRA",
    languages: ["en", "pcm", "ig"],
    summary: "Industrial and GRA tickets share one desk. Fire and ambulance often ride together.",
    gate: {
      nightCallTakers: 2,
      dispatchers: 1,
      radio: radioAll,
      postalUrbanLoaded: true,
      overflowClusterId: "enugu",
      nightVoicemail: false,
    },
    units: [
      {
        id: "ph-pol-1",
        callSign: "PH-POL-01",
        agency: "police",
        base: "GRA division",
        covers: "RI-U01",
        status: "available",
        etaMin: 8,
      },
      {
        id: "ph-fir-1",
        callSign: "PH-FIR-01",
        agency: "fire",
        base: "Aba Road station",
        covers: "RI-U01",
        status: "available",
        etaMin: 6,
      },
      {
        id: "ph-amb-1",
        callSign: "PH-AMB-01",
        agency: "ambulance",
        base: "UPTH stand-by",
        covers: "RI-U01",
        status: "available",
        etaMin: 9,
      },
    ],
  },
  {
    id: "maiduguri",
    capitalId: "maiduguri",
    psap: "Borno PSAP — not published",
    languages: ["ha", "en"],
    summary:
      "The number is not on air. Night staffing is a phone that goes to voicemail. 112 stays dark until the gate passes — a silent line is worse than no campaign.",
    gate: {
      nightCallTakers: 0,
      dispatchers: 0,
      radio: { police: false, fire: false, ambulance: false },
      postalUrbanLoaded: true,
      overflowClusterId: "abuja",
      nightVoicemail: true,
    },
    units: [
      {
        id: "bo-amb-1",
        callSign: "BO-AMB-01",
        agency: "ambulance",
        base: "Metropolitan clinic — phone only",
        covers: "BO-U01",
        status: "offline",
        etaMin: 25,
      },
      {
        id: "bo-pol-1",
        callSign: "BO-POL-01",
        agency: "police",
        base: "Metropolitan division — no radio desk",
        covers: "BO-U01",
        status: "offline",
        etaMin: 20,
      },
    ],
  },
];

export const DISPATCH_INCIDENTS: DispatchIncident[] = [
  {
    id: "abj-med",
    clusterId: "abuja",
    title: "Collapse on Independence Avenue (odd)",
    agencies: ["ambulance"],
    language: "en",
    code: "FC-U01-001",
    place: "Independence Avenue (odd)",
    band: "urban",
    summary: "Clean path. Code is on the ticket. One ambulance ACKs. This is the boring success the system is for.",
    beats: [
      {
        t: 0,
        stage: "answer",
        speaker: "system",
        line: "Inbound 112 · FCT PSAP · night desk staffed (2 call-takers, 1 dispatcher).",
      },
      {
        t: 4,
        stage: "answer",
        speaker: "taker",
        line: "112, English, Pidgin, or Hausa — I can take any. What is the emergency?",
      },
      {
        t: 9,
        stage: "locate",
        speaker: "caller",
        line: "Someone collapsed on Independence Avenue, the odd side, toward Eagle Square.",
      },
      {
        t: 18,
        stage: "locate",
        speaker: "taker",
        line: "That is FC-U01-001 — Independence Avenue, odd plots. I am not using the mosque as the address.",
      },
      {
        t: 24,
        stage: "classify",
        speaker: "taker",
        line: "Ambulance. Stay on this line. Are they breathing? Are they conscious?",
      },
      {
        t: 31,
        stage: "protocol",
        speaker: "caller",
        line: "Breathing, not talking. I will not hang up.",
      },
      {
        t: 36,
        stage: "assign",
        speaker: "dispatcher",
        line: "FC-AMB-01, job FC-U01-001, odd side, collapse, breathing, not conscious. ACK.",
        unitIds: ["fc-amb-1"],
      },
      {
        t: 44,
        stage: "ack",
        speaker: "unit",
        line: "FC-AMB-01 ACK. Eight minutes. Do not move them unless the airway is blocked.",
        unitIds: ["fc-amb-1"],
      },
      {
        t: 50,
        stage: "enroute",
        speaker: "system",
        line: "Ticket carries the code and the protocol notes. The unit does not call the caller back for directions.",
        unitIds: ["fc-amb-1"],
      },
      {
        t: 530,
        stage: "scene",
        speaker: "unit",
        line: "FC-AMB-01 on scene, FC-U01-001, odd. Patient with us.",
        unitIds: ["fc-amb-1"],
      },
      {
        t: 560,
        stage: "close",
        speaker: "dispatcher",
        line: "Close: ambulance on scene, 8 min travel. Answer 4 s. ACK 8 s. No voicemail.",
        unitIds: ["fc-amb-1"],
      },
    ],
  },
  {
    id: "ike-fire",
    clusterId: "ikeja",
    title: "Shop fire on Allen Avenue",
    agencies: ["fire", "ambulance"],
    language: "yo",
    code: "LA-U01-003",
    place: "Allen Avenue",
    band: "urban",
    summary: "Multi-agency. First fire ACK is late — the desk assigns the next appliance, then the ambulance. The caller stays on the line.",
    beats: [
      {
        t: 0,
        stage: "answer",
        speaker: "system",
        line: "Inbound 112 · Lagos PSAP Alausa · Yoruba offered first.",
      },
      {
        t: 6,
        stage: "answer",
        speaker: "taker",
        line: "112, Yorùbá tàbí English. Kí ló ṣẹlẹ̀? What is burning?",
      },
      {
        t: 14,
        stage: "locate",
        speaker: "caller",
        line: "Allen Avenue, a shop, smoke, people running. Near Opebi.",
      },
      {
        t: 22,
        stage: "locate",
        speaker: "taker",
        line: "LA-U01-003 — Allen Avenue, both sides. I have the street zone. Are people still inside?",
      },
      {
        t: 30,
        stage: "classify",
        speaker: "taker",
        line: "Fire and ambulance. Do not go back in. Stay on the line.",
      },
      {
        t: 38,
        stage: "assign",
        speaker: "dispatcher",
        line: "LA-FIR-01, Allen Avenue LA-U01-003, shop fire, people reported inside. ACK in 30 seconds.",
        unitIds: ["la-fir-1"],
      },
      {
        t: 72,
        stage: "ack",
        speaker: "system",
        line: "No ACK from LA-FIR-01 at 30 s. Not voicemail — next unit. LA-FIR-02 assigned.",
        unitIds: ["la-fir-2"],
      },
      {
        t: 80,
        stage: "ack",
        speaker: "unit",
        line: "LA-FIR-02 ACK. Eleven minutes from Ojodu. Ambulance with us?",
        unitIds: ["la-fir-2"],
      },
      {
        t: 86,
        stage: "assign",
        speaker: "dispatcher",
        line: "LA-AMB-01, same code, smoke inhalation stand-by. ACK.",
        unitIds: ["la-fir-2", "la-amb-1"],
      },
      {
        t: 93,
        stage: "ack",
        speaker: "unit",
        line: "LA-AMB-01 ACK. Seven minutes.",
        unitIds: ["la-fir-2", "la-amb-1"],
      },
      {
        t: 740,
        stage: "scene",
        speaker: "unit",
        line: "LA-FIR-02 on scene. Shop alight, one person out, ambulance taking over.",
        unitIds: ["la-fir-2", "la-amb-1"],
      },
      {
        t: 780,
        stage: "close",
        speaker: "dispatcher",
        line: "Close: fire + ambulance. First appliance missed ACK; second took the job. That miss is a roster problem, not a reason to keep 112 silent.",
        unitIds: ["la-fir-2", "la-amb-1"],
      },
    ],
  },
  {
    id: "kn-police",
    clusterId: "kano",
    title: "Fight on France Road",
    agencies: ["police"],
    language: "ha",
    code: "KN-U01-005",
    place: "France Road",
    band: "urban",
    summary: "Hausa desk. Fire radio is down in this cluster — police still launch because the gate needs a radio on the agency you are sending, not every appliance in the yard.",
    beats: [
      {
        t: 0,
        stage: "answer",
        speaker: "system",
        line: "Inbound 112 · Kano PSAP · Hausa first. Fire radio is offline tonight; police and ambulance radios are up.",
      },
      {
        t: 5,
        stage: "answer",
        speaker: "taker",
        line: "112, Hausa ko English. Me ya faru?",
      },
      {
        t: 12,
        stage: "locate",
        speaker: "caller",
        line: "France Road, Sabon Gari, a fight, people running.",
      },
      {
        t: 20,
        stage: "locate",
        speaker: "taker",
        line: "KN-U01-005 — France Road, both sides, market streets. You do not need to name a stall.",
      },
      {
        t: 28,
        stage: "classify",
        speaker: "taker",
        line: "Police. Is anyone in immediate danger right now? Can you move to a safer place?",
      },
      {
        t: 36,
        stage: "protocol",
        speaker: "caller",
        line: "I have moved. No weapons that I saw. I will stay on the line.",
      },
      {
        t: 42,
        stage: "assign",
        speaker: "dispatcher",
        line: "KN-POL-01, France Road KN-U01-005, fight, caller clear of the crowd. ACK.",
        unitIds: ["kn-pol-1"],
      },
      {
        t: 49,
        stage: "ack",
        speaker: "unit",
        line: "KN-POL-01 ACK. Seven minutes.",
        unitIds: ["kn-pol-1"],
      },
      {
        t: 55,
        stage: "enroute",
        speaker: "taker",
        line: "Stay where you are. The unit has the code. I am not taking a full statement on this line.",
        unitIds: ["kn-pol-1"],
      },
      {
        t: 470,
        stage: "scene",
        speaker: "unit",
        line: "KN-POL-01 on scene, France Road. Crowd dispersing.",
        unitIds: ["kn-pol-1"],
      },
      {
        t: 500,
        stage: "close",
        speaker: "dispatcher",
        line: "Close: police only. Fire stayed offline and was not assigned. A dark fire radio is a launch-gate problem for fire jobs, not for this ticket.",
        unitIds: ["kn-pol-1"],
      },
    ],
  },
  {
    id: "abj-rural",
    clusterId: "abuja",
    title: "Kwali hinterland — no street zone",
    agencies: ["ambulance"],
    language: "pcm",
    code: "FC-R04-027",
    place: "Kwali hinterland",
    band: "rural",
    summary: "Rural cluster code. There is no odd/even street until roads are gazetted. The desk locates a settlement, not a plot, and the ETA is honest.",
    beats: [
      {
        t: 0,
        stage: "answer",
        speaker: "system",
        line: "Inbound 112 · FCT PSAP · Pidgin. Caller is outside the urban band.",
      },
      {
        t: 6,
        stage: "answer",
        speaker: "taker",
        line: "112, how far? Talk Pidgin if e easy. Where you dey?",
      },
      {
        t: 16,
        stage: "locate",
        speaker: "caller",
        line: "Kwali side, after the unnumbered compounds. No street name. Person no dey breathe well.",
      },
      {
        t: 28,
        stage: "locate",
        speaker: "taker",
        line: "FC-R04-027 — Kwali hinterland cluster. No street zone on the index. I will pin the settlement, not invent a road.",
      },
      {
        t: 40,
        stage: "classify",
        speaker: "taker",
        line: "Ambulance. Are they breathing? Conscious? Stay on this line. Do not put them on a bike unless the unit says so.",
      },
      {
        t: 52,
        stage: "protocol",
        speaker: "caller",
        line: "Breathing small. Conscious. I dey wait.",
      },
      {
        t: 60,
        stage: "assign",
        speaker: "dispatcher",
        line: "FC-AMB-01, rural cluster FC-R04-027, Kwali hinterland, breathing laboured. ETA will be longer than Central Area. ACK.",
        unitIds: ["fc-amb-1"],
      },
      {
        t: 70,
        stage: "ack",
        speaker: "unit",
        line: "FC-AMB-01 ACK. Twenty-five minutes if the laterite holds. Need a person at the junction.",
        unitIds: ["fc-amb-1"],
      },
      {
        t: 80,
        stage: "enroute",
        speaker: "taker",
        line: "Send someone to the junction the unit already knows from the cluster map. The code does not get more precise until the street is gazetted.",
        unitIds: ["fc-amb-1"],
      },
      {
        t: 1580,
        stage: "scene",
        speaker: "unit",
        line: "FC-AMB-01 on scene, Kwali cluster. Patient with us.",
        unitIds: ["fc-amb-1"],
      },
      {
        t: 1620,
        stage: "close",
        speaker: "dispatcher",
        line: "Close: ambulance, rural. Locate used a cluster code, not a landmark story. Long ETA is logged, not hidden. This is why the postal rural band exists.",
        unitIds: ["fc-amb-1"],
      },
    ],
  },
];

export const CLUSTER_REPORTS: ClusterReport[] = [
  { clusterId: "abuja", weekLabel: "Illustrative week", calls: 412, answerSec: 6, dispatchSec: 38, ackPct: 96, voicemailPct: 0 },
  { clusterId: "ikeja", weekLabel: "Illustrative week", calls: 890, answerSec: 8, dispatchSec: 44, ackPct: 91, voicemailPct: 0 },
  { clusterId: "kano", weekLabel: "Illustrative week", calls: 360, answerSec: 7, dispatchSec: 41, ackPct: 93, voicemailPct: 0 },
  { clusterId: "enugu", weekLabel: "Illustrative week", calls: 210, answerSec: 5, dispatchSec: 36, ackPct: 97, voicemailPct: 0 },
  { clusterId: "port-harcourt", weekLabel: "Illustrative week", calls: 275, answerSec: 7, dispatchSec: 40, ackPct: 94, voicemailPct: 0 },
];

export function getDispatchCluster(id: string): DispatchCluster | undefined {
  return DISPATCH_CLUSTERS.find((cluster) => cluster.id === id);
}

export function incidentsForCluster(clusterId: string): DispatchIncident[] {
  return DISPATCH_INCIDENTS.filter((incident) => incident.clusterId === clusterId);
}

export function dispatchSeedIds(): string[] {
  return DISPATCH_CLUSTERS.map((cluster) => cluster.capitalId);
}

export function languageLabel(id: LanguageId): string {
  return DISPATCH_LANGUAGES.find((item) => item.id === id)?.label ?? id;
}

export function clusterCityName(cluster: DispatchCluster): string {
  return getPostalCapital(cluster.capitalId)?.capital ?? cluster.capitalId;
}

export interface LaunchVerdict {
  ok: boolean;
  blockers: string[];
}

export function launchVerdict(cluster: DispatchCluster): LaunchVerdict {
  const blockers: string[] = [];
  const { gate } = cluster;
  if (gate.nightVoicemail) blockers.push("Night line goes to voicemail");
  if (gate.nightCallTakers < EMERGENCY_STANDARD.nightCallTakersMin) {
    blockers.push(`Night call-takers ${gate.nightCallTakers} (need ${EMERGENCY_STANDARD.nightCallTakersMin})`);
  }
  if (gate.dispatchers < EMERGENCY_STANDARD.dispatcherMin) {
    blockers.push("No dispatcher on the night desk");
  }
  if (!gate.postalUrbanLoaded) blockers.push("Urban postal codes not loaded");
  const radioDown = (Object.keys(gate.radio) as Agency[]).filter((agency) => !gate.radio[agency]);
  if (radioDown.length === 3) blockers.push("No agency has a radio the desk can hear");
  return { ok: blockers.length === 0, blockers };
}

export function nearestCapable(cluster: DispatchCluster, agency: Agency): DispatchUnit | undefined {
  return cluster.units.find((unit) => unit.agency === agency && unit.status === "available" && cluster.gate.radio[agency]);
}

export function reportFor(clusterId: string): ClusterReport | undefined {
  return CLUSTER_REPORTS.find((row) => row.clusterId === clusterId);
}

export function formatBeatClock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
