import type {
  Lemmatization,
  UserId,
  Word,
  DraftLemmatization,
  LemmatizedLemmatization,
  LemmatizedLemmatizationList,
  LemmatizationId,
} from "@/api/lib/domain";

export abstract class ILemmatizationService {
  abstract lemmatize(
    draft: DraftLemmatization
  ): Promise<LemmatizedLemmatization>;
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
