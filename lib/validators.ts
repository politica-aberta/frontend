import { z } from "zod";
import { parties } from "./constants";

const partyValues = parties.map((p) => p.id);

export const CreateConversationValidator = z.object({
  party: z.enum(partyValues as [string, ...string[]]),
});

export const CreateConversationResponseValidator = z.object({
  id: z.string().uuid(),
  entity: z.string(),
});

export const LoginUserValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must have atleast 6 characters"),
});

export const CreateUserValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must have atleast 6 characters"),
  name: z.string().min(2),
});

export const LLamaIndexChatValidator = z.object({
  role: z.string(),
  content: z.string(),
});

export const ChatValidator = z.object({
  political_party: z.string(),
  chat: z.string(),
});

export const ChatCoordinateValidator = z.object({
  file_name: z.string(),
  page_label: z.string(),
});

export const ChatResponseValidator = z.object({
  answer: z.string(),
  coordinates: z.array(ChatCoordinateValidator),
});

export type CreateUserPayload = z.infer<typeof CreateUserValidator>;

export type LoginUserPayload = z.infer<typeof LoginUserValidator>;

export type CreateConversationPayload = z.infer<
  typeof CreateConversationValidator
>;

export type CreateConversationResponse = z.infer<
  typeof CreateConversationResponseValidator
>;

export type LLamaIndexChatPayload = z.infer<typeof LLamaIndexChatValidator>;

export type ChatPayload = z.infer<typeof ChatValidator>;

export type ChatResponse = z.infer<typeof ChatResponseValidator>;
