import type { Sentence, UserId } from "@/api/lib/domain";

export abstract class ISaveDraftLemmatization {
  abstract execute(userId: UserId, source: Sentence): Promise<void>;
}
