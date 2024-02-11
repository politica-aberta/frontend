export type FAQQuestion = {
  question: string;
  answer: string;
};

export type Party = {
  id: string;
  path: string;
  title: string;
  subtitle: string;
};

export type Message = {
  role: string;
  message: string;
  references: Reference[] | null; // FIXME change this to an array in multi party configs
};

type HighlightArea = [number, number, number, number];

type Page = Record<number, HighlightArea[]>;

export type Reference = {
  party: string;
  document: string;
  pages: Page;
};