import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/Provider";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { getFrontendURL } from "@/lib/utils";

export const metadata = {
  metadataBase: getFrontendURL(),
  title: "Política Aberta",
  description:
    "Onde te aproximas dos valores democráticos do nosso país. Chat bot que te responde sobre as ideias dos partidos políticos portugueses.",
  openGraph: {
    title: "Política Aberta",
    description:
      "Onde te aproximas dos valores democráticos do nosso país. Chat bot que te responde sobre as ideias dos partidos políticos portugueses.",
    url: "https://politica-aberta.pt",
    // set time now
    published_time: new Date().toISOString(),
    author: "Projeto Política Aberta",
  },
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={GeistSans.className}>
      <head>
        <script
          defer
          data-domain="politica-aberta.pt"
          src="https://cebolas.politica-aberta.pt/js/script.js"
        ></script>
      </head>
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="">
            <Header />
            {children}
          </main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
