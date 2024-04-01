import type { ILemmatizeAndCountFromDraft } from "@/api/feature/common/usecase/lemmatizeAndCountFromDraft/ILemmatizeAndCountFromDraft";
import type { ILemmatizeFromDraft } from "@/api/feature/lemmatization/usecase/lemmatizeFromDraft/ILemmatizeFromDraft";
import type { ICount } from "@/api/feature/wordUsage/usecase/count/ICount";
import type { LemmatizationId } from "@/api/lib/domain";

export class LemmatizeAndCountFromDraft implements ILemmatizeAndCountFromDraft {
  constructor(
    private readonly lemmatizeFromDraft: ILemmatizeFromDraft,
    private readonly count: ICount
  ) {}
  async execute(id: LemmatizationId): Promise<void> {
    const lemmatized = await this.lemmatizeFromDraft.execute(id);
    await this.count.execute(lemmatized.userId, lemmatized.wordList);
  }
}
