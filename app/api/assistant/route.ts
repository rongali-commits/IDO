import { env } from "cloudflare:workers";
import { assistantInstructions, knowledgeFor } from "@/lib/assistant-knowledge";
import { handleAssistant, type AssistantEnv } from "@/lib/assistant-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function POST(request: Request) {
  return handleAssistant(request, env as unknown as AssistantEnv, assistantInstructions, knowledgeFor);
}
