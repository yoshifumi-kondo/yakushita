const symbol = Symbol("PartOfSpeech");
export enum PartOfSpeechType {
  NOUN = "NOUN",
  VERB = "VERB",
  ADJECTIVE = "ADJECTIVE",
  ADVERB = "ADVERB",
}
export class PartOfSpeech {
  public static [symbol]: typeof symbol = symbol;
  private _partOfSpeech: PartOfSpeechType;
  constructor(partOfSpeech: PartOfSpeechType) {
    this._partOfSpeech = partOfSpeech;
  }
  toJSON() {
    return this._partOfSpeech;
  }
}
