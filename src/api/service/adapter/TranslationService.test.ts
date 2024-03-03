import { Language, LanguagesType } from "@/api/lib/domain/translator/Language";
import { OriginalText } from "@/api/lib/domain/translator/OriginalText";
import { TranslationConfig } from "@/api/lib/domain/translator/TranslationConfig";
import { TranslationServiceImpl } from "@/api/service/adapter/TranslationService";
import { OpenAiService } from "@/api/service/openai/OpenAiService";

describe("TranslationServiceImpl", () => {
  it("should translate text correctly", async () => {
    const mockOpenAiService = {
      askGptV3_5Turbo: jest.fn().mockResolvedValue("Translated text"),
    } as unknown as OpenAiService;
    const service = new TranslationServiceImpl(mockOpenAiService);
    const originalText = new OriginalText("Test text");
    const config = new TranslationConfig(
      new Language(LanguagesType.ENGLISH),
      new Language(LanguagesType.JAPANESE)
    );
    const result = await service.translate(originalText, config);
    expect(result.toJSON().translatedText).toEqual("Translated text");
    expect(mockOpenAiService.askGptV3_5Turbo).toHaveBeenCalledWith(
      expect.any(String)
    );
  });
});
