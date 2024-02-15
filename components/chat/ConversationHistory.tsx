import { FC } from "react";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";

import { getSupabaseServerClient } from "@/lib/supabase_utils";

interface ConversationHistoryProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ConversationHistory: FC<ConversationHistoryProps> = async ({
  className,
  ...props
}) => {
  const supabase = getSupabaseServerClient();

  let { data, error } = await supabase
    .from("conversation_data")
    .select("id,entity,created_at,conversation_history")
    .order("created_at", { ascending: false });

  return (
    <div>
      <p className="hidden lg:block text-description pl-2">Histórico</p>
      <ul className="flex flex-col">
        <ScrollArea className="h-[60vh] mt-4 ">
          <ul className="flex flex-col ">
            {data?.filter((entry) => entry.conversation_history).map((entry) => (
              <Link
                className="mr-4 items-stretch hover:bg-muted p-2 rounded-sm"
                prefetch={false}
                key={entry.id}
                href={`/chat/${entry.id}`}
              >
                <div>
                  <p className="">
                    {entry.conversation_history?.at(1).message}
                  </p>
                  <p className="text-description">
                    {new Date(entry.created_at).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </ul>
        </ScrollArea>
      </ul>
    </div>
  );
};

export default ConversationHistory;
