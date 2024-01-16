"use client";

import Link from "next/link";

import { Viewer } from "@react-pdf-viewer/core";
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
  Download,
  MoreHorizontal,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Reference } from "@/lib/types";
import { cn } from "@/lib/utils";
import { parties } from "@/lib/constants";
import { FC } from "react";

interface ReferenceModalProps extends React.HTMLAttributes<HTMLDivElement> {
  reference: Reference | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReferenceModal: FC<ReferenceModalProps> = ({ className, ...props }) => {
  const party = parties.find(
    (party) => party.id === props.reference?.party.toLowerCase()
  )!;
  const referencePages = props.reference?.pages.sort((a, b) => a - b);

  const pageNavigationPluginInstance = pageNavigationPlugin({
    enableShortcuts: false,
  });
  const zoomPluginInstance = zoomPlugin({ enableShortcuts: false });
  const { ZoomIn, ZoomOut } = zoomPluginInstance;

  return (
    <Sheet open={props.open} onOpenChange={props.setOpen}>
      {/* open controlled by the popover, seems to not work without dummy trigger*/}
      <SheetTrigger className="hidden">X</SheetTrigger>
      <SheetContent className={cn("w-full px-0", className)}>
        {props.reference && (
          <>
            <SheetHeader className="flex flex-row justify-between pb-4 px-6">
              <div className="pt-10 text-left flex flex-col space-y-1.5">
                <h1 className="text-xl font-semibold leading-none tracking-tight">
                  {party.title}
                </h1>
                <h2 className="text-description">{party.subtitle}</h2>
              </div>
              <DropdownMenu>
                {/* #FIXME for some reason this button spans more than it should
                margins dont work properly */}
                <DropdownMenuTrigger
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    " h-auto justify-end items-end pr-0 "
                  )}
                >
                  <MoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" alignOffset={-10}>
                  <DropdownMenuLabel>Páginas</DropdownMenuLabel>
                  <ul className="flex flex-col space-y-2 pb-2">
                    {referencePages?.map((page) => (
                      <Button
                        className="mx-2"
                        key={page}
                        variant={"secondary"}
                        size={"sm"}
                        onClick={() => {
                          pageNavigationPluginInstance.jumpToPage(page - 1);
                        }}
                      >
                        {page}
                      </Button>
                    ))}
                  </ul>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <ZoomIn>
                      {(props: RenderZoomInProps) => (
                        <Button
                          variant={"ghost"}
                          onClick={props.onClick}
                          className="p-0 flex flex-row justify-between grow px-4 "
                        >
                          <p>Aumentar</p>
                          <ZoomInIcon className="ml-2" size={20} />
                        </Button>
                      )}
                    </ZoomIn>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ZoomOut>
                      {(props: RenderZoomOutProps) => (
                        <Button
                          variant={"ghost"}
                          onClick={props.onClick}
                          className="p-0 flex flex-row justify-between grow px-4 "
                        >
                          <p>Diminuir</p>
                          <ZoomOutIcon className="ml-2" size={20} />
                        </Button>
                      )}
                    </ZoomOut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href={party.path}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "p-0 flex flex-row justify-between grow px-4"
                      )}
                      download
                      rel="noopener noreferrer"
                      target="_blank"
                      prefetch={false}
                    >
                      <p>Download</p>
                      <Download className="ml-2" size={20} />
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SheetHeader>

            <Viewer
              initialPage={referencePages ? referencePages[0] - 1 : 0}
              theme={"auto"}
              fileUrl={props.reference!.document}
              plugins={[pageNavigationPluginInstance, zoomPluginInstance]}
            />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ReferenceModal;
