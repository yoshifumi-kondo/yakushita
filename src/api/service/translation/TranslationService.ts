import { ITranslationService } from "@/api/service/translation/ITranslationService";

import { OpenAiService } from "@/api/lib/infrastructure/adapter/openai/OpenAiService";
import {
  Original,
  TranslationConfig,
  Translation,
  Translated,
  Text,
} from "@/api/lib/domain";

export class TranslationService implements ITranslationService {
  constructor(private openAiService: OpenAiService) {}
  async translate(originalText: Original, config: TranslationConfig) {
    try {
      const translatedText = await this.generatePrompt(originalText, config);
      return new Translation(originalText, translatedText, config);
    } catch (error) {
      console.error("Translation failed", error);
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
    if (!rowTranslatedText) {
      throw new Error("Translation failed");
    }
    return new Translated(new Text(rowTranslatedText), config.getTo());
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
