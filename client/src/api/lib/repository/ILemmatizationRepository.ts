import { Lemmatization, UserId, Word, WordList } from "@/api/lib/domain";
import { Sentence } from "@/api/lib/domain/lemmatization/Sentence";
import { SentenceList } from "@/api/lib/domain/lemmatization/SentenceList";
import { WordWithCountList } from "@/api/lib/domain/lemmatization/WordWithCountList";

export abstract class ILemmatizationRepository {
  abstract save(lemmatization: Lemmatization, userId: UserId): Promise<void>;
  abstract getTopWordList(
    userId: UserId,
    limit: number
  ): Promise<WordWithCountList>;
  abstract getSentenceListByWord(
    word: Word,
    userId: UserId
  ): Promise<SentenceList | null>;
}
