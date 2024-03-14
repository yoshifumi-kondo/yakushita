import { TranslationService } from "@/api/service/translation/TranslationService";
import { OpenAiService } from "@/api/lib/infrastructure/adapter/openai/OpenAiService";
import {
  Original,
  Language,
  LanguagesType,
  TranslationConfig,
  FromTo,
  Text,
  Translated,
  WordList,
  Word,
  Translation,
} from "@/api/lib/domain";
import { LemmatizeService } from "@/api/lib/infrastructure/adapter/lemmatize/LemmatizeService";
import {
  PartOfSpeech,
  PartOfSpeechType,
} from "@/api/lib/domain/translation/PartOfSpeech";

describe("TranslationService", () => {
  let mockOpenAiService: OpenAiService;
  let mockLemmatizeService: LemmatizeService;

  beforeEach(() => {
    mockOpenAiService = jest.createMockFromModule<OpenAiService>(
      "@/api/lib/infrastructure/adapter/openai/OpenAiService.ts"
    );
    mockLemmatizeService = jest.createMockFromModule<LemmatizeService>(
      "@/api/lib/infrastructure/adapter/lemmatize/LemmatizeService.ts"
    );
  });
  it("should translate text correctly", async () => {
    mockOpenAiService.askGptV3_5Turbo = jest
      .fn()
      .mockResolvedValue("Translated text");
    mockLemmatizeService.lemmatizeForEnglish = jest.fn().mockResolvedValue({
      words: new WordList([
        new Word(
          new Text("test"),
          new Language(LanguagesType.ENGLISH),
          new PartOfSpeech(PartOfSpeechType.NOUN)
        ),
        new Word(
          new Text("run"),
          new Language(LanguagesType.ENGLISH),
          new PartOfSpeech(PartOfSpeechType.VERB)
        ),
      ]),
    });
    const service = new TranslationService(
      mockOpenAiService,
      mockLemmatizeService
    );
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

  it("should lemmatize text correctly", async () => {
    const wordList = new WordList([
      new Word(
        new Text("test"),
        new Language(LanguagesType.ENGLISH),
        new PartOfSpeech(PartOfSpeechType.NOUN)
      ),
      new Word(
        new Text("run"),
        new Language(LanguagesType.ENGLISH),
        new PartOfSpeech(PartOfSpeechType.VERB)
      ),
    ]);
    mockLemmatizeService.lemmatizeForEnglish = jest
      .fn()
      .mockResolvedValue(wordList);
    const service = new TranslationService(
      mockOpenAiService,
      mockLemmatizeService
    );
    const original = new Original(
      new Text("テスト テキスト"),
      new Language(LanguagesType.JAPANESE)
    );
    const translated = new Translated(
      new Text("Translated text"),
      new Language(LanguagesType.ENGLISH)
    );

    const translation = new Translation(
      original,
      translated,
      new TranslationConfig(
        new FromTo(
          new Language(LanguagesType.JAPANESE),
          new Language(LanguagesType.ENGLISH)
        )
      )
    );
    const lemmatized = await service.lemmatize(translation);
    expect(mockLemmatizeService.lemmatizeForEnglish).toHaveBeenCalledWith(
      translated
    );
    expect(lemmatized).toEqual(wordList);
  });
});
