import type { Language, Text } from "@/api/lib/domain";
import type { PartOfSpeech } from "@/api/lib/domain/translation/PartOfSpeech";

const symbol = Symbol("Word");
export class Word {
  public static [symbol]: typeof symbol = symbol;
  private _text: Text;
  private _language: Language;
  private _partOfSpeech: PartOfSpeech;
  constructor(text: Text, language: Language, partOfSpeech: PartOfSpeech) {
    this._text = text;
    this._language = language;
    this._partOfSpeech = partOfSpeech;
  }
  toJSON() {
    return {
      text: this._text.toJSON(),
      language: this._language.toJSON(),
      partOfSpeech: this._partOfSpeech.toJSON(),
    };
  }
}
