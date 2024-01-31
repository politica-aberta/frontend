import { FC } from "react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface ChatExamplesProps extends React.HTMLAttributes<HTMLDivElement> {
  party: string;
  setInput: (input: string) => void;
}

const ChatExamples: FC<ChatExamplesProps> = ({ className, ...props }) => {
  // TODO set up probabilistic rendering?
  const examples = [
    {
      prob: 0.3,
      question: `O ${props.party} tem alguma proposta para implementar uma reforma tributária?`,
    },
    {
      prob: 0.6,
      question: `Como visa o ${props.party} melhorar o sistema de saúde pública?`,
    },
    {
      prob: 0.8,
      question: `Como planeia o ${props.party} enfrentar as mudanças climáticas e promover sustentabilidade?`,
    },
    {
      prob: 0.5,
      question: `Quais são as medidas do ${props.party} para combater a corrupção?`,
    },
  ];
  const comparisonExamples = [
    {
      prob: 0.8,
      question: `Como pretendem o PAN e o LIVRE abordar a questão das mudanças climáticas?`,
    },
    {
      prob: 0.55,
      question: `Qual é a visão dos PS e da IL sobre a geração de empregos e crescimento económico?`,
    },
    {
      prob: 0.6,
      question: `Quais são as estratégias dos partidos para melhorar o sistema de saúde pública?`,
    },
    {
      prob: 0.7,
      question: `Em que aspectos as políticas de combate à corrupção diferem entre os partidos?`,
    },
  ];

  const questionsToDisplay =
    props.party === "MULTI" ? comparisonExamples : examples;

  return (
    <>
      <h2 className="text-description pl-4 pb-1">Exemplos</h2>
      <div className={cn("grid lg:grid-cols-2 gap-4", className)}>
        {questionsToDisplay.map((ex, index) => (
          <Button
            key={index} // Don't forget to add a key when mapping in React
            className={`h-20 p-4 text-left whitespace-normal items-start justify-start ${
              index >= 2 ? "hidden lg:block" : ""
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
