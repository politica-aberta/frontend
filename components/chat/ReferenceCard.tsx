"use client";

import { FC, useState } from "react";
import Link from "next/link";

import { Viewer } from "@react-pdf-viewer/core";
import {
  RenderZoomInProps,
  RenderZoomOutProps,
  zoomPlugin,
} from "@react-pdf-viewer/zoom";
import { highlightPlugin, Trigger, HighlightArea as HighlightAreaType } from '@react-pdf-viewer/highlight';
import type { RenderHighlightsProps } from '@react-pdf-viewer/highlight';
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

const ReferencesCard: FC<ReferencesCardProps> = ({ className, ...props }) => {
  const [open, setOpen] = useState<boolean>(true);
  const party = parties.find(
    (party) => party.id === props.reference?.party.toLowerCase()
  )!;
  // const referencePages = props.reference?.pages; //.sort((a, b) => a - b);
  const pageNumbers = props.reference? Object.keys(props.reference?.pages).map(Number) : [];


  const pageNavigationPluginInstance = pageNavigationPlugin({
    enableShortcuts: false,
  });
  const zoomPluginInstance = zoomPlugin({ enableShortcuts: false });
  const { ZoomIn, ZoomOut } = zoomPluginInstance;


  let highlightAreas: HighlightAreaType[] = [];
  if (props.reference) {
    Object.entries(props.reference.pages).forEach(([page, areas]) => {
      const pageIndex = parseInt(page) - 1;
      areas.forEach((area) => {
        highlightAreas.push({
          pageIndex,
          left: area[0],
          top: area[1],
          width: area[2],
          height: area[3],
        });
      });
    });
  }

  const renderHighlights = (props: RenderHighlightsProps) => (
    <div>
        {highlightAreas
            .filter((area) => area.pageIndex === props.pageIndex)
            .map((area, idx) => (
                <div
                    key={idx}
                    className="highlight-area"
                    style={Object.assign(
                        props.getCssProperties(area, props.rotation)
                    )}
                />
            ))}
    </div>
  );

  const highlightPluginInstance = highlightPlugin({
      renderHighlights,
      trigger: Trigger.None,
  });

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
                {pageNumbers?.map((pageNum) => (
                  <Button
                    key={pageNum}
                    variant={"secondary"}
                    onClick={() => {
                      pageNavigationPluginInstance.jumpToPage(pageNum - 1);
                    }}
                  >
                    {pageNum}
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
          open && props.reference && ( // maybe delete the props.reference later
            <CollapsibleContent className="overflow-hidden h-[84vh]">
              <Viewer
                initialPage={pageNumbers ? pageNumbers[0] - 1 : 0}
                theme={"auto"}
                fileUrl={props.reference!.document}
                plugins={[pageNavigationPluginInstance, zoomPluginInstance, highlightPluginInstance]}
              />
            </CollapsibleContent>
          )
        }
      </div>
    </Collapsible>
  );
};

export default ReferencesCard;