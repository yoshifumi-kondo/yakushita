import type { Language, Text, UserId } from "@/api/lib/domain";

export abstract class ILemmatizeAndCount {
  abstract execute(
    userId: UserId,
    language: Language,
    source: Text
  ): Promise<void>;
}
