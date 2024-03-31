import type { ILemmatizationService } from "@/api/feature/lemmatization/service/ILemmatizationService";
import type { ILemmatize } from "@/api/feature/lemmatization/usecase/lemmatize/ILemmatize";
import {
  type UserId,
  type Language,
  type Text,
  DraftLemmatization,
  type LemmatizedLemmatization,
  type Sentence,
} from "@/api/lib/domain";

export class Lemmatize implements ILemmatize {
  constructor(private readonly lemmatizationService: ILemmatizationService) {}
  async execute(
    userId: UserId,
    source: Sentence
  ): Promise<LemmatizedLemmatization> {
    const draft = DraftLemmatization.create(userId, source.language, source);
    const lemmatized = await this.lemmatizationService.lemmatize(draft);
    await this.lemmatizationService.save(lemmatized);
    return lemmatized;
  }
}
