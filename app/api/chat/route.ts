import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { MessageResponse, ChatValidator } from "@/lib/validators";
import { ZodError } from "zod";

import { max_usage } from "@/lib/constants";

import { getBackendURL } from "@/lib/utils";
import { getSupabaseRouteClient } from "@/lib/supabase_utils";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const supabase = getSupabaseRouteClient();
  const {
    data: { session: session },
  } = await supabase.auth.getSession();

  try {
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: user_data, error } = await supabase
      .from("user_data")
      .select("usage");

    const prev_usage: number = user_data!.at(0)?.usage;

    if (prev_usage > max_usage) {
      return NextResponse.json(
        { error: "Usage limit exceeded" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const { id, party, message, previous_messages } = ChatValidator.parse(body);

    let res;
    if (party === "multi") {
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
      res = data;
    } else {
      const payload = {
        access_token: session!.access_token,
        party: party.toUpperCase(), // backend expects upper case
        message: message,
        previous_messages: previous_messages,
        infer_chat_mode: true,
      };

      const { data } = await axios.post<MessageResponse>(
        `${getBackendURL()}chat`,
        payload
      );

      res = data;
    }

    // // sleep for 2 seconds
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // return NextResponse.json(
    //   {
    //     role: "Assistant",
    //     message: message,
    //     references: [
    //       {
    //         party: "chega",
    //         document: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/chega-legislativas22.pdf",
    //         pages: [1,2,3]
    //       },

    //     ],
    //   },
    //   { status: 200 }
    // );

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
      message: res.message,
      references: res.references,
    };

    await supabase
      .from("conversation_data")
      .update({
        conversation_history: previous_messages.concat([question, reply]),
      })
      .eq("id", id)
      .select("conversation_history");

    return NextResponse.json(reply, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Bad Request",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
