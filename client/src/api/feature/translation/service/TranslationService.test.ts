import { TranslationService } from "@/api/feature/translation/service/TranslationService";
import type { OpenAiAdapter } from "@/api/infrastructure/adapter/openai/OpenAiAdopter";
import {
  Original,
  Language,
  LanguagesType,
  TranslationConfig,
  FromTo,
  Text,
  Sentence,
  DraftTranslation,
  UserId,
} from "@/api/lib/domain";
import type { ITranslationRepository } from "@/api/lib/repository/ITranslationRepository";

describe("TranslationService", () => {
  let mockOpenAiService: OpenAiAdapter;
  const mockTranslationRepository: ITranslationRepository = {
    save: jest.fn(),
    getTranslationById: jest.fn(),
  };
  const userId = new UserId("test");

  beforeEach(() => {
    mockOpenAiService = jest.createMockFromModule<OpenAiAdapter>(
      "@/api/infrastructure/adapter/openai/OpenAiAdopter"
    );
  });

  it("should translate text correctly", async () => {
    mockOpenAiService.askGptV3_5Turbo = jest
      .fn()
      .mockResolvedValue("Translated text");

    const service = new TranslationService(
      mockOpenAiService,
      mockTranslationRepository
    );
    const original = new Original(
      new Sentence(new Text("Test text"), new Language(LanguagesType.JAPANESE))
    );
    const config = new TranslationConfig(
      new FromTo(
        new Language(LanguagesType.JAPANESE),
        new Language(LanguagesType.ENGLISH)
      )
    );
    const translation = await service.translate(
      DraftTranslation.create(userId, original, config)
    );
    expect(translation.toJSON().translated.sentence.text).toEqual(
      "Translated text"
    );
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
