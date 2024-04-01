import {
  type Lemmatization,
  UserId,
  Word,
  LemmatizationList,
  Language,
  WordList,
  PartOfSpeech,
  Text,
  LemmatizedLemmatization,
  type LemmatizedLemmatizationList,
  Sentence,
} from "@/api/lib/domain";
import { BaseRepository } from "@/api/infrastructure/persistent/mongo/BaseRepository";
import type { ILemmatizationRepository } from "@/api/lib/repository/ILemmatizationRepository";
import type { LemmatizationModel } from "@/api/infrastructure/persistent/mongo/Schema";
import { LemmatizationId } from "@/api/lib/domain/lemmatization/LemmatizationId";
import {
  LEMMATIZATION_TYPE,
  LemmatizationStatus,
} from "@/api/lib/domain/lemmatization/LemmatizationStatus";

export class LemmatizationRepository
  extends BaseRepository
  implements ILemmatizationRepository
{
  constructor(private readonly model: typeof LemmatizationModel) {
    super();
  }

  async save(lemmatization: Lemmatization): Promise<void> {
    return await this.performDbOperation(
      async () => {
        const json = lemmatization.toJSON();
        const lemmatizationModel = new this.model(json);
        await lemmatizationModel.save();
      },
      "Error saving lemmatization:",
      "Failed to save lemmatization"
    );
  }
  async update(lemmatization: Lemmatization): Promise<void> {
    return await this.performDbOperation(
      async () => {
        const json = lemmatization.toJSON();
        await this.model.updateOne({ id: json.id }, json);
      },
      "Error updating lemmatization:",
      "Failed to update lemmatization"
    );
  }

  async getAllLemmatizedByWord(
    word: Word,
    userId: UserId
  ): Promise<LemmatizedLemmatizationList> {
    return await this.performDbOperation(
      async () => {
        const lemmatizationList = await this.model.find({
          userId: userId.toJSON(),
          status: LEMMATIZATION_TYPE.LEMMATIZED,
          wordList: {
            $elemMatch: {
              text: word.text.toJSON(),
              language: word.language.toJSON(),
              partOfSpeech: word.partOfSpeech.toJSON(),
            },
          },
        });
        if (!lemmatizationList) {
          return LemmatizationList.createEmpty().lemmatized;
        }
        return new LemmatizationList(
          lemmatizationList.map(
            ({ id, userId, wordList, language, source, status }) => {
              if (status !== LEMMATIZATION_TYPE.LEMMATIZED) {
                throw new Error("Lemmatization is not lemmatized");
              }
              const domainWordList = wordList
                ? new WordList(
                    wordList.map(
                      ({ text, language, partOfSpeech }) =>
                        new Word(
                          new Text(text),
                          new Language(language),
                          new PartOfSpeech(partOfSpeech)
                        )
                    )
                  )
                : WordList.createEmpty();
              return new LemmatizedLemmatization(
                new LemmatizationId(id),
                new LemmatizationStatus(status),
                new UserId(userId),
                new Language(language),
                new Sentence(
                  new Text(source.text),
                  new Language(source.language)
                ),
                domainWordList
              );
            }
          )
        ).lemmatized;
      },
      "Error getting lemmatization:",
      "Failed to get lemmatization"
    );
  }
  async getDraftById(
    lemmatizationId: LemmatizationId
  ): Promise<LemmatizedLemmatization> {
    return await this.performDbOperation(
      async () => {
        const lemmatization = await this.model.findOne({
          id: lemmatizationId.toJSON(),
          status: LEMMATIZATION_TYPE.DRAFT,
        });
        if (!lemmatization) {
          throw new Error("Lemmatization not found");
        }
        const { id, userId, wordList, language, source, status } =
          lemmatization;
        if (status !== LEMMATIZATION_TYPE.DRAFT) {
          throw new Error("Lemmatization is not a draft");
        }
        const domainWordList = wordList
          ? new WordList(
              wordList.map(
                ({ text, language, partOfSpeech }) =>
                  new Word(
                    new Text(text),
                    new Language(language),
                    new PartOfSpeech(partOfSpeech)
                  )
              )
            )
          : WordList.createEmpty();
        return new LemmatizedLemmatization(
          new LemmatizationId(id),
          new LemmatizationStatus(status),
          new UserId(userId),
          new Language(language),
          new Sentence(new Text(source.text), new Language(source.language)),
          domainWordList
        );
      },
      "Error getting lemmatization:",
      "Failed to get lemmatization"
    );
  }
}
