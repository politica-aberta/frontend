import Footer from "@/components/Footer";
import { Smile } from "lucide-react";
import Link from "next/link";

const contributors: string[] = ["xtwigs", "jmartinhoj", "diogosoares22", "ManelCoutinho", "go-liv" ];

export default async function About() {
  return (
    <div className="relative isolate pt-16 ">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
      <div className="h-screen grid content-center lg:-mt-16 mx-auto max-w-5xl">
        <div id="team" className="h-full grid lg:grid-cols-2 lg:-ml-20 ">
          <Smile className="place-self-center lg:mt-24" size={192} />

          <div className="mx-6 text-lg">
            <h1 className="pt-24 pb-16 component-title ">Made with love</h1>
            <p>
              Este projeto foi criado por um pequeno grupo de amigos e
              developers. Formados em tecnologias AI, acreditamos no seu
              potencial disruptivo, não só economica como socialmente.
            </p>
            <p className="pt-8">
              O nosso objetivo é aproximar a democracia portuguesa das
              pessoas, recorrendo a estas tecnologias.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl lg:mx-auto mx-6">
        <div className="">
          <h2>Profundos agradecimentos a quem nos ajudou com o projeto.</h2>
          <ul className="pt-2">
            {contributors.map((col, index) => (
              <div key={index}>
                <Link
                  href={`https://github.com/${col}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <h2 className="text-md font-bold hover:text-muted-foreground">
                    {col}
                  </h2>
                </Link>
              </div>
            ))}
          </ul>
        </div>
        <div className="pt-24 ">
          <h2 className="component-title">Interessado em contribuir?</h2>
          <p className="pt-4">
            O código-fonte está disponível publicamente no{" "}
            <Link
              className="font-bold hover:text-muted-foreground"
              target="_blank"
              href={"https://github.com/politica-aberta"}
            >
              Github
            </Link>
            .
          </p>
        </div>
      </div>

      <Footer className="pt-24" />

      <div
        className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl top-[calc(90%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
    </div>
  );
}
