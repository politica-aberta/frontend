import { z } from "zod";
import { parties } from "./constants";

const partyValues = parties.map((p) => p.id);

export const CreateConversationValidator = z.object({
  party: z.enum([ "multi", ...partyValues] as [string, ...string[]]),
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

const HighlightArea = z.tuple([z.number(), z.number(), z.number(), z.number()]);
const PagesValidator = z.record(z.array(HighlightArea)); 

export const ReferenceValidator = z.object({
  party: z.string(),
  document: z.string(),
  pages: PagesValidator,
});

export const MessageValidator = z.object({
  role: z.string(),
  message: z.string(),
  references: z.array(ReferenceValidator).nullable(),
});


export const ChatValidator = z.object({
  id: z.string().uuid(),
  party: z.enum(["multi", ...partyValues] as [string, ...string[]]),
  message: z.string(),
  previous_messages: z.array(MessageValidator),
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

export type MessageResponse = z.infer<typeof MessageValidator>;
