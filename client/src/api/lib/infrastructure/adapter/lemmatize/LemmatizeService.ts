import {
  Translation,
  Language,
  LanguagesType,
  Lemmatization,
  UserId,
  Word,
} from "@/api/lib/domain";
import { LemmatizeAdopter } from "@/api/lib/infrastructure/adapter/lemmatize/LemmatizeAdopter";
import { ILemmatizationRepository } from "@/api/lib/repository/ILemmatizationRepository";
import { ILemmatizationService } from "@/api/service/lemmatization/ILemmatizationService";

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
    try {
      return await this.lemmatizationRepository.getTopWordList(userId, 30);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to get top words: ${error.message}`);
      }
      throw error;
    }
  }
  async getSentencesByWord(word: Word, userId: UserId) {
    try {
      const wordList = await this.lemmatizationRepository.getSentenceListByWord(
        word,
        userId
      );
      return wordList;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to get sentences by word: ${error.message}`);
      }
      throw error;
    }
  }
}
