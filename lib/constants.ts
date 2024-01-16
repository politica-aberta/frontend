import { Party } from "@/lib/types";
import { FAQQuestion } from "@/lib/types";

export const parties: Party[] = [
  {
    id: "be",
    path: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/be-legislativas22.pdf",
    title: "Bloco de Esquerda",
    subtitle: "Programa eleitoral (2022)",
  },
  {
    id: "chega",
    path: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/chega-legislativas22.pdf",
    title: "Partido Chega",
    subtitle: "Programa eleitoral (2022)",
  },
  {
    id: "il",
    path: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/il-legislativas22.pdf",
    title: "Iniciativa Liberal",
    subtitle: "Programa eleitoral (2022)",
  },
  {
    id: "l",
    path: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/livre-legislativas22.pdf",
    title: "Partido Livre",
    subtitle: "Programa eleitoral (2022)",
  },
  {
    id: "pan",
    path: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/pan-legislativas22.pdf",
    title: "Partido Animais e Natureza",
    subtitle: "Programa eleitoral (2022)",
  },
  {
    id: "pcp",
    path: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/pcp-legislativas22.pdf",
    title: "Partido Comunista Português",
    subtitle: "Programa eleitoral (2022)",
  },
  {
    id: "ps",
    path: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/ps-legislativas22.pdf",
    title: "Partido Socialista",
    subtitle: "Programa eleitoral (2022)",
  },
  {
    id: "psd",
    path: "https://dzwdgfmvuevjqjutrpye.supabase.co/storage/v1/object/public/documents/psd-legislativas22.pdf",
    title: "Partido Social Democrata",
    subtitle: "Programa eleitoral (2022)",
  },
];

export const faq: FAQQuestion[] = [
  {
    question: "O que é o Política Aberta?",
    answer:
      "O Política Aberta foi concebido para enriquecer modelos semelhantes ao ChatGPT com dados políticos. Utilizamos as promessas feitas por partidos políticos durante as eleições para augmentar a informação disponível no nosso modelo.",
  },
  {
    question: "Como funciona o sistema?",
    answer:
      "Para cada eleição, os partidos políticos produzem documentos que declaram as suas agendas e promessas. Alimentamos o nosso modelo com esses documentos, ajudando a fornecer respostas precisas e contextualizadas relacionadas a questões políticas.",
  },
  {
    question: "Com que frequência os dados políticos são atualizados?",
    answer:
      "Esforçamo-nos para atualizar os nossos dados políticos assim que estiverem disponíveis, no futuro planeamos integrar vários tipos de documentos além das promessas legislativas.",
  },
  {
    question: "Como posso confiar na informação fornecida pelo modelo?",
    answer:
      "A informação fornecida pelo nosso modelo baseia-se diretamente nos documentos produzidos pelos partidos políticos. Contudo, como todos os modelos de AI, é fundamental verificar qualquer informação crucial com fontes fidedignas e confiáveis.",
  },

  {
    question: "Posso dar feedback ou reportar imprecisões?",
    answer:
      "Absolutamente! O feedback dos utilizadores é fundamental para a nossa melhoria contínua. Se detetar discrepâncias ou tiver sugestões, por favor, contacte-nos através dos meios de contacto disponíveis na página.",
  },
  {
    question: "Posso contribuir ou colaborar com o Política Aberta?",
    answer:
      "Estamos sempre abertos a colaborações e contribuições. Se possuir expertise ou recursos que possam beneficiar a nossa plataforma, por favor, entre em contacto através dos meios de contacto disponíveis na página.",
  },
  {
    question: "Qual é o plano futuro para o Política Aberta?",
    answer:
      "A nossa visão é atualizar continuamente o modelo com dados políticos de todo o mundo, tornando-o a plataforma de eleição para insights e compreensão política.",
  },
];

export const max_usage: number = 50;
