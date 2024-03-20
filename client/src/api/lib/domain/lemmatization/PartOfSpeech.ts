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

  static fromString(partOfSpeechString: string): PartOfSpeech | null {
    switch (partOfSpeechString) {
      case PartOfSpeechType.NOUN:
        return new PartOfSpeech(PartOfSpeechType.NOUN);
      case PartOfSpeechType.VERB:
        return new PartOfSpeech(PartOfSpeechType.VERB);
      case PartOfSpeechType.ADJECTIVE:
        return new PartOfSpeech(PartOfSpeechType.ADJECTIVE);
      case PartOfSpeechType.ADVERB:
        return new PartOfSpeech(PartOfSpeechType.ADVERB);
      default:
        return null;
    }
  }

  toJSON() {
    return this._partOfSpeech;
  }
}
