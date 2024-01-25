import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { buttonVariants } from "@/components/ui/button";
import { getSupabaseServerClient } from "@/lib/supabase_utils";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import PartyShowcase from "@/components/PartyShowcase";

export default async function Index({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = getSupabaseServerClient();

  const {
    data: { session: session },
  } = await supabase.auth.getSession();

  return (
    <div id="hero" className="relative isolate pt-16 ">
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
      <div className="h-screen -mt-16 mx-auto px-6 max-w-3xl">
        <div className="h-full text-center grid content-center">
          <h1 className="text-6xl font-bold tracking-tight text-secondary-foreground ">
            Política Aberta
          </h1>
          <p className="mt-6 text-lg leading-8">
            Onde te aproximas dos valores democráticos do nosso país.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              className={buttonVariants()}
              href={session ? "/chat" : "/auth/sign-up"}
            >
              Começar
            </Link>
            <Link
              className={buttonVariants({ variant: "ghost", size: "lg" })}
              href="#features"
            >
              Mais Informação
              <ArrowDown className="pl-2 " />
            </Link>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl top-[calc(90%-20rem)]"
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
      <Features />
      <PartyShowcase />
      <FAQ className="pt-32" />
      <Footer className="pt-32" />
    </div>
  );
}
