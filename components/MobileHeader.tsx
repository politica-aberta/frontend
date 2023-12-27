"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Session } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import SignOutButton from "./SignOutButton";
import { LoginUserForm } from "./LoginUserForm";
import Link from "next/link";
import React from "react";

interface MobileNavProps extends React.HTMLAttributes<HTMLDivElement> {
  session: Session | null;
}

export default function MobileNav({ className, ...props }: MobileNavProps) {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="">{open ? <X /> : <Menu />}</PopoverTrigger>
      <PopoverContent className="h-screen w-screen px-14 ">
        <div className="flex flex-col py-16 space-y-8 text-xl">
          <Link onClick={() => setOpen(false)} href="/">
            Início
          </Link>
          <Link onClick={() => setOpen(false)} href="/chat">
            Chat
          </Link>
          <Link onClick={() => setOpen(false)} href="/about">
            Equipa
          </Link>
        </div>
        <div className="flex pt-8 gap-8 border-t">
          {props.session?.user ? <SignOutButton /> : <LoginUserForm />}

          <ThemeToggle className="" />
        </div>
      </PopoverContent>
    </Popover>
  );
}
