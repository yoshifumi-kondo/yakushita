import {
  Language,
  Lemmatization,
  PartOfSpeech,
  Text,
  UserId,
  Word,
  WordCount,
  WordList,
  WordWithCount,
  WordWithCountList,
} from "@/api/lib/domain";
import { Sentence } from "@/api/lib/domain/lemmatization/Sentence";
import { SentenceList } from "@/api/lib/domain/lemmatization/SentenceList";
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

  async getTopWordList(
    userId: UserId,
    limit: number = 10
  ): Promise<WordWithCountList> {
    return await this.performDbOperation(
      async () => {
        const topWords = await this.MongooseWordModel.find(
          { userId: userId.toJSON() },
          { word: 1, count: 1, _id: 0, language: 1, partOfSpeech: 1 }
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

  async getSentenceListByWord(
    word: Word,
    userId: UserId
  ): Promise<SentenceList | null> {
    return await this.performDbOperation(
      async () => {
        const { text, language, partOfSpeech } = word.toJSON();
        const wordDoc = await this.MongooseWordModel.findOne({
          word: text,
          language,
          partOfSpeech,
          userId: userId.toJSON(),
        });

        if (!wordDoc) {
          return null;
        }

        const sentenceDocs = await this.MongooseSentenceModel.find({
          _id: { $in: wordDoc.sentences },
          userId: userId.toJSON(),
        });

        return new SentenceList(
          sentenceDocs.map(
            (sentenceDoc) => new Sentence(new Text(sentenceDoc.content))
          )
        );
      },
      "Error getting word list by sentence ID:",
      "Failed to get word list by sentence ID"
    );
  }
}
