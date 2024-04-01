import type {
  LemmatizationId,
  LemmatizedLemmatization,
} from "@/api/lib/domain";

export abstract class ILemmatizeFromDraft {
  abstract execute(id: LemmatizationId): Promise<LemmatizedLemmatization>;
}
