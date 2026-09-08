import { respond } from "@/lib/assistant-runtime";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function POST(request: Request) {
  return respond(request);
}
