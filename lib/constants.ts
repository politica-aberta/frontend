import { Party } from "@/lib/types";
import { FAQQuestion } from "@/lib/types";

import BE from "@/images/parties/be-removebg-preview.png";
import Chega from "@/images/parties/chega.png";
import IL from "@/images/parties/il.png";
import Livre from "@/images/parties/livre.png";
import PAN from "@/images/parties/pan.png";
import PCP from "@/images/parties/cdu-removebg-preview.png";
import PS from "@/images/parties/ps.png";
import PSD from "@/images/parties/ad.png";

export const parties: Party[] = [
  {
    id: "be",
    path: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/be-legislativas24.pdf",
    title: "Bloco de Esquerda",
    subtitle: "Programa eleitoral (2024)",
    logo: BE,
    height: 60,
    width: 80,
  },
  {
    id: "chega",
    path: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/chega-legislativas24.pdf",
    title: "Partido Chega",
    subtitle: "Programa eleitoral (2024)",
    logo: Chega,
    height: 60,
    width: 80,
  },
  {
    id: "il",
    path: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/il-legislativas24.pdf",
    title: "Iniciativa Liberal",
    subtitle: "Programa eleitoral (2024)",
    logo: IL,
    height: 60,
    width: 80,
  },
  {
    id: "l",
    path: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/l-legislativas24.pdf",
    title: "Partido Livre",
    subtitle: "Programa eleitoral (2024)",
    logo: Livre,
    height: 60,
    width: 80,
  },
  {
    id: "pan",
    path: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/pan-legislativas24.pdf",
    title: "Partido Animais e Natureza",
    subtitle: "Programa eleitoral (2024)",
    logo: PAN,
    height: 60,
    width: 80,
  },
  {
    id: "cdu",
    path: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/pcp-legislativas24.pdf",
    title: "Coligação Democrática Unitária",
    subtitle: "Programa eleitoral (2024)",
    logo: PCP,
    height: 100,
    width: 120,
  },
  {
    id: "ps",
    path: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/ps-legislativas24.pdf",
    title: "Partido Socialista",
    subtitle: "Programa eleitoral (2024)",
    logo: PS,
    height: 60,
    width: 80,
  },
  {
    id: "ad",
    path: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/psd-legislativas24.pdf",
    title: "Aliança Democrática",
    subtitle: "Programa eleitoral (2024)",
    logo: PSD,
    height: 70,
    width: 100,
  },
];

export const faq: FAQQuestion[] = [
  {
    question: "O que é o Política Aberta?",
    answer:
      "O Política Aberta é um projeto que permite a modelos semelhantes ao ChatGPT obter dados políticos fidedignos. Desta forma, utilizamos as promessas feitas por partidos políticos durante as eleições para complementar a informação disponível no nosso modelo.",
  },
  {
    question: "Como funciona o sistema?",
    answer:
      "Para cada eleição, os partidos políticos produzem documentos que declaram as suas agendas e promessas. Alimentamos o nosso modelo com esses documentos, ajudando a fornecer respostas precisas e contextualizadas relacionadas com as questões políticas nas quais os utilizadores estão interessados.",
  },
  {
    question: "Com que frequência os dados políticos são atualizados?",
    answer:
      "Esforçamo-nos para atualizar os nossos dados políticos assim que se encontrarem disponíveis, no futuro planeamos integrar vários tipos de documentos além das promessas legislativas.",
  },
  {
    question: "Como posso confiar na informação fornecida pelo modelo?",
    answer:
      "A informação fornecida pelo nosso modelo baseia-se diretamente nos documentos produzidos pelos partidos políticos. Dito isto, existe sempre margem para erros, pelo que na dúvida convém confirmar com fontes oficiais.",
  },

  {
    question: "Posso contribuir ou colaborar com o projeto Política Aberta?",
    answer:
      "Absolutamente! Estamos sempre abertos a colaborações e contribuições. Se possuir conhecimentos ou recursos que possam beneficiar a nossa plataforma, por favor, entre em contacto através dos meios de contacto disponíveis na página.",
  },

  {
    question: "Quais são os planos futuros do projeto Política Aberta?",
    answer:
      "A nossa visão é atualizar continuamente o modelo com dados políticos de todo o mundo, tornando o projeto numa das plataformas de eleição para facilitar a compreensão das questões políticas.",
  },
];

export const max_usage: number = 50;
