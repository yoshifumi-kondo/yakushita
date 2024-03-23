import {
  Original,
  Language,
  LanguagesType,
  FromTo,
  Text,
  Translated,
  WordList,
  Word,
  Translation,
  TranslationConfig,
  Lemmatization,
  UserId,
} from "@/api/lib/domain";
import { LemmatizeAdopter } from "@/api/lib/infrastructure/adapter/lemmatize/LemmatizeAdopter";
import {
  PartOfSpeech,
  PartOfSpeechType,
} from "@/api/lib/domain/lemmatization/PartOfSpeech";
import { LemmatizationService } from "@/api/service/lemmatization/LemmatizationService";
import { ILemmatizationRepository } from "@/api/lib/repository/ILemmatizationRepository";

describe("LemmatizationService", () => {
  let mockLemmatizeAdapter: LemmatizeAdopter;
  let mockLemmatizationRepository: ILemmatizationRepository;

  beforeEach(() => {
    mockLemmatizeAdapter = jest.createMockFromModule<LemmatizeAdopter>(
      "@/api/lib/infrastructure/adapter/lemmatize/LemmatizeAdopter.ts"
    );
    mockLemmatizationRepository =
      jest.createMockFromModule<ILemmatizationRepository>(
        "@/api/lib/repository/ILemmatizationRepository.ts"
      );
    mockLemmatizationRepository.save = jest.fn();
  });

  it("should lemmatize text correctly", async () => {
    const wordList = new WordList(
      [
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
      ],
      new Language(LanguagesType.ENGLISH)
    );
    mockLemmatizeAdapter.lemmatizeForEnglish = jest
      .fn()
      .mockResolvedValue(wordList);
    const service = new LemmatizationService(
      mockLemmatizeAdapter,
      mockLemmatizationRepository
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
    expect(mockLemmatizeAdapter.lemmatizeForEnglish).toHaveBeenCalledWith(
      translated
    );
    expect(lemmatized).toEqual(wordList);
  });

  it("should save lemmatization correctly", async () => {
    const wordList = new WordList(
      [
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
      ],
      new Language(LanguagesType.ENGLISH)
    );
    const lemmatization = new Lemmatization(
      wordList,
      new Language(LanguagesType.ENGLISH),
      new Text("test run")
    );

    const userId = UserId.create();
    const service = new LemmatizationService(
      mockLemmatizeAdapter,
      mockLemmatizationRepository
    );
    await service.save(lemmatization, userId);
    expect(mockLemmatizationRepository.save).toHaveBeenCalledWith(
      lemmatization,
      userId
    );
  });
});
