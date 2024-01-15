import ChatContainer from "@/components/chat/ChatContainer";
import ChatHistory from "@/components/chat/ChatHistory";
import ChatSidebar from "@/components/chat/ChatSidebar";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Chat({ params }: { params: { id: string } }) {
  // match /chat/id for past chats
  const routeChatId = params.id;

  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("conversation_data")
    .select("id,entity,conversation_history")
    .eq("id", routeChatId);

  const chatId = data?.at(0)?.id;
  const partyId = data?.at(0)?.entity;
  const history = data?.at(0)?.conversation_history;


  return (
    <div className="h-screen pt-16 flex flex-row ">
      <ChatSidebar chatHistory={<ChatHistory />}></ChatSidebar>
      <ChatContainer
        chatId={chatId as string}
        partyId={partyId as string}
        chatHistory={history}
      />
    </div>
  );
}
