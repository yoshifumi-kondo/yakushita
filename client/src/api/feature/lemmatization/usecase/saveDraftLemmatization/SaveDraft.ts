import type { ILemmatizationService } from "@/api/feature/lemmatization/service/ILemmatizationService";
import type { ISaveDraftLemmatization } from "@/api/feature/lemmatization/usecase/saveDraftLemmatization/ISaveDraft";
import {
  DraftLemmatization,
  type Sentence,
  type UserId,
} from "@/api/lib/domain";

export class SaveDraftLemmatization implements ISaveDraftLemmatization {
  constructor(private readonly lemmatizationService: ILemmatizationService) {}

  async execute(userId: UserId, source: Sentence) {
    const draft = DraftLemmatization.create(userId, source.language, source);
    return this.lemmatizationService.save(draft);
  }
}
