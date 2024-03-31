import type {
  Lemmatization,
  LemmatizedLemmatizationList,
  UserId,
  Word,
} from "@/api/lib/domain";

export abstract class ILemmatizationRepository {
  abstract save(lemmatization: Lemmatization): Promise<void>;
  abstract getAllLemmatizedByWord(
    word: Word,
    userId: UserId
  ): Promise<LemmatizedLemmatizationList>;
}
