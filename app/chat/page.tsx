import ChatContainer from "@/components/chat/ChatContainer";
import ChatHistory from "@/components/chat/ChatHistory";
import ChatSidebar from "@/components/chat/ChatSidebar";
import CreateChatMessage from "@/components/chat/CreateChatMessage";

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
      <ChatSidebar chatHistory={<ChatHistory />}></ChatSidebar>
      {
        // whenever no chat is selected, show the create chat message
        searchParams.id === undefined || searchParams.party === undefined ? (
          <CreateChatMessage className="max-w-3xl h-fit mx-auto mt-16 items-center" />
        ) : (
          <ChatContainer
            chatId={searchParams.id as string}
            partyId={searchParams.party as string}
            chatHistory={[]}
          />
        )
      }
    </div>
  );
}
