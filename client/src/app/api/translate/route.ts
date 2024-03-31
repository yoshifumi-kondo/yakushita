import {
  FromTo,
  Language,
  Text,
  Original,
  TranslationConfig,
  LanguagesType,
} from "@/api/lib/domain";
import { getUserIdFromSession } from "@/api/utils/getUserIdFromSession";
import { translateWithLemmatizationAndCount } from "@/api/feature/common/usecase";

export async function POST(request: Request) {
  const userId = await getUserIdFromSession(request);
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const body = await request.json();
  const result = await translateWithLemmatizationAndCount.execute(
    userId,
    new TranslationConfig(
      new FromTo(new Language(body.from), new Language(body.to))
    ),
    new Original(new Text(body.text), new Language(LanguagesType.JAPANESE)),
    new Language(LanguagesType.ENGLISH)
  );
  return Response.json({ translated: result.toJSON().translated.text });
}

// async function translate(text: string) {
//   await sleep(1000);
//   return "translated: " + text;
// }

// async function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
