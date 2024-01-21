import { NextResponse } from "next/server";
import { getFrontendURL } from "@/lib/utils";
import { redirect } from "next/navigation";
import { getSupabaseRouteClient } from "@/lib/supabase_utils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const header = request.headers;

  if (code) {
    const supabase = getSupabaseRouteClient();

    const {
      data: { user },
    } = await supabase.auth.exchangeCodeForSession(code);

    const userId = user?.id;
    const name = user?.user_metadata?.name;

    const { data, error } = await supabase
      .from("user_data")
      .upsert({ id: userId, name: name, usage: 0 }, { ignoreDuplicates: true })
      .select();

    // if error redirect to main page
    if (error !== null) {
      console.log(error);
    }
  }

  redirect(getFrontendURL()!);
}
