import ChatContainer from "@/components/chat/ChatContainer";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ConversationHistory from "@/components/chat/ConversationHistory";
import { getSupabaseServerClient } from "@/lib/supabase_utils";

export default async function Chat({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let history = null;

  if (searchParams.id !== undefined) {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from("conversation_data")
      .select("id,entity,conversation_history")
      .eq("id", searchParams.id)
      .single();

    history = data?.conversation_history;
  }

  return (
    <div className="h-screen pt-16 flex flex-row ">
      <ChatSidebar conversationHistory={<ConversationHistory />}></ChatSidebar>
      <ChatContainer
        chatId={searchParams.id as string}
        chatHistory={history === null ? [] : history}
        conversationHistory={<ConversationHistory />}
      />
    </div>
  );
}
