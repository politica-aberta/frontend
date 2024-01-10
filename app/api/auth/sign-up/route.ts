
import { getFrontendURL } from "@/lib/utils";
import { CreateUserValidator } from "@/lib/validators";
import { createClient } from "@/utils/supabase/server";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {

  const supabase = createClient(cookies());
  const body = await request.json();

  const { data: session } = await supabase.auth.getSession();
    if (session.session) {
      return NextResponse.json(
        {
          error:
            "You are already signed in. Please sign out before creating a new account.",
        },
        { status: 400 }
      );
    }

  const { email, password, name } = CreateUserValidator.parse(body);

  const {data} = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
      },
      emailRedirectTo: `${getFrontendURL()}api/auth/callback`,
    },
  });

  if (!data.user) {
    return NextResponse.json(
      { error: "Could not authenticate user" },
      { status: 401 }
    );
  }

  return NextResponse.json(data.user, {
    status: 200,
  });


}
