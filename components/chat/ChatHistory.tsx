import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { FC } from "react";

type ChatHistoryEntry = {
  id: string;
  title: string;
};

interface ChatHistoryProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChatHistory: FC<ChatHistoryProps> = async ({ className, ...props }) => {
  const supabase = createClient(cookies());
  const { data: chats } = await supabase.from("conversation_data").select();

  return (
    <div>
      <p className="text-description">History</p>
    </div>
  );
};

export default ChatHistory;
