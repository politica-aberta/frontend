import { cn } from "@/lib/utils";
import { Smile } from "lucide-react";
import Link from "next/link";

const cols = [
  {
    title: "Navegar",
    links: [
      { title: "Conversar", href: "/chat" },
      { title: "Funcionalidades", href: "#features" },
      { title: "Perguntas Frequentes", href: "#faq" },
    ],
  },
  {
    title: "Sobre",
    links: [{ title: "Equipa", href: "/about" }],
  },
  {
    title: "Contactos",
    links: [
      { title: "Email", href: "mailto:info@smptech.pt" },
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com/company/smp-technologies/",
      },
    ],
  },
];

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Footer({ className, ...props }: FooterProps) {
  return (
    <footer className={cn("max-w-5xl lg:mx-auto mx-6", className)}>
      <div className="py-8 grid grid-cols-3">
        {cols.map((col, index) => (
          <div key={index}>
            <h2 className="text-md font-bold">{col.title}</h2>
            <div className="pt-3 flex flex-col  space-y-4  lg:space-y-1">
              {col.links.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  className="inline text-description hover:text-foreground"
                  href={link.href}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bosder-t pt-16 pb-8">
        <div className="inline-flex gap-4">
          <Smile size={36} className="self-center" />
          <h1 className="text-3xl font-bold">Política Aberta</h1>
        </div>
      </div>
    </footer>
  );
}
