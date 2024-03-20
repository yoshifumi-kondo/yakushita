import { Sentence } from "@/api/lib/domain/lemmatization/Sentence";

const symbol = Symbol("SentenceList");
export class SentenceList {
  public readonly [symbol]: typeof symbol = symbol;
  readonly sentences: Sentence[];
  constructor(sentences: Sentence[]) {
    this.sentences = sentences;
  }
  toJSON() {
    return this.sentences.map((sentence) => sentence.toJSON());
  }
}
