import { TranslationService } from "@/api/feature/translation/service/TranslationService";
import { OpenAiAdapter } from "@/api/infrastructure/adapter/openai/OpenAiAdopter";
import {
  Original,
  Language,
  LanguagesType,
  TranslationConfig,
  FromTo,
  Text,
} from "@/api/lib/domain";

describe("TranslationService", () => {
  let mockOpenAiService: OpenAiAdapter;

  beforeEach(() => {
    mockOpenAiService = jest.createMockFromModule<OpenAiAdapter>(
      "@/api/lib/infrastructure/adapter/openai/OpenAiAdopter"
    );
  });
  it("should translate text correctly", async () => {
    mockOpenAiService.askGptV3_5Turbo = jest
      .fn()
      .mockResolvedValue("Translated text");

    const service = new TranslationService(mockOpenAiService);
    const original = new Original(
      new Text("Test text"),
      new Language(LanguagesType.JAPANESE)
    );
    const config = new TranslationConfig(
      new FromTo(
        new Language(LanguagesType.JAPANESE),
        new Language(LanguagesType.ENGLISH)
      )
    );
    const translation = await service.translate(original, config);
    expect(translation.toJSON().translated.text).toEqual("Translated text");
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
