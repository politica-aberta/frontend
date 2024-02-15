import { StaticImageData } from "next/image";

export type FAQQuestion = {
  question: string;
  answer: string;
};

export type Party = {
  id: string;
  path: string;
  title: string;
  subtitle: string;
  logo: StaticImageData;
  size?: string;
  height?: number;
  width?: number;
};

export type Message = {
  role: string;
  message: string;
  references: Reference[] | null; 
};

type HighlightArea = [number, number, number, number];

type Page = Record<number, HighlightArea[]>;

export type Reference = {
  party: string;
  document: string;
  pages: Page;
};
