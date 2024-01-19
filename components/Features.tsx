import { BookOpen, Bookmark, Search } from "lucide-react";

import PSDark from "@/images/ps-dark.png";
import Image from "next/image";

interface FeatureProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Feature({ className, ...props }: FeatureProps) {
  const features = [
    {
      icon: <Search />,
      title: "Pesquisa semântica.",
      description:
        "Coloca as tuas dúvidas de forma natural e o assistente procura as respostas nos documentos oficiais dos partidos.",
    },
    {
      icon: <BookOpen />,
      title: "Exploração das propostas.",
      description:
        "Ao lado da tua conversa tens acesso ao documento original, para que possas consultá-lo sempre que quiseres.",
    },
    {
      icon: <Bookmark />,
      title: "Referências.",
      description:
        "Cada resposta está devidamente identificada com as respetivas páginas referenciadas, de forma a comprovar a autenticidade da mesma.",
    },
  ];

  return (
    <div id="features" className="bg-secondary/50">
      <div className="max-w-5xl mx-auto px-6 py-32">
        <div className="lg:pl-12 max-w-2xl">
          <h1 className="text-title">Para que serve o Política Aberta?</h1>
          <h2 className="text-muted-foreground text-lg pt-4">
            O projeto Política Aberta permite-te explorar a informação presente
            nos documentos oficiais dos partidos portugueses. O nosso objetivo é
            facilitar a identificação de propostas e ideias, para que possas
            tomar decisões informadas com o teu direito de voto.
          </h2>
        </div>

        <div className="lg:mx-auto pt-24 grid lg:grid-cols-2 gap-16">
          <Image
            className="place-self-end lg:max-w-none rounded-xl shadow-xl"
            src={PSDark}
            alt="PSDark"
            width={960}
            height={540}
          />

          <div className=" mx-auto space-y-8 lg:space-y-16 lg:pt-8">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="shrink-0 p-1 ">{feature.icon}</div>
                <p className="text-lg text-description max-w-md">
                  <span className="text-foreground font-semibold pr-2">
                    {feature.title}
                  </span>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
