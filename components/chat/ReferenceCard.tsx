"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { parties } from "@/lib/constants";
import { Button, buttonVariants } from "@/components/ui/button";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import {
  ChevronsLeft,
  ChevronsRight,
  Download,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
} from "lucide-react";
import Link from "next/link";
import {
  RenderZoomInProps,
  RenderZoomOutProps,
  zoomPlugin,
} from "@react-pdf-viewer/zoom";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Viewer } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";

interface ReferencesCardProps extends React.HTMLAttributes<HTMLDivElement> {
  partyId: string;
  pages: number[] | undefined;
}

export function ReferencesCard({ className, ...props }: ReferencesCardProps) {
  const [open, setOpen] = React.useState<boolean>(false);

  // the following is always true
  const party = parties.find((party) => party.id === props.partyId)!;
  const referencePages = props.pages?.sort((a, b) => a - b);

  const pageNavigationPluginInstance = pageNavigationPlugin({
    enableShortcuts: false,
  });
  const zoomPluginInstance = zoomPlugin({ enableShortcuts: false });
  const { ZoomIn, ZoomOut } = zoomPluginInstance;

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn(
        "h-screen -mt-16 pt-16",
        "data-[state=open]:w-1/2",
        className
      )}
    >
      <div className="h-full border-l">
        <div className="flex flex-row items-center mx-8 h-24">
          <CollapsibleTrigger className={buttonVariants({ variant: "ghost" })}>
            {open ? <ChevronsRight /> : <ChevronsLeft />}
          </CollapsibleTrigger>
          {open && (
            <div className="flex flex-row justify-between items-center w-full ">
              <div className="component-header">
                <h1 className="text-title">{party.title}</h1>
                <h2 className="text-description">{party.subtitle}</h2>
              </div>

              <div className="space-x-2 flex items-center">
                {referencePages?.map((page) => (
                  <Button
                    key={page}
                    variant={"secondary"}
                    onClick={() => {
                      pageNavigationPluginInstance.jumpToPage(page - 1);
                    }}
                  >
                    {page}
                  </Button>
                ))}

                <ZoomIn>
                  {(props: RenderZoomInProps) => (
                    <Button variant={"ghost"} onClick={props.onClick}>
                      <ZoomInIcon className="" />
                    </Button>
                  )}
                </ZoomIn>
                <ZoomOut>
                  {(props: RenderZoomOutProps) => (
                    <Button variant={"ghost"} onClick={props.onClick}>
                      <ZoomOutIcon className="" />
                    </Button>
                  )}
                </ZoomOut>
                <Link
                  href={party.path}
                  className={buttonVariants({ variant: "ghost" })}
                  download
                  rel="noopener noreferrer"
                  target="_blank"
                  prefetch={false}
                >
                  <Download className="" />
                </Link>
              </div>
            </div>
          )}
        </div>
        {/* # FIXME ideally h would go flush with the viewport end*/}
        <CollapsibleContent className="overflow-hidden h-[84vh]">
          <Viewer
            initialPage={props.pages ? props.pages[0] - 1 : 0}
            theme={"auto"}
            fileUrl={party.path}
            plugins={[pageNavigationPluginInstance, zoomPluginInstance]}
          />
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export default ReferencesCard;
