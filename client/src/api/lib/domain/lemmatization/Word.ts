import { Language, Text } from "@/api/lib/domain";
import { PartOfSpeech } from "@/api/lib/domain/lemmatization/PartOfSpeech";

const symbol = Symbol("Word");
export class Word {
  public static [symbol]: typeof symbol = symbol;
  readonly _text: Text;
  readonly _language: Language;
  readonly _partOfSpeech: PartOfSpeech;
  constructor(text: Text, language: Language, partOfSpeech: PartOfSpeech) {
    this._text = text;
    this._language = language;
    this._partOfSpeech = partOfSpeech;
    this.validate();
  }
  private validate() {
    if (this._language.isEnglish()) {
      this.englishValidation();
    }
  }
  private englishValidation() {
    if (2 >= this._text.length) {
      throw new Error("Text is too short");
    }
  }
  toJSON() {
    return {
      text: this._text.toJSON(),
      language: this._language.toJSON(),
      partOfSpeech: this._partOfSpeech.toJSON(),
    };
  }
}
