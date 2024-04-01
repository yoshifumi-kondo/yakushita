import { LemmatizationId } from "@/api/lib/domain";
import { lemmatizeAndCountFromDraft } from "@/api/feature/common/usecase";

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.id) {
    return new Response("Bad Request", { status: 400 });
  }
  await lemmatizeAndCountFromDraft.execute(new LemmatizationId(body.id));

  return new Response("OK", { status: 200 });
}
