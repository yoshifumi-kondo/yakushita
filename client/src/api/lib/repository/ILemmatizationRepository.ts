import { Lemmatization, UserId, WordList } from "@/api/lib/domain";
import { WordWithCountList } from "@/api/lib/domain/lemmatization/WordWithCountList";

export abstract class ILemmatizationRepository {
  abstract save(lemmatization: Lemmatization, userId: UserId): Promise<void>;
  abstract getTopWordList(
    userId: UserId,
    limit: number
  ): Promise<WordWithCountList>;
}
