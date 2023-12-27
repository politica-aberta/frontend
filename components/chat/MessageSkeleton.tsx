import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface MessageSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const MessageSkeleton: FC<MessageSkeletonProps> = ({ className, ...props }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>Assistente</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1.5">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </CardContent>
    </Card>
  );
};

export default MessageSkeleton;
