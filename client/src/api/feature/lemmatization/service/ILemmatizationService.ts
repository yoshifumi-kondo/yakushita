import type {
  Lemmatization,
  UserId,
  Word,
  DraftLemmatization,
  LemmatizedLemmatization,
  LemmatizedLemmatizationList,
} from "@/api/lib/domain";

export abstract class ILemmatizationService {
  abstract lemmatize(
    draft: DraftLemmatization
  ): Promise<LemmatizedLemmatization>;
  abstract save(lemmatization: Lemmatization): Promise<void>;
  abstract getAllLemmatizedByWord(
    word: Word,
    userId: UserId
  ): Promise<LemmatizedLemmatizationList>;
}
