import type { ITranslationService } from "@/api/feature/translation/service/ITranslationService";

import { OpenAiAdapter } from "@/api/infrastructure/adapter/openai/OpenAiAdopter";
import {
  Original,
  TranslationConfig,
  Translation,
  Translated,
  Text,
} from "@/api/lib/domain";

export class TranslationService implements ITranslationService {
  constructor(private openAiService: OpenAiAdapter) {}
  async translate(originalText: Original, config: TranslationConfig) {
    try {
      const translatedText = await this.generatePrompt(originalText, config);
      return new Translation(originalText, translatedText, config);
    } catch (error) {
      console.error(
        `Translation failed for original text: ${originalText} with config: ${config}`,
        error
      );
      throw error;
    }
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
    return new Translated(new Text(rowTranslatedText), config.to);
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
