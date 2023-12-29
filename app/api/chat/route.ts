import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ChatResponse, ChatResponseValidator, ChatValidator } from "@/lib/validators";
import { ZodError } from "zod";
import { Reference } from "@/lib/types";

import { max_usage } from "@/lib/constants";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const supabase = createClient(cookies());
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
    const { party, message, previous_messages } = ChatValidator.parse(body);

    const payload = {
      access_token: session!.access_token,
      party: party,
      message: message,
      previous_messages: previous_messages,
      infer_chat_mode: true,
    };

    // sleep for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));


    const { data } = await axios.post<ChatResponse>(
      // `${getBackendUrl()}chat`,
      "http://localhost/chat",
      payload
    );
    console.log(data);

    // FIXME inconsistency between references array/no array

    return NextResponse.json(
      {
        role: "Assistant",
        message: message,
        references:{
          party: "ps",
          document: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/ps-legislativas22.pdf",
          pages: [1, 2, 3],
        },
      },
      { status: 200 }
    );

    // const { data } = await axios.post<ChatResponse>(
    //   // `${getBackendUrl()}chat`,
    //   "http://ec2-63-35-224-252.eu-west-1.compute.amazonaws.com/chat",
    //   payload
    // );

    // console.log(data);

    // const { answer, coordinates } = ChatResponseValidator.parse(data);
    // const reference: Reference | null = coordinates.length
    //   ? {
    //       document: coordinates[0].file_name,
    //       pages: coordinates.map((coordinate) => Number(coordinate.page_label)),
    //     }
    //   : null;

    // const { data: updated_user_data, error: update_error } = await supabase
    //   .from("user_data")
    //   .update({ usage: prev_usage + 1 })
    //   .eq("id", session!.user.id)
    //   .select();

    // return NextResponse.json(
    //   { sender: "Assistente", text: answer, reference: reference },
    //   { status: 200 }
    // );
  } catch (error) {
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
