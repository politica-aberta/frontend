import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getFrontendURL } from '@/lib/utils';

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const supabase = createClient( cookies() );

  const body = await request.json();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: body.prov,
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: `${getFrontendURL()}api/auth/callback`,
    },
  });

  if (error) {
    console.error('Error creating Google sign-in URL:', error);
    return;
  }

  return NextResponse.json({status: 200, body: data.url});
};