import { env } from "cloudflare:workers";
import { assistantInstructions, knowledgeFor } from "./assistant-knowledge";
import { handleAssistant, type AssistantEnv } from "./assistant-server";

export function respond(request: Request) {
  return handleAssistant(request, env as unknown as AssistantEnv, assistantInstructions, knowledgeFor);
}
