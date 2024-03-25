import {
  Translation,
  Lemmatization,
  UserId,
  SentenceList,
  WordWithCountList,
  Word,
} from "@/api/lib/domain";

export abstract class ILemmatizationService {
  abstract lemmatize(translation: Translation): Promise<Lemmatization>;
  abstract save(lemmatization: Lemmatization, userId: UserId): Promise<void>;
  abstract getTopWords(userId: UserId): Promise<WordWithCountList>;
  abstract getSentenceListByWord(
    word: Word,
    userId: UserId
  ): Promise<SentenceList>;
}
