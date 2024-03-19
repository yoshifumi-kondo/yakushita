import {
  Language,
  Lemmatization,
  PartOfSpeech,
  Text,
  UserId,
  Word,
  WordCount,
  WordWithCount,
  WordWithCountList,
} from "@/api/lib/domain";
import { BaseRepository } from "@/api/lib/infrastructure/persistent/mongo/BaseRepository";
import {
  SentenceModel,
  WordModel,
} from "@/api/lib/infrastructure/persistent/mongo/Schema";
import { ILemmatizationRepository } from "@/api/lib/repository/ILemmatizationRepository";

export class LemmatizationRepository
  extends BaseRepository
  implements ILemmatizationRepository
{
  private readonly MongooseSentenceModel;
  private readonly MongooseWordModel;

  constructor() {
    super();
    this.MongooseSentenceModel = SentenceModel;
    this.MongooseWordModel = WordModel;
  }

  async save(lemmatization: Lemmatization, userId: UserId): Promise<void> {
    return await this.performDbOperation(
      async () => {
        const { wordList, language, source } = lemmatization.toJSON();

        const sentence = new this.MongooseSentenceModel({
          content: source,
          language: language,
          userId,
        });
        await sentence.save();

        for (const word of wordList.list) {
          const savedWord = await this.MongooseWordModel.findOneAndUpdate(
            {
              word: word.text,
              language: word.language,
              userId: userId.toJSON(),
              partOfSpeech: word.partOfSpeech,
            },
            { $inc: { count: 1 }, $addToSet: { sentences: sentence._id } },
            { upsert: true, new: true }
          );
          sentence.words.push(savedWord._id);
        }

        await sentence.save();
      },
      "Error saving lemmatization:",
      "Failed to save lemmatization"
    );
  }

  async getTopWords(
    userId: UserId,
    limit: number = 10
  ): Promise<WordWithCountList> {
    return await this.performDbOperation(
      async () => {
        const topWords = await this.MongooseWordModel.find(
          { userId: userId.toJSON() },
          { word: 1, count: 1, _id: 0 }
        )
          .sort({ count: -1 })
          .limit(limit)
          .exec();

        return new WordWithCountList(
          topWords.map(
            ({ word, count, language, partOfSpeech }) =>
              new WordWithCount(
                new Word(
                  new Text(word),
                  new Language(language),
                  new PartOfSpeech(partOfSpeech)
                ),
                new WordCount(count)
              )
          )
        );
      },
      "Error getting top words:",
      "Failed to get top words"
    );
  }
}
