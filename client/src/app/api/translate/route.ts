import { getSession } from "next-auth/react";
import {
  FromTo,
  Language,
  Text,
  LanguagesType,
  Original,
  TranslationConfig,
  UserId,
} from "@/api/lib/domain";
import { TransLateUseCase } from "@/api/usecase/translate/TranslateUseCase";
import { IncomingHttpHeaders } from "http";

export async function POST(request: Request) {
  const headers: IncomingHttpHeaders = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const session = await getSession({ req: { headers } });

  if (!session || !session.userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const result = await TransLateUseCase(
    new Original(new Text(body.text), new Language(LanguagesType.JAPANESE)),
    new TranslationConfig(
      new FromTo(
        new Language(LanguagesType.JAPANESE),
        new Language(LanguagesType.ENGLISH)
      )
    ),
    new UserId(session.userId)
  );
  return Response.json({ translated: result.toJSON().translated.text });
}

async function translate(text: string) {
  await sleep(1000);
  return "translated: " + text;
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
