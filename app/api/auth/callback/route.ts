import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getFrontendURL } from "@/lib/utils";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const data = await supabase.auth.exchangeCodeForSession(code);

    if (data.error !== null) {
      console.error("Error exchanging auth code for session:", data.error);
      return NextResponse.error();
    }
  }

  redirect(getFrontendURL()!);
}
