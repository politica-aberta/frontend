import { Metadata } from "next";
import Link from "next/link";

import CreateUserForm from "@/components/CreateUserForm";
import Image from "next/image";
import Waves from "@/images/pexels-andrew-neel-7174579.jpg";
import OAuthSignInButton from "@/components/OAuthSignInButton";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <div className="pt-16 container relative  h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <Image
          className=""
          src={Waves}
          alt="Waves"
          fill={true}
          placeholder="blur"
        />

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg text-white">
              &ldquo;In the theater of politics, our platform is the spotlight,
              illuminating promises and actions, so that every vote is cast with
              clarity and conviction.&rdquo;
            </p>
            <footer className="text-sm text-muted-foreground">ChatGPT</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 pt-16">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Cria a tua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Insere o teu email e password nos campos abaixo.
            </p>
          </div>
          <CreateUserForm />

          <OAuthSignInButton provider="Google" />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Ao continuares, aceitas o nossos{" "}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
