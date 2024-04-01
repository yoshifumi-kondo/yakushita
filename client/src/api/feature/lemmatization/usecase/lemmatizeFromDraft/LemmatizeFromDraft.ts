import type { ILemmatizationService } from "@/api/feature/lemmatization/service/ILemmatizationService";
import type { ILemmatizeFromDraft } from "@/api/feature/lemmatization/usecase/lemmatizeFromDraft/ILemmatizeFromDraft";
import type { LemmatizationId } from "@/api/lib/domain";

export class LemmatizeFromDraft implements ILemmatizeFromDraft {
  constructor(private readonly lemmatizationService: ILemmatizationService) {}

  async execute(id: LemmatizationId) {
    const draft = await this.lemmatizationService.getDraftById(id);
    const lemmatized = await this.lemmatizationService.lemmatize(draft);
    await this.lemmatizationService.update(lemmatized);
    return lemmatized;
  }
}
