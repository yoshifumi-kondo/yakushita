import type { WordUsageList } from "@/api/lib/domain";

export abstract class ICountUpAll {
  abstract execute(wordUsageList: WordUsageList): Promise<void>;
}
