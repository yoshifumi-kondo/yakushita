import type { LemmatizationId } from "@/api/lib/domain";

export abstract class ILemmatizeAndCountFromDraft {
  abstract execute(id: LemmatizationId): Promise<void>;
}
