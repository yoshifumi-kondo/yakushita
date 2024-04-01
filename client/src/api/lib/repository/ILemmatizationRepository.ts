import type {
  DraftLemmatization,
  Lemmatization,
  LemmatizationId,
  LemmatizedLemmatizationList,
  UserId,
  Word,
} from "@/api/lib/domain";

export abstract class ILemmatizationRepository {
  abstract save(lemmatization: Lemmatization): Promise<void>;
  abstract update(lemmatization: Lemmatization): Promise<void>;
  abstract getAllLemmatizedByWord(
    word: Word,
    userId: UserId
  ): Promise<LemmatizedLemmatizationList>;
  abstract getDraftById(
    lemmatizationId: LemmatizationId
  ): Promise<DraftLemmatization>;
}
