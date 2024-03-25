import { LemmatizeAdopter } from "@/api/infrastructure/adapter/lemmatize/LemmatizeAdopter";
import {
  WordList,
  Word,
  Text,
  Language,
  LanguagesType,
  Translated,
  Lemmatization,
} from "@/api/lib/domain";
import {
  PartOfSpeech,
  PartOfSpeechType,
} from "@/api/lib/domain/lemmatization/PartOfSpeech";

describe("LemmatizeAdopter", () => {
  let lemmatizeAdopter: LemmatizeAdopter;

  beforeEach(() => {
    lemmatizeAdopter = new LemmatizeAdopter();
  });

  it("should lemmatize English text correctly", async () => {
    const target = new Translated(
      new Text("The man is running"),
      new Language(LanguagesType.ENGLISH)
    );
    const expectedWordList = new WordList(
      [
        new Word(
          new Text("man"),
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
    const exceptedLemmatization = new Lemmatization(
      expectedWordList,
      new Language(LanguagesType.ENGLISH),
      new Text("The man is running")
    );
    const result = await lemmatizeAdopter.lemmatizeForEnglish(target);
    expect(result).toEqual(exceptedLemmatization);
  });
  it("should throw an error if target text is shorter than 2 characters", async () => {
    const target = new Translated(
      new Text("a"),
      new Language(LanguagesType.ENGLISH)
    );
    expect(lemmatizeAdopter.lemmatizeForEnglish(target)).rejects.toThrow(
      new Error("Lemmatization failed: no tokens found in the response")
    );
  });

  it("should throw an error if target language is not English", async () => {
    const target = new Translated(
      new Text("Translated text"),
      new Language(LanguagesType.JAPANESE)
    );
    await expect(lemmatizeAdopter.lemmatizeForEnglish(target)).rejects.toThrow(
      new Error("Lemmatization failed: target language is not English")
    );
  });

  it("should throw an error if no tokens are found in the response", async () => {
    const target = new Translated(
      new Text("Translated text"),
      new Language(LanguagesType.ENGLISH)
    );

    const fetchMock = jest.spyOn(global, "fetch");
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(null),
      } as Response)
    );
    await expect(lemmatizeAdopter.lemmatizeForEnglish(target)).rejects.toThrow(
      "Lemmatization failed: received empty response from the server"
    );
  });

  it("should throw an error if the server response is empty", async () => {
    const target = new Translated(
      new Text("test"),
      new Language(LanguagesType.ENGLISH)
    );
    const fetchMock = jest.spyOn(global, "fetch");
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      } as Response)
    );
    await expect(lemmatizeAdopter.lemmatizeForEnglish(target)).rejects.toThrow(
      "Lemmatization failed: no tokens found in the response"
    );
  });

  it("should throw an error for unknown lemma POS tag", async () => {
    const target = new Translated(
      new Text("Translated text"),
      new Language(LanguagesType.ENGLISH)
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
      } as Response)
    );
    await expect(lemmatizeAdopter.lemmatizeForEnglish(target)).rejects.toThrow(
      "Unknown lemma POS tag: UNKNOWN"
    );
  });
});
