"use client";
import React, { useState, useEffect, FC } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation"; // Corrected import path
import { cn, getFrontendURL } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

interface OneTapProps extends React.HTMLAttributes<HTMLDivElement> {}

const OneTap: FC<OneTapProps> = ({ className, ...props }) => {
  const [isClient, setIsClient] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleSignInWithGoogle = async (response: any) => {
      // Implementation remains the same
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.credential,
        nonce: "",
      });
      router.refresh();
    };

    (window as any).handleSignInWithGoogle = handleSignInWithGoogle;

    const loadGoogleScript = () => {
      if (document.getElementById("google-one-tap-script")) return;

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client?hl=pt";
      script.async = true;
      script.id = "google-one-tap-script";
      document.body.appendChild(script);

      script.onload = () => {
        // Script is loaded successfully
      };
    };

    loadGoogleScript();

    return () => {
      // Cleanup
      delete (window as any).handleSignInWithGoogle;
    };
  }, [isClient, supabase, router]);

  if (!isClient) {
    return <Skeleton className="h-10 w-full" />;
  }

  return (
    <div className={cn("", className)} {...props}>
      <div
        id="g_id_onload"
        data-client_id="804816581126-ur88p64bb5bv01cqhsvvgoi2u3vmcdmm.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="redirect"
        data-login_uri={
          getFrontendURL() + "api/auth/onetap-sign-in"
        }
        data-callback="handleSignInWithGoogle"
        data-auto_select="false"
        data-itp_support="false"
      ></div>

      <div
        className="g_id_signin overflow-hidden bg-background rounded-md"
        data-type="standard"
        data-shape="rectangular"
        data-theme="filled_black"
        data-text="continue_with"
        data-size="large"
        data-logo_alignment="left"
        data-locale="pt"
      ></div>
    </div>
  );
};

export default OneTap;
