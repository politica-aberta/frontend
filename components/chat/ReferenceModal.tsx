"use client";

import { useState } from "react";
import Link from "next/link";

import { Modal, Viewer } from "@react-pdf-viewer/core";
import {
  RenderZoomInProps,
  RenderZoomOutProps,
  zoomPlugin,
} from "@react-pdf-viewer/zoom";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronsLeft,
  ChevronsRight,
  Download,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
} from "lucide-react";

import { Reference } from "@/lib/types";
import { cn } from "@/lib/utils";
import { parties } from "@/lib/constants";

interface ReferencesCardProps extends React.HTMLAttributes<HTMLDivElement> {
  reference: Reference | null;
}

export function ReferencesModal({ className, ...props }: ReferencesCardProps) {
  const [open, setOpen] = useState<boolean>(true);
  const party = parties.find((party) => party.id === props.reference?.party.toLowerCase())!;
  const referencePages = props.reference?.pages.sort((a, b) => a - b);

  const pageNavigationPluginInstance = pageNavigationPlugin({
    enableShortcuts: false,
  });
  const zoomPluginInstance = zoomPlugin({ enableShortcuts: false });
  const { ZoomIn, ZoomOut } = zoomPluginInstance;

  return (
    <Modal
    isOpened={open}
    closeOnClickOutside={true}
    closeOnEscape={true}
    content={}
    />
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn(
        "h-screen -mt-16 pt-16",
        "data-[state=open]:w-1/2",
        className,
        
      )}
    >
      <div className="h-full border-l">
        <div className="flex flex-row items-center mx-8 h-24">
          <CollapsibleTrigger
            className={buttonVariants({ variant: "ghost" })}
            disabled={props.reference === null}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {open ? <ChevronsRight /> : <ChevronsLeft />}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to library</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
        {
          /* # FIXME ideally h would go flush with the viewport end*/
          open && (
            <CollapsibleContent className="overflow-hidden h-[84vh]">
              <Viewer
                initialPage={referencePages ? referencePages[0] - 1 : 0}
                theme={"auto"}
                fileUrl={props.reference!.document}
                plugins={[pageNavigationPluginInstance, zoomPluginInstance]}
              />
            </CollapsibleContent>
          )
        }
      </div>
    </Collapsible>
  );
}

export default ReferencesCard;
