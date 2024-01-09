import ChatContainer from "@/components/chat/ChatContainer";
import ChatHistory from "@/components/chat/ChatHistory";
import ChatSidebar from "@/components/chat/ChatSidebar";
import CreateChatMessage from "@/components/chat/CreateChatMessage";
import { Message } from "@/lib/types";

export default async function Chat({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // match /chat/id and /chat?id for past chats
  // also matches /chat/x/y... fixme?
  const searchParamsChatId = searchParams.id;
  const searchParamsPartyId = searchParams.party;
  const routeChatId = params.id;

  const history: Message[] = [];

  const defaultMessage: Message = {
    role: "assistant",
    message: "Olá! Como posso ser útil?",
    references: null,
  };

  let partyId: string | string[] | undefined = "";

  if (searchParamsChatId != undefined) {
    history.push(defaultMessage);
    partyId = searchParamsPartyId;
  } else if (routeChatId != undefined) {
    // TODO saving chats logic still missing
    // const chats = await fetch("");
    // history.push(chats);
    // partyId = chats.partyId;
  }

  return (
    <div className="h-screen pt-16 flex flex-row ">
      <ChatSidebar chatHistory={<ChatHistory />}></ChatSidebar>
      {
        // whenever no chat is selected, show the create chat message
        searchParamsChatId == undefined && routeChatId == undefined ? (
          <CreateChatMessage className="max-w-3xl h-fit mx-auto mt-16 items-center" />
        ) : (
          <ChatContainer partyId={partyId as string} chatHistory={history} />
        )
      }
    </div>
  );
}
