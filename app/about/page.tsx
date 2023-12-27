import Image from "next/image";

import SMPWhite from "@/images/SMPTechnologies-white-2400x1800.png";
import SMPDark from "@/images/SMPTechnologies-dark-2400x1800.png";

import Footer from "@/components/Footer";
import Link from "next/link";

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
      <div className="h-screen grid content-center lg:-mt-16 mx-auto max-w-7xl">
        <div id="team" className="h-full grid lg:grid-cols-2 lg:-ml-20 ">
          <Image
            className="block dark:hidden "
            src={SMPWhite}
            alt="SMP Technologies"
            placeholder="blur"
          />
          <Image
            className="hidden dark:block"
            src={SMPDark}
            alt="SMP Technologies"
            placeholder="blur"
          />

          <div className="mx-8 text-lg">
            <h1 className="pt-24 pb-16 component-title ">Made with love</h1>
            <p>
              Este projeto foi criado pela equipa da{" "}
              <Link
                className=" underline hover:text-muted-foreground"
                href="https://smptech.pt"
              >
                SMP Technologies
              </Link>
              , uma empresa de tecnologia baseada em Portugal. Nós
              especializamo-nos em tecnologias AI e acreditamos no seu potencial
              disruptivo, não só economicamente como socialmente.
            </p>
            <p className="pt-8">
              O nosso objetivo é aproximar a democracia portuguesa destas
              tecnologias e ajudar o cidadão comum ao voto informado.
            </p>
          </div>
        </div>
      </div>
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
      <Footer  className="pt-24 lg:pt-0" />
    </div>
  );
}
