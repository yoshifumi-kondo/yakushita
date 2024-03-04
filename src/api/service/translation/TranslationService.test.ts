import { Language, LanguagesType } from "@/api/lib/domain/translator/Language";
import { OriginalText } from "@/api/lib/domain/translator/OriginalText";
import { TranslationConfig } from "@/api/lib/domain/translator/TranslationConfig";
import { TranslationServiceImpl } from "@/api/service/translation/TranslationService";
import { OpenAiService } from "@/api/lib/infrastructure/adapter/openai/OpenAiService";

describe("TranslationServiceImpl", () => {
  it("should translate text correctly", async () => {
    const mockOpenAiService = jest.createMockFromModule<OpenAiService>(
      "@/api/service/openai/OpenAiService"
    );
    mockOpenAiService.askGptV3_5Turbo = jest
      .fn()
      .mockResolvedValue("Translated text");
    const service = new TranslationServiceImpl(mockOpenAiService);
    const originalText = new OriginalText("Test text");
    const config = new TranslationConfig(
      new Language(LanguagesType.ENGLISH),
      new Language(LanguagesType.JAPANESE)
    );
    const result = await service.translate(originalText, config);
    expect(result.toJSON().translatedText).toEqual("Translated text");
    expect(mockOpenAiService.askGptV3_5Turbo).toHaveBeenCalledWith(
      `
    Please perform the translation based on the following information, and output only the translated text.

    - Source language: ja
    - Target language: en
    - Original text: Test text

    Note: This process is intended for use in an automated application. Therefore, please return only the translated text.
    `.trim()
    );
  });
});
