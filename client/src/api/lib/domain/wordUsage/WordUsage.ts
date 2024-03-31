import {
  type Word,
  MasteryPercentage,
  Exclusion,
  WordUsageId,
  Count,
  type UserId,
} from "@/api/lib/domain";

const symbol = Symbol("WordUsage");

export class WordUsage {
  public static [symbol]: typeof symbol = symbol;
  constructor(
    readonly id: WordUsageId,
    readonly userId: UserId,
    readonly word: Word,
    readonly count: Count,
    readonly masteryPercentage: MasteryPercentage,
    readonly exclusion: Exclusion
  ) {}
  static create(word: Word, userId: UserId) {
    return new WordUsage(
      WordUsageId.create(),
      userId,
      word,
      Count.createOne(),
      MasteryPercentage.createZero(),
      Exclusion.createFalse()
    );
  }
  readonly increaseCount = () => {
    return new WordUsage(
      this.id,
      this.userId,
      this.word,
      this.count.increase(),
      this.masteryPercentage,
      this.exclusion
    );
  };

  toJSON() {
    return {
      id: this.id.toJSON(),
      userId: this.userId.toJSON(),
      word: this.word.toJSON(),
      count: this.count.toJSON(),
      masteryPercentage: this.masteryPercentage.toJSON(),
      exclusion: this.exclusion.toJSON(),
    };
  }
}
