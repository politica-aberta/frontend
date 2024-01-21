import { getFrontendURL } from "@/lib/utils";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient(cookies());

    const {
      data: { user },
    } = await supabase.auth.exchangeCodeForSession(code);

    const { data, error } = await supabase
      .from("user_data")
      .upsert(
        { id: user?.id, name: user?.user_metadata.name, usage: 0 },
        { ignoreDuplicates: true }
      )
      .select();

    if (error !== null) {
      console.log(error);
    }
  }

  redirect(getFrontendURL()!);
}
