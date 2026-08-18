import type { SectorQuiz } from "@/types/content";

export const SECTOR_QUIZZES: SectorQuiz[] = [
  {
    sectorSlug: "economy",
    title: "Economy check",
    questions: [
      {
        id: "eco-1",
        prompt: "Roughly what share of Nigeria's exports is oil today?",
        options: ["About 25%", "About 55%", "About 85%", "About 95%"],
        correctIndex: 2,
        explanation: "Oil still dominates export earnings at roughly 85%, which is why diversification is central to 2050 scenarios.",
      },
    ],
  },
  {
    sectorSlug: "agriculture",
    title: "Agriculture check",
    questions: [
      {
        id: "agr-1",
        prompt: "Colonial agriculture policy primarily pushed farmers toward:",
        options: ["Food self-sufficiency", "Export cash crops", "Mechanized wheat", "Organic farming"],
        correctIndex: 1,
        explanation: "Colonial administrators prioritized cocoa, groundnuts, palm products, and cotton for export markets.",
      },
    ],
  },
  {
    sectorSlug: "healthcare",
    title: "Healthcare check",
    questions: [
      {
        id: "hea-1",
        prompt: "Nigeria's 2050 base case targets life expectancy of roughly:",
        options: ["58 years", "68 years", "78 years", "88 years"],
        correctIndex: 1,
        explanation: "The healthcare sector base case projects life expectancy reaching about 68 years by 2050.",
      },
    ],
  },
  {
    sectorSlug: "transportation",
    title: "Transportation check",
    questions: [
      {
        id: "tra-1",
        prompt: "Colonial railways in Nigeria were built primarily to:",
        options: [
          "Connect regions to each other",
          "Move export crops from the interior to ports",
          "Serve daily urban commuters",
          "Link West African capitals",
        ],
        correctIndex: 1,
        explanation:
          "Rails ran from cash-crop belts to the coast. The 2050 transportation case is to invert that map with a north–south freight-and-passenger spine.",
      },
    ],
  },
];

export function getSectorQuiz(sectorSlug: string): SectorQuiz | undefined {
  return SECTOR_QUIZZES.find((quiz) => quiz.sectorSlug === sectorSlug);
}
