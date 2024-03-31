import type { ITranslationService } from "@/api/feature/translation/service/ITranslationService";

import type { OpenAiAdapter } from "@/api/infrastructure/adapter/openai/OpenAiAdopter";
import {
  type Original,
  type TranslationConfig,
  Translated,
  Text,
  type DraftTranslation,
  TranslatedTranslation,
  type Translation,
} from "@/api/lib/domain";
import type { ITranslationRepository } from "@/api/lib/repository/ITranslationRepository";

export class TranslationService implements ITranslationService {
  constructor(
    private openAiService: OpenAiAdapter,
    private translationRepository: ITranslationRepository
  ) {}
  async translate(draft: DraftTranslation) {
    const { original, config } = draft;
    try {
      const translated = await this.generatePrompt(original, config);
      return TranslatedTranslation.create(draft, translated);
    } catch (error) {
      console.error(
        `Translation failed for original text: ${original.toJSON()} with config: ${config.toJSON()}`,
        error
      );
      throw error;
    }
  }
  async save(translation: Translation) {
    return await this.translationRepository.save(translation);
  }
  private async generatePrompt(
    originalText: Original,
    config: TranslationConfig
  ) {
    const {
      fromTo: { to, from },
    } = config.toJSON();
    const prompt = this.generateTranslationPrompt(
      from,
      to,
      originalText.toJSON().text
    );
    const rowTranslatedText = await this.openAiService.askGptV3_5Turbo(prompt);
    if (!rowTranslatedText?.trim().length) {
      throw new Error("Translation failed: received empty response from GPT-3");
    }
    return new Translated(new Text(rowTranslatedText), config.fromTo.to);
  }
  private generateTranslationPrompt(
    from: string,
    to: string,
    originalText: string
  ) {
    return `
    Please perform the translation based on the following information, and output only the translated text.

    - Source language: ${from}
    - Target language: ${to}
    - Original text: ${originalText}

    Note: This process is intended for use in an automated application. Therefore, please return only the translated text.
    `.trim();
  }
}
