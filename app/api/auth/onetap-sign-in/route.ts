import { NextRequest, NextResponse } from "next/server";
import { LoginUserValidator } from "@/lib/validators";
import { getSupabaseRouteClient } from "@/lib/supabase_utils";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const supabase = getSupabaseRouteClient();
  const formData = await request.formData();
  const credential = formData.get("credential") as string; // Extracting the credential field and casting it to string

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: credential,
    nonce: "",
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not authenticate user" },
      { status: 401 }
    );
  }

  redirect("/");

  return NextResponse.json({ status: 200 });
}
