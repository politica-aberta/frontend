import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { MessageResponse, ChatValidator } from "@/lib/validators";
import { ZodError } from "zod";

import { max_usage } from "@/lib/constants";

import { getBackendURL } from "@/lib/utils";
import { getSupabaseRouteClient } from "@/lib/supabase_utils";
import { SupabaseClient, Session } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// Error handler
const handleError = (error: Error) => {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Bad Request",
      },
      { status: 400 }
    );
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
};

// Extracted logic for creating or updating conversation data
async function handleConversation(
  supabase: SupabaseClient<any, "public", any>,
  session: Session,
  body: any
) {


  if (body.id === undefined) {
    const newReq = {
      entity: "MULTI",
      user_id: session.user.id,
    };

    const { data, error } = await supabase
      .from("conversation_data")
      .insert([newReq])
      .select("id, entity")
      .single();

  
    body.id = data?.id;
  
  }

  return body;
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseRouteClient();
  const {
    data: { session: session },
  } = await supabase.auth.getSession();

  // if no session, return unauthorized
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: user_data, error } = await supabase
    .from("user_data")
    .select("usage")
    .single();

  const prev_usage: number = user_data?.usage;

  // if usage is > max_usage, return 403
  if (prev_usage > max_usage) {
    return NextResponse.json(
      { error: "Usage limit exceeded" },
      { status: 403 }
    );
  }

  let body = await req.json();
  const updatedBody = await handleConversation(supabase, session, body);
  const { id, message, previous_messages } = ChatValidator.parse(updatedBody);
  const payload = {
    access_token: session!.access_token,
    // party: party.toUpperCase(), // backend expects upper case
    message: message,
    previous_messages: previous_messages,
    infer_chat_mode: true,
  };

  const { data } = await axios.post<MessageResponse>(
    `${getBackendURL()}multi-chat`,
    payload
  );

  await supabase
    .from("user_data")
    .update({ usage: prev_usage + 1 })
    .eq("id", session!.user.id);

  const question: MessageResponse = {
    role: "user",
    message: message,
    references: null,
  };

  const reply: MessageResponse = {
    role: "assistant",
    message: data.message,
    references: data.references,
  };

  await supabase
    .from("conversation_data")
    .update({
      conversation_history: previous_messages.concat([question, reply]),
    })
    .eq("id", id)
    .select("conversation_history");

  return NextResponse.json({ id: id, reply: reply }, { status: 200 });
}
