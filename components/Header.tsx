import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { buttonVariants } from "./ui/button";
import { Smile } from "lucide-react";
import SignOutButton from "./SignOutButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import { LoginUserForm } from "./LoginUserForm";
import MobileNavbar from "./MobileNavbar";

export default async function Header() {
  const supabase = createClient(cookies());

  const {
    data: { session: session },
  } = await supabase.auth.getSession();

  return (
    <header className="absolute z-10 w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="hidden lg:flex max-w-5xl w-full justify-between items-center py-3 text-sm text-foreground">
        <div className="flex gap-2">
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            <Smile size={28} />
            <span className="pl-3 ">Início</span>
          </Link>
          <Link href="/about" className={buttonVariants({ variant: "ghost" })}>
            Equipa
          </Link>
          <Link href="/chat" className={buttonVariants({ variant: "ghost" })}>
            Chat
          </Link>
        </div>
        <div className="flex flex-row gap-4">
          {session?.user ? (
            <div className="flex flex-row">
              <div className="mr-4 grid content-center ">
                Olá, {session.user.user_metadata.name}!
              </div>
              <SignOutButton />
            </div>
          ) : (
            <>
              <LoginUserForm />
            </>
          )}
          <ThemeToggle />
        </div>
      </div>

      <MobileNavbar className="flex lg:hidden" session={session} />
    </header>
  );
}
