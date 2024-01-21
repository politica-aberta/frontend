import { NextRequest, NextResponse } from "next/server";
import { CreateConversationValidator } from "@/lib/validators";

import { getSupabaseRouteClient } from "@/lib/supabase_utils";

export const dynamic = "force-dynamic";

interface FullCreateConversationPayload {
  entity: string;
  user_id: string;
}

export async function POST(request: NextRequest) {
  const supabase = getSupabaseRouteClient();
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.session.user;

  // FIXME this used to be done in the auth callback but failed in ios safari
  const { data, error } = await supabase
    .from("user_data")
    .upsert(
      { id: user.id, name: user.user_metadata.name, usage: 0 },
      { ignoreDuplicates: true }
    )
    .select();

  if (error !== null) {
    console.log(error);
  }

  const body = await request.json();
  const { party } = CreateConversationValidator.parse(body);
  const newReq: FullCreateConversationPayload = {
    entity: party.toUpperCase(),
    user_id: session.session!.user.id,
  };

  const { data: conversationData, error: conversationError } = await supabase
    .from("conversation_data")
    .insert([newReq])
    .select("id, entity");

  if (conversationData) {
    const { id, entity } = conversationData[0];
    return NextResponse.json(
      { id: id, party: entity.toLowerCase() },
      { status: 200 }
    );
  } else {
    console.log(conversationError);
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
