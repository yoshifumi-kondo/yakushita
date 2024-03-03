import { ITranslationService } from "@/api/lib/adapter/ITranslationService";
import { OriginalText } from "@/api/lib/domain/translator/OriginalText";
import { TranslatedText } from "@/api/lib/domain/translator/TranslatedText";
import { TranslationConfig } from "@/api/lib/domain/translator/TranslationConfig";
import { TranslationResult } from "@/api/lib/domain/translator/TranslationResult";
import { OpenAiService } from "@/api/service/openai/OpenAiService";

export class TranslationServiceImpl implements ITranslationService {
  constructor(private openAiService: OpenAiService) {}
  async translate(originalText: OriginalText, config: TranslationConfig) {
    try {
      const translatedText = await this.generatePrompt(originalText, config);
      return new TranslationResult(originalText, translatedText, config);
    } catch (error) {
      console.error("Translation failed", error);
      throw error;
    }
  }

  private async generatePrompt(
    originalText: OriginalText,
    config: TranslationConfig
  ) {
    const { to, from } = config.toJSON();
    const prompt = this.generateTranslationPrompt(
      from,
      to,
      originalText.toJSON()
    );
    const rowTranslatedText = await this.openAiService.askGptV3_5Turbo(prompt);
    if (!rowTranslatedText) {
      throw new Error("Translation failed");
    }
    return new TranslatedText(rowTranslatedText);
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
    `;
  }
}
