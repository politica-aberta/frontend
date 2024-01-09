import { z } from "zod";
import { parties } from "./constants";

const partyValues = parties.map((p) => p.id);

export const CreateConversationValidator = z.object({
  party: z.enum(partyValues as [string, ...string[]]),
});

export const CreateConversationResponseValidator = z.object({
  id: z.string().uuid(),
  party: z.string(),
});

export const LoginUserValidator = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const CreateUserValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must have atleast 6 characters"),
  name: z.string().min(2),
});


export const MessageValidator = z.object({
  role: z.string(),
  message: z.string(),
});


export const ChatValidator = z.object({
  party: z.string(),
  message: z.string(),
  previous_messages: z.array(MessageValidator),
});

export const ReferenceValidator = z.object({
  party: z.string(),
  document: z.string(),
  pages: z.array(z.number()),
});

export const ChatResponseValidator = z.object({
  role: z.string(),
  message: z.string(),
  references: z.array(ReferenceValidator), // FIXME change this to an array in multi party configs
});



export type CreateUserPayload = z.infer<typeof CreateUserValidator>;

export type LoginUserPayload = z.infer<typeof LoginUserValidator>;

export type CreateConversationPayload = z.infer<
  typeof CreateConversationValidator
>;

export type CreateConversationResponse = z.infer<
  typeof CreateConversationResponseValidator
>;

export type MessagePayload = z.infer<typeof MessageValidator>;

export type ChatPayload = z.infer<typeof ChatValidator>;

export type ChatResponse = z.infer<typeof ChatResponseValidator>;
