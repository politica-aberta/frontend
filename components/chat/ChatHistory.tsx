import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { FC } from "react";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";

interface ChatHistoryProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChatHistory: FC<ChatHistoryProps> = async ({ className, ...props }) => {
  const supabase = createClient(cookies());

  let { data, error } = await supabase
    .from("conversation_data")
    .select("id,entity,created_at");

  // FIXME come up with names for the entries, maybe use the entity name + a number,
  // but this should be done in supabase

  // let entries: { [key: string]: ChatHistoryEntry[] } = {};

  // data?.forEach((element) => {
  //   if (element.entity in entries) {
  //     entries[element.entity].push({id: element.id, title: `${element.entity}${entries[element.entity].length + 1}`});
  //   }
  //   else {
  //     entries[element.entity] = [element.id];
  //   }
  // });

  return (
    <div>
      <p className="text-description pl-2">Historico</p>
      <ul className="flex flex-col  ">
        <ScrollArea className=" h-[60vh] mt-4 ">
          <ul className="flex flex-col ">
            {data?.reverse().map((entry) => (
              <Link
                className="mr-4 items-stretch hover:bg-muted p-2 rounded-sm"
                prefetch={false}
                key={entry.id}
                href={`/chat/${entry.id}`}
              >
                <div>
                  <p className="">{entry.entity}</p>
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

export default ChatHistory;
