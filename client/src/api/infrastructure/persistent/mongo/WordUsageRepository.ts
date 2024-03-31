import {
  WordUsage,
  UserId,
  Word,
  WordUsageList,
  type WordList,
  Text,
  Language,
  PartOfSpeech,
  Count,
  WordUsageId,
  MasteryPercentage,
  Exclusion,
} from "@/api/lib/domain";
import { BaseRepository } from "@/api/infrastructure/persistent/mongo/BaseRepository";
import type { IWordUsageRepository } from "@/api/lib/repository/IWordUsageRepository";
import type { WordUsageModel } from "@/api/infrastructure/persistent/mongo/Schema";

export class WordUsageRepository
  extends BaseRepository
  implements IWordUsageRepository
{
  constructor(private readonly model: typeof WordUsageModel) {
    super();
  }

  save(wordUsage: WordUsage): Promise<void> {
    return this.performDbOperation(
      async () => {
        const json = wordUsage.toJSON();
        const wordUsageModel = new this.model(json);
        await wordUsageModel.save();
      },
      "Error saving word usage:",
      "Failed to save word usage"
    );
  }

  saveAll(list: WordUsageList): Promise<void> {
    return this.performDbOperation(
      async () => {
        const wordUsageModelList = list.map((wordUsage) => {
          return wordUsage.toJSON();
        });

        await this.model.insertMany(wordUsageModelList);
      },
      "Error saving word usage:",
      "Failed to save word usage"
    );
  }

  getByWordList(userId: UserId, wordList: WordList): Promise<WordUsageList> {
    return this.performDbOperation(
      async () => {
        const wordListJSON = wordList.toJSON();
        const wordUsageModelList = await this.model.find({
          userId: userId.toJSON(),
          "word.text": { $in: wordListJSON.map((word) => word.text) },
        });
        return new WordUsageList(
          wordUsageModelList.map(
            ({ id, userId, word, count, masteryPercentage, exclusion }) => {
              return new WordUsage(
                new WordUsageId(id),
                new UserId(userId),
                new Word(
                  new Text(word.text),
                  new Language(word.language),
                  new PartOfSpeech(word.partOfSpeech)
                ),
                new Count(count),
                new MasteryPercentage(masteryPercentage),
                new Exclusion(exclusion)
              );
            }
          )
        );
      },
      "Error getting word usage:",
      "Failed to get word usage"
    );
  }

  getTopUsedList(userId: UserId, limit: number): Promise<WordUsageList> {
    return this.performDbOperation(
      async () => {
        const wordUsageModelList = await this.model
          .find({
            userId: userId.toJSON(),
          })
          .sort({ count: -1 })
          .limit(limit);

        return new WordUsageList(
          wordUsageModelList.map(
            ({ id, userId, word, count, masteryPercentage, exclusion }) => {
              return new WordUsage(
                new WordUsageId(id),
                new UserId(userId),
                new Word(
                  new Text(word.text),
                  new Language(word.language),
                  new PartOfSpeech(word.partOfSpeech)
                ),
                new Count(count),
                new MasteryPercentage(masteryPercentage),
                new Exclusion(exclusion)
              );
            }
          )
        );
      },
      "Error getting top used word list:",
      "Failed to get top used word list"
    );
  }

  updateAll(wordUsageList: WordUsageList): Promise<void> {
    return this.performDbOperation(
      async () => {
        const bulkWriteOperations = wordUsageList.map((wordUsage) => {
          const json = wordUsage.toJSON();
          return {
            updateOne: {
              filter: { id: json.id },
              update: { $set: { ...json } },
            },
          };
        });

        await this.model.bulkWrite(bulkWriteOperations);
      },
      "Error updating word usage:",
      "Failed to update word usage"
    );
  }
}
