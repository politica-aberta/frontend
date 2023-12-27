import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const {data } = await supabase.auth.exchangeCodeForSession(code)
    const userId = data?.user?.id;
    const name = data?.user?.user_metadata?.name;
  
    const { error } = await supabase.from('users').insert({ id: userId, name: name, usage: 0 })
    
    if (error) {
      console.log(error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  
  }
  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}
