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
  sender: string;
  text: string;
  reference: Reference | null;
};

export type Reference = {
  document: string;
  pages: number[];
};