import { FC, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Loader2 } from "lucide-react";

interface MessageSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  alertMessage?: string | null | undefined;
}

const MessageSkeleton: FC<MessageSkeletonProps> = ({ className, ...props }) => {
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  useEffect(() => {
    if (props.alertMessage) {
      setTimeout(() => {
        setIsAlertVisible(true);
      }, 4000);
    }
  });
  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>Assistente</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1.5">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />

        {props.alertMessage && isAlertVisible && (
          <Skeleton className="p-3 flex bg-background pt-6">
            <Loader2 className="animate-spin mr-3" />
            {props.alertMessage}
          </Skeleton>
        )}
      </CardContent>
    </Card>
  );
};

export default MessageSkeleton;
