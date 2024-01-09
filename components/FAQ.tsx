import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faq } from "@/lib/constants";

interface FAQProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function FAQ({ className, ...props }: FAQProps) {
  return (
    <div id="faq" className={cn("max-w-5xl lg:mx-auto mx-6", className)}>
      <h1 className="py-8 component-title text-center">Perguntas Frequentes</h1>

      <Accordion type="single" collapsible className="">
        {faq.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
