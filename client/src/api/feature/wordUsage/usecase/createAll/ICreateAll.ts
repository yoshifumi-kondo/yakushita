import type { WordUsageList } from "@/api/lib/domain";
export abstract class ICreateAll {
  abstract execute(wordUsageList: WordUsageList): Promise<void>;
}
