import { FC, useEffect, useState} from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { LoaderIcon } from "lucide-react";


interface MessageSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  alertMessage?: string | null | undefined
}

const MessageSkeleton: FC<MessageSkeletonProps> = ({ className, ...props }) => {
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false)
  useEffect(() => {
    if(props.alertMessage) {
      setTimeout(() => {
          setIsAlertVisible(true);
      }, 2000);
    }
  })
  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>Assistente</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1.5">

        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        {props.alertMessage && isAlertVisible && <div className="bg-yellow-50 border-2 border-yellow-400 p-2 text-xs mt-5">
          <p className="flex">
            <span className="my-auto"><LoaderIcon className="flex mr-2"/></span><span className="my-auto">{props.alertMessage}</span>
          </p>
        </div>}
      </CardContent>
    </Card>
  );
};

export default MessageSkeleton;
