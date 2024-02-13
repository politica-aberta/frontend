"use client";

import React, { FC, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { parties } from "@/lib/constants";

interface ChatExamplesProps extends React.HTMLAttributes<HTMLDivElement> {
  setInput: (input: string) => void;
}

function pickRandomTwo(array: string[]) {
  const index1 = Math.floor(Math.random() * array.length);
  let index2 = Math.floor(Math.random() * array.length);
  // Ensure index2 is different from index1
  while (index2 === index1) {
    index2 = Math.floor(Math.random() * array.length);
  }
  return [array[index1], array[index2]];
}

const ChatExamples: FC<ChatExamplesProps> = ({ className, ...props }) => {
  const [randParties, setRandParties] = useState<string[][]>([]);
  const [comparisonExamples, setComparisonExamples] = useState<
    { prob: number; question: string }[]
  >([]);

  useEffect(() => {
    const newRandParties = [
      pickRandomTwo(parties.map((v) => v.id.toUpperCase())),
      pickRandomTwo(parties.map((v) => v.id.toUpperCase())),
      pickRandomTwo(parties.map((v) => v.id.toUpperCase())),
      pickRandomTwo(parties.map((v) => v.id.toUpperCase())),
    ];
    setRandParties(newRandParties);
  }, []);

  useEffect(() => {
    if (randParties && randParties.length > 0) {
      setComparisonExamples([
        {
          prob: 0.8,
          question: `Como pretendem o ${randParties[0][0]} e o ${randParties[0][1]} abordar a questão das mudanças climáticas?`,
        },
        {
          prob: 0.55,
          question: `Qual é a visão do ${randParties[1][0]} e da ${randParties[1][1]} sobre a geração de empregos e crescimento económico?`,
        },
        {
          prob: 0.6,
          question: `Quais são as estratégias do ${randParties[2][0]} e do ${randParties[2][1]} para melhorar o SNS?`,
        },
        {
          prob: 0.7,
          question: `Em que aspectos as políticas de combate à corrupção diferem entre o ${randParties[3][0]} e o ${randParties[3][1]}?`,
        },
      ]);
    }
  }, [randParties]);


  return (
    <>
      {comparisonExamples && comparisonExamples.length > 0 && (
        <h2 className="text-description pl-4 pb-1">Exemplos</h2>
      )}
      <div className={cn("grid lg:grid-cols-2 gap-4", className)}>
        {comparisonExamples &&
          comparisonExamples.length > 0 &&
          comparisonExamples.map((ex, index) => (
            <Button
              key={index} // Don't forget to add a key when mapping in React
              className={`h-20 p-4 text-left whitespace-normal items-start justify-start ${
                index >= 2 ? "hidden lg:block" : "block"
              }`}
              onClick={() => props.setInput(ex.question)}
              variant={"outline"}
            >
              {ex.question}
            </Button>
          ))}
      </div>
    </>
  );
};
export default ChatExamples;
