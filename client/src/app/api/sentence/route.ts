import {
  Language,
  LanguagesType,
  PartOfSpeech,
  Text,
  Word,
} from "@/api/lib/domain";
import { getSentenceListByWord } from "@/api/feature/lemmatization/usecase";
import { getUserIdFromSession } from "@/api/utils/getUserIdFromSession";
export async function GET(request: Request) {
  try {
    const userId = await getUserIdFromSession(request);
    if (!userId) {
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

    const result = await getSentenceListByWord.execute(word, userId);

    const res = result ? result.toJSON() : [];

    return new Response(
      JSON.stringify({ userId: userId.toJSON(), sentences: res }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
