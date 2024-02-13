import ChatContainer from "@/components/chat/ChatContainer";
import ChatHistory from "@/components/chat/ConversationHistory";
import ChatSidebar from "@/components/chat/ChatSidebar";

import { getSupabaseServerClient } from "@/lib/supabase_utils";

export default async function Chat({ params }: { params: { id: string } }) {
  // match /chat/id for past chats
  const routeChatId = params.id;

  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("conversation_data")
    .select("id,entity,conversation_history")
    .eq("id", routeChatId).single();

  const chatId = data?.id;
  const history = data?.conversation_history;
  return (
    <div className="h-screen pt-16 flex flex-row ">
      <ChatSidebar conversationHistory={<ChatHistory />}></ChatSidebar>
      <ChatContainer
        chatId={chatId as string}
        chatHistory={history}
        conversationHistory={<ChatHistory />}
      />
    </div>
  );
}
