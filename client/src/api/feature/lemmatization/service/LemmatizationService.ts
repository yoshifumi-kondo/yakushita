import {
  type Lemmatization,
  type UserId,
  type DraftLemmatization,
  LemmatizedLemmatization,
  type Word,
} from "@/api/lib/domain";
import type { LemmatizeAdopter } from "@/api/infrastructure/adapter/lemmatize/LemmatizeAdopter";
import type { ILemmatizationRepository } from "@/api/lib/repository/ILemmatizationRepository";
import type { ILemmatizationService } from "@/api/feature/lemmatization/service/ILemmatizationService";

export class LemmatizationService implements ILemmatizationService {
  constructor(
    private lemmatizeAdapter: LemmatizeAdopter,
    private lemmatizationRepository: ILemmatizationRepository
  ) {}
  async lemmatize(draft: DraftLemmatization) {
    const wordList = await this.lemmatizeAdapter.lemmatize(
      draft.source,
      draft.language
    );
    return LemmatizedLemmatization.create(draft, wordList);
  }
  async save(lemmatization: Lemmatization) {
    await this.lemmatizationRepository.save(lemmatization);
  }
  async getAllLemmatizedByWord(word: Word, userId: UserId) {
    return await this.lemmatizationRepository.getAllLemmatizedByWord(
      word,
      userId
    );
  }
}
