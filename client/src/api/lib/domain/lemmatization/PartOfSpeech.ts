const symbol = Symbol("PartOfSpeech");
export enum PartOfSpeechType {
  NOUN = "NOUN",
  VERB = "VERB",
  ADJECTIVE = "ADJECTIVE",
  ADVERB = "ADVERB",
}
export class PartOfSpeech {
  public static [symbol]: typeof symbol = symbol;

  constructor(readonly partOfSpeech: PartOfSpeechType) {}
  static fromString(partOfSpeechString: string): PartOfSpeech {
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
        throw new Error(`Invalid part of speech: ${partOfSpeechString}`);
    }
  }
  isSame(partOfSpeech: PartOfSpeech) {
    return this.partOfSpeech === partOfSpeech.partOfSpeech;
  }
  toJSON() {
    return this.partOfSpeech;
  }
}
