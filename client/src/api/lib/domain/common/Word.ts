import type { Language, Text } from "@/api/lib/domain";
import type { PartOfSpeech } from "@/api/lib/domain/lemmatization/PartOfSpeech";

const symbol = Symbol("Word");
export class Word {
  public static [symbol]: typeof symbol = symbol;
  constructor(
    readonly text: Text,
    readonly language: Language,
    readonly partOfSpeech: PartOfSpeech
  ) {
    this.partOfSpeech = partOfSpeech;
    this.validate();
  }
  private validate() {
    if (this.language.isEnglish()) {
      this.englishValidation();
    }
  }
  private englishValidation() {
    if (2 >= this.text.length) {
      throw new Error("Text is too short");
    }
  }
  isSame(word: Word) {
    return (
      this.text.isSame(word.text) &&
      this.language.isSame(word.language) &&
      this.partOfSpeech.isSame(word.partOfSpeech)
    );
  }
  toJSON() {
    return {
      text: this.text.toJSON(),
      language: this.language.toJSON(),
      partOfSpeech: this.partOfSpeech.toJSON(),
    };
  }
}
