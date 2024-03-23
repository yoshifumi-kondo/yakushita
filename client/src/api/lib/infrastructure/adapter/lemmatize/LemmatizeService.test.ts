import {
  Language,
  LanguagesType,
  Text,
  Translated,
  Word,
  WordList,
} from "@/api/lib/domain";
import {
  PartOfSpeech,
  PartOfSpeechType,
} from "@/api/lib/domain/translation/PartOfSpeech";
import { LemmatizeService } from "@/api/lib/infrastructure/adapter/lemmatize/LemmatizeService";

describe("LemmatizeService", () => {
  let lemmatizeService: LemmatizeService;

  beforeEach(() => {
    lemmatizeService = new LemmatizeService();
  });

  it("should lemmatize English text correctly", async () => {
    const target = new Translated(
      new Text("The man is running"),
      new Language(LanguagesType.ENGLISH),
    );
    const expectedWordList = new WordList([
      new Word(
        new Text("the"),
        new Language(LanguagesType.ENGLISH),
        new PartOfSpeech(PartOfSpeechType.NOUN),
      ),
      new Word(
        new Text("man"),
        new Language(LanguagesType.ENGLISH),
        new PartOfSpeech(PartOfSpeechType.NOUN),
      ),
      new Word(
        new Text("be"),
        new Language(LanguagesType.ENGLISH),
        new PartOfSpeech(PartOfSpeechType.VERB),
      ),
      new Word(
        new Text("run"),
        new Language(LanguagesType.ENGLISH),
        new PartOfSpeech(PartOfSpeechType.VERB),
      ),
    ]);
    const result = await lemmatizeService.lemmatizeForEnglish(target);
    expect(result).toEqual(expectedWordList);
  });

  it("should throw an error if target language is not English", async () => {
    const target = new Translated(
      new Text("Translated text"),
      new Language(LanguagesType.JAPANESE),
    );
    await expect(lemmatizeService.lemmatizeForEnglish(target)).rejects.toThrow(
      new Error("Lemmatization failed: target language is not English"),
    );
  });

  it("should throw an error if no tokens are found in the response", async () => {
    const target = new Translated(
      new Text("Translated text"),
      new Language(LanguagesType.ENGLISH),
    );

    const fetchMock = jest.spyOn(global, "fetch");
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(null),
      } as Response),
    );
    await expect(lemmatizeService.lemmatizeForEnglish(target)).rejects.toThrow(
      "Lemmatization failed: received empty response from the server",
    );
  });

  it("should throw an error if the server response is empty", async () => {
    const target = new Translated(
      new Text("test"),
      new Language(LanguagesType.ENGLISH),
    );
    const fetchMock = jest.spyOn(global, "fetch");
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      } as Response),
    );
    await expect(lemmatizeService.lemmatizeForEnglish(target)).rejects.toThrow(
      "Lemmatization failed: no tokens found in the response",
    );
  });

  it("should throw an error for unknown lemma POS tag", async () => {
    const target = new Translated(
      new Text("Translated text"),
      new Language(LanguagesType.ENGLISH),
    );

    const fetchMock = jest.spyOn(global, "fetch");
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            tokens_with_POS: [
              {
                lemma: "test",
                lemma_POS: "UNKNOWN",
              },
            ],
          }),
      } as Response),
    );
    await expect(lemmatizeService.lemmatizeForEnglish(target)).rejects.toThrow(
      "Unknown lemma POS tag: UNKNOWN",
    );
  });
});
