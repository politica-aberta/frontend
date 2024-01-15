import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";
import {
  CreateConversationResponseValidator,
  CreateConversationValidator,
} from "@/lib/validators";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

interface FullCreateConversationPayload {
  entity: string;
  user_id: string;
}

export async function POST(request: NextRequest) {
  const supabase = createClient(cookies());
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { party } = CreateConversationValidator.parse(body);
  const newReq: FullCreateConversationPayload = {
    entity: party.toUpperCase(),
    user_id: session.session!.user.id,
  };


  const { data , error } = await supabase
    .from("conversation_data")
    .insert([newReq])
    .select("id, entity");

  if (data) {
    const {id, entity} = data[0];
    return NextResponse.json(
      { id: id, party: entity.toLowerCase() },
      { status: 200 }
    );
  } else {
    console.log(error);
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
