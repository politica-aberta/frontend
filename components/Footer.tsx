import { cn } from "@/lib/utils";
import { InstagramIcon, LinkedinIcon, Smile, TwitterIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";


const cols = [
  {
    title: "Navegar",
    links: [
      { title: "Conversar", href: "/chat" },
      { title: "Funcionalidades", href: "/#features" },
      { title: "Perguntas Frequentes", href: "/#faq" },
    ],
  },
  {
    title: "Sobre",
    links: [{ title: "Equipa", href: "/about" }],
  },
  {
    title: "Contactos",
    links: [{ title: "Email", href: "mailto:hello@politica-aberta.pt" }],
  },
];

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Footer({ className, ...props }: FooterProps) {
  return (
    <footer className={cn("max-w-5xl lg:mx-auto mx-6", className)}>
      <div className="py-8 grid grid-cols-2 lg:grid-cols-4">
        {cols.map((col, index) => (
          <div key={index} className="pt-12">
            <h2 className="text-md font-bold">{col.title}</h2>
            <div className="pt-3 flex flex-col  space-y-4  lg:space-y-1">
              {col.links.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  className="inline text-description hover:text-foreground w-fit"
                  href={link.href}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-col pt-12">
          <h2 className="text-md font-bold mb-3">Gostas do projeto?</h2>
          <Link
            href="https://donate.stripe.com/3csbLi47Rb5S8AU144"
            target="_blank"
            className={cn(buttonVariants(), "w-fit")}
          >
            Contribui <span className="ml-2">❤️</span>
          </Link>
        </div>
      </div>
      <div className="bosder-t pt-16 pb-8">
        <div className="inline-flex gap-4">
          <Smile size={36} className="self-center" />
          <h1 className="text-3xl font-bold">Política Aberta</h1>
          <div className="gap-4 md:ml-10 hidden md:inline-flex">
            <a href="https://instagram.com/chatpoliticaaberta" target="_blank"><InstagramIcon /></a>
            <a href="https://x.com/politica_aberta" target="_blank"><XIcon/></a>
            <a href="https://www.linkedin.com/company/pol%C3%ADtica-aberta/" target="_blank"><LinkedinIcon/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
