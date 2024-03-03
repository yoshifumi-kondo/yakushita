import { ITranslationService } from "@/api/lib/adapter/ITranslationService";
import { OriginalText } from "@/api/lib/domain/translator/OriginalText";
import { TranslatedText } from "@/api/lib/domain/translator/TranslatedText";
import { TranslationConfig } from "@/api/lib/domain/translator/TranslationConfig";
import { TranslationResult } from "@/api/lib/domain/translator/TranslationResult";
import { OpenAiService } from "@/api/service/openai/OpenAiService";

export class TranslationServiceImpl implements ITranslationService {
  constructor(private openAiService: OpenAiService) {}
  async translate(originalText: OriginalText, config: TranslationConfig) {
    return new TranslationResult(
      originalText,
      await this.generatePrompt(originalText, config),
      config
    );
  }

  private async generatePrompt(
    originalText: OriginalText,
    config: TranslationConfig
  ) {
    const { to, from } = config.toJSON();
    const prompt = `
Please perform the translation based on the following information, and output only the translated text.

- Source language: ${from}
- Target language: ${to}
- Original text: ${originalText.toJSON()}

Note: This process is intended for use in an automated application. Therefore, please return only the translated text.
    `;
    const rowTranslatedText = await this.openAiService.askGptV3_5Turbo(prompt);
    if (!rowTranslatedText) {
      throw new Error("Translation failed");
    }
    return new TranslatedText(rowTranslatedText);
  }
}
