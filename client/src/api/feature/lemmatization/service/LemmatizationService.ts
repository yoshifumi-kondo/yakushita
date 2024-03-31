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
    try {
      const wordList = await this.lemmatizeAdapter.lemmatize(
        draft.source,
        draft.language
      );
      return LemmatizedLemmatization.create(draft, wordList);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to lemmatize text: ${error.message}`);
      }
      throw error;
    }
  }
  async save(lemmatization: Lemmatization) {
    try {
      await this.lemmatizationRepository.save(lemmatization);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to save lemmatization: ${error.message}`);
      }
      throw error;
    }
  }
  async getAllLemmatizedByWord(word: Word, userId: UserId) {
    try {
      return await this.lemmatizationRepository.getAllLemmatizedByWord(
        word,
        userId
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to get all lemmatized by word: ${error.message}`
        );
      }
      throw error;
    }
  }
}
