import { getSession } from "next-auth/react";
import {
  Language,
  LanguagesType,
  PartOfSpeech,
  Text,
  UserId,
  Word,
} from "@/api/lib/domain";
import { IncomingHttpHeaders } from "http";
import { GetSentenceListByWord } from "@/api/usecase/translate/GetSentenceListByWord";

export async function GET(request: Request) {
  const headers: IncomingHttpHeaders = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  const session = await getSession({ req: { headers } });
  if (!session || !session.userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const wordRow = searchParams.get("word");
  const partOfSpeechRow = searchParams.get("partOfSpeech");
  if (!wordRow || !partOfSpeechRow) {
    return new Response("Bad Request", { status: 400 });
  }
  const partOfSpeech = PartOfSpeech.fromString(partOfSpeechRow);
  if (!partOfSpeech) {
    return new Response("Bad Request", { status: 400 });
  }
  const word = new Word(
    new Text(wordRow),
    new Language(LanguagesType.ENGLISH),
    partOfSpeech
  );

  const result = await GetSentenceListByWord(word, new UserId(session.userId));
  const res = result ? result.toJSON() : [];
  return new Response(JSON.stringify(res), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
