"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, FC } from "react";
import { createClient } from "@/utils/supabase/client";
import { cn, getFrontendURL } from "@/lib/utils";
import { Provider } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";
import { Button, buttonVariants } from "./ui/button";
import GoogleIcon from "./svg";

interface OAuthSignInButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  provider: string;
}

const OAuthSignInButton: FC<OAuthSignInButtonProps> = ({
  className,
  ...props
}) => {
  const { toast } = useToast();
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const getOAuthUrl = async () => {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: props.provider.toLowerCase() as Provider,
        options: {
          skipBrowserRedirect: true,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          redirectTo: `${getFrontendURL()}api/auth/callback`,
        },
      });

      if (error) {
        toast({
          title: "Houve um problema.",
          description: "Não conseguimos usar o login da Google.",
          variant: "destructive",
        });
      } else if (data) {
        setUrl(data.url);
      }
    };

    getOAuthUrl();
  }, [props.provider, toast]);

  return (
    <Link
      prefetch={false}
      href={url}
      className={cn(buttonVariants(), "w-full flex justify-center gap-4")}
    >
      <GoogleIcon className="w-5 h-5" />
      <span> {`Continuar com a ${props.provider}`}</span>
    </Link>
  );
};

export default OAuthSignInButton;
