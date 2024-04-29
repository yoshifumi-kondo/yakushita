import { LemmatizeAdopter } from "@/api/infrastructure/adapter/lemmatize/LemmatizeAdopter";
import {
  WordList,
  Word,
  Text,
  Language,
  LanguagesType,
  Sentence,
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
    const expected = new WordList([
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
    ]);

    const result = await lemmatizeAdopter.lemmatize(
      new Sentence(
        new Text("This man is running"),
        new Language(LanguagesType.ENGLISH)
      ),
      new Language(LanguagesType.ENGLISH)
    );

    expect(result).toEqual(expected);
  });
  it("should throw an error if target text is shorter than 2 characters", async () => {
    expect(
      lemmatizeAdopter.lemmatize(
        new Sentence(new Text("a"), new Language(LanguagesType.ENGLISH)),
        new Language(LanguagesType.ENGLISH)
      )
    ).rejects.toThrow(
      new Error(
        "Failed to lemmatize text: Error: Lemmatization failed: no tokens found in the response"
      )
    );
  });

  it("should throw an error if target language is not English", async () => {
    await expect(
      lemmatizeAdopter.lemmatize(
        new Sentence(
          new Text("Translated text"),
          new Language(LanguagesType.JAPANESE)
        ),
        new Language(LanguagesType.JAPANESE)
      )
    ).rejects.toThrow(new Error("Not implemented"));
  });

  it("should throw an error if no tokens are found in the response", async () => {
    const fetchMock = jest.spyOn(global, "fetch");
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(null),
      } as Response)
    );
    await expect(
      lemmatizeAdopter.lemmatize(
        new Sentence(
          new Text("Translated text"),
          new Language(LanguagesType.ENGLISH)
        ),
        new Language(LanguagesType.ENGLISH)
      )
    ).rejects.toThrow(
      "Lemmatization failed: received empty response from the server"
    );
  });

  it("should throw an error if the server response is empty", async () => {
    const fetchMock = jest.spyOn(global, "fetch");
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      } as Response)
    );
    await expect(
      lemmatizeAdopter.lemmatize(
        new Sentence(new Text("test"), new Language(LanguagesType.ENGLISH)),
        new Language(LanguagesType.ENGLISH)
      )
    ).rejects.toThrow(
      "Failed to lemmatize text: Error: Lemmatization failed: no tokens found in the response"
    );
  });

  it("should throw an error for unknown lemma POS tag", async () => {
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
    await expect(
      lemmatizeAdopter.lemmatize(
        new Sentence(
          new Text("Translated text"),
          new Language(LanguagesType.ENGLISH)
        ),
        new Language(LanguagesType.ENGLISH)
      )
    ).rejects.toThrow("Unknown lemma POS tag: UNKNOWN");
  });
});
