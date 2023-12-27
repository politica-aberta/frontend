
import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const supabase = createClient(cookies());

  const { error } = await supabase.auth.signOut();

  if (error) {
      return NextResponse.json(
            { error: error.message },
            { status: 500 },
          );
  }

  return NextResponse.json( {
    status: 200,
  });
}
