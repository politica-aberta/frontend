import { NextRequest, NextResponse } from 'next/server'
import { LoginUserValidator } from "@/lib/validators";
import { getSupabaseRouteClient } from '@/lib/supabase_utils';

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {

  const supabase = getSupabaseRouteClient();
  const body = await request.json();
  const { email, password } = LoginUserValidator.parse(body);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not authenticate user" },
      { status: 401 },
    );
  }

  return NextResponse.json({ status: 200})
}
