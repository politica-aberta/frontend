"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Smile, X } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import SignOutButton from "./SignOutButton";
import { LoginUserForm } from "./LoginUserForm";
import { FC, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

interface MobileNavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  //   refs: { name: string; href: string }[];
  session: Session | null;
}

const MobileNavbar: FC<MobileNavbarProps> = ({ className, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={cn("flex flex-row w-screen justify-between px-6", className)}
    >
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "ghost" }), "h-full px-2")}
      >
        <Smile />
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="">
          <Menu />
        </SheetTrigger>
        <SheetContent className="">
          <div className="flex flex-col pt-32 pb-16 px-4 space-y-8 text-xl">
            <Link onClick={() => setOpen(false)} href="/">
              Início
            </Link>
            <Link onClick={() => setOpen(false)} href="/about">
              Equipa
            </Link>
            <Link onClick={() => setOpen(false)} href="/chat">
              Chat
            </Link>
          </div>
          <div className="flex pt-8 gap-8 px-4 border-t">
            {props.session?.user ? <SignOutButton /> : <LoginUserForm />}

            <ThemeToggle className="" />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNavbar;
