export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_META = {
  eyebrow: "Help",
  title: "Frequently asked questions",
  description:
    "Quick answers about how to use Naija2050, what the numbers mean, and how your responses are handled.",
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Naija2050?",
    answer:
      "Naija2050 is a public learning site about Nigeria's past and possible futures. It combines history, sector pages, and interactive tools so people can explore ideas to 2050.",
  },
  {
    question: "Are these predictions guaranteed to happen?",
    answer:
      "No. The 2050 figures are scenarios. They show what could happen under stated assumptions.",
  },
  {
    question: "Where do your numbers come from?",
    answer:
      "Each page links to sources. You can open the Sources page to see where each key figure came from.",
  },
  {
    question: "How should I use this site?",
    answer:
      "Start with Timeline for context, then open Sectors to compare where Nigeria is now and where it could be by 2050.",
  },
  {
    question: "What is Street Pulse?",
    answer:
      "Street Pulse is a short poll round. You answer a set of questions and then see how your answers compare with other people who answered.",
  },
  {
    question: "Why can only people in Nigeria answer Street Pulse?",
    answer:
      "Street Pulse is built to reflect local behavior in Nigeria. Only responses confirmed to be from Nigeria can be counted.",
  },
  {
    question: "Can I see poll results before answering?",
    answer:
      "No. Results for a question unlock after you answer that question.",
  },
  {
    question: "Do you store my personal identity?",
    answer:
      "Street Pulse does not ask for your name. Answers are saved without personal identity and shown as group totals.",
  },
  {
    question: "How can I report an error?",
    answer:
      "Use the correction form on the Methodology page. Include the page link and the source you want us to review.",
  },
];
