import type { Language, Sentence, UserId } from "@/api/lib/domain";

export abstract class ILemmatizeAndCount {
  abstract execute(userId: UserId, source: Sentence): Promise<void>;
}
