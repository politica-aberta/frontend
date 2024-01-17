import ChatContainer from "@/components/chat/ChatContainer";
import ChatSidebar from "@/components/chat/ChatSidebar";
import CreateChatMessage from "@/components/chat/CreateChatMessage";
import ConversationHistory from "@/components/chat/ConversationHistory";

export default async function Chat({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // match  /chat?id&party


  return (
    <div className="h-screen pt-16 flex flex-row ">
      <ChatSidebar conversationHistory={<ConversationHistory />}></ChatSidebar>
      {
        // whenever no chat is selected, show the create chat message
        searchParams.id === undefined || searchParams.party === undefined ? (
          <CreateChatMessage
            className=""
            conversationHistory={<ConversationHistory />}
          />
        ) : (
          <ChatContainer
            chatId={searchParams.id as string}
            partyId={searchParams.party as string}
            chatHistory={[]}
            conversationHistory={<ConversationHistory />}
          />
        )
      }
    </div>
  );
}
