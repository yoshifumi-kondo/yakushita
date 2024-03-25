import {
  Translation,
  Language,
  LanguagesType,
  Lemmatization,
  User,
  UserId,
  Word,
} from "@/api/lib/domain";
import { LemmatizeAdopter } from "@/api/infrastructure/adapter/lemmatize/LemmatizeAdopter";
import { ILemmatizationRepository } from "@/api/lib/repository/ILemmatizationRepository";
import { ILemmatizationService } from "@/api/feature/lemmatization/service/ILemmatizationService";

export class LemmatizationService implements ILemmatizationService {
  constructor(
    private lemmatizeAdapter: LemmatizeAdopter,
    private lemmatizationRepository: ILemmatizationRepository
  ) {}
  async lemmatize(translation: Translation) {
    try {
      const target = translation.getTextByLanguage(
        new Language(LanguagesType.ENGLISH)
      );
      const lemmatization = await this.lemmatizeAdapter.lemmatizeForEnglish(
        target
      );
      return lemmatization;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to lemmatize text: ${error.message}`);
      }
      throw error;
    }
  }
  async save(lemmatization: Lemmatization, userId: UserId) {
    try {
      await this.lemmatizationRepository.save(lemmatization, userId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to save lemmatization: ${error.message}`);
      }
      throw error;
    }
  }

  async getTopWords(userId: UserId) {
    return await this.lemmatizationRepository.getTopWordList(userId, 30);
  }
  async getSentenceListByWord(word: Word, userId: UserId) {
    try {
      const sentenceList =
        await this.lemmatizationRepository.getSentenceListByWord(word, userId);
      if (!sentenceList) {
        throw new Error("Sentence list not found");
      }
      return sentenceList;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to get sentences by word: ${error.message}`);
      }
      throw error;
    }
  }
}
