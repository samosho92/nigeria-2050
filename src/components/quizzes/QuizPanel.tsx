"use client";

import { useState } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { trackEvent } from "@/lib/analytics";
import type { QuizQuestion } from "@/types/content";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface QuizPanelProps {
  quizId: string;
  title: string;
  questions: QuizQuestion[];
}

export function QuizPanel({ quizId, title, questions }: QuizPanelProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce(
    (total, question) => total + (answers[question.id] === question.correctIndex ? 1 : 0),
    0,
  );

  const handleSubmit = () => {
    setSubmitted(true);
    trackEvent({
      name: "quiz_complete",
      quizId,
      score,
      total: questions.length,
    });
  };

  return (
    <section className="rounded-xl border border-border bg-card p-6" aria-labelledby={`quiz-${quizId}`}>
      <h3 id={`quiz-${quizId}`} className="text-lg font-bold">
        {title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Quick knowledge check. No account required.
      </p>

      <ol className="mt-6 space-y-6">
        {questions.map((question, index) => {
          const selected = answers[question.id];
          const isCorrect = selected === question.correctIndex;

          return (
            <li key={question.id}>
              <p className="font-medium">
                {index + 1}. {question.prompt}
              </p>
              <div className="mt-3 space-y-2">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={option}
                    type="button"
                    disabled={submitted}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }))
                    }
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg border px-4 py-2 text-left text-sm transition",
                      selected === optionIndex
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-accent/50",
                      submitted &&
                        optionIndex === question.correctIndex &&
                        "border-accent bg-accent/15",
                      submitted &&
                        selected === optionIndex &&
                        !isCorrect &&
                        "border-destructive/50 bg-destructive/5",
                    )}
                  >
                    {option}
                    {submitted && optionIndex === question.correctIndex && (
                      <IconCheck className="size-4 text-accent" stroke={1.5} aria-hidden />
                    )}
                    {submitted && selected === optionIndex && !isCorrect && (
                      <IconX className="size-4 text-destructive" stroke={1.5} aria-hidden />
                    )}
                  </button>
                ))}
              </div>
              {submitted && (
                <p className="mt-2 text-sm text-muted-foreground">{question.explanation}</p>
              )}
            </li>
          );
        })}
      </ol>

      {!submitted ? (
        <Button
          type="button"
          className="mt-6"
          disabled={Object.keys(answers).length < questions.length}
          onClick={handleSubmit}
        >
          Check answers
        </Button>
      ) : (
        <p className="mt-6 font-semibold text-accent">
          Score: {score}/{questions.length}
        </p>
      )}
    </section>
  );
}
