import { Word, UserId, SentenceList } from "@/api/lib/domain";
import { getSession } from "next-auth/react";
import { Language, LanguagesType, PartOfSpeech, Text } from "@/api/lib/domain";
import { IncomingHttpHeaders } from "http";
import { IGetSentenceListByWord } from "@/api/feature/lemmatization/usecase/getSentenceListByWord/IGetSentenceListByWord";

export interface IGetSentenceListByWordController {
  execute(request: Request): Promise<Response>;
}

export class GetSentenceListByWordController
  implements IGetSentenceListByWordController
{
  constructor(
    private readonly getSentenceListByWordUsecase: IGetSentenceListByWord
  ) {}

  async execute(request: Request): Promise<Response> {
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
    const userId = new UserId(session.userId);

    const result = await this.getSentenceListByWord(word, userId);
    const res = result ? result.toJSON() : [];

    return new Response(JSON.stringify(res), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  async getSentenceListByWord(word: Word, userId: UserId) {
    return await this.getSentenceListByWordUsecase.execute(word, userId);
  }
}
