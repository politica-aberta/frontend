import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/Provider";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";


const defaultUrl = process.env.NODE_ENV === "development"
  ? "http://localhost:3000"
  : "https://politica-aberta.pt"

export const metadata = {
  metadataBase: defaultUrl,
  title: "Política Aberta",
  description: "Aproxima-te da democracia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={GeistSans.className}>
      <head>
        <script defer data-domain="politica-aberta.pt" src="https://analytics.politica-aberta.pt/js/script.js"></script>        
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
