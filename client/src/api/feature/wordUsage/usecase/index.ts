import { wordUsageService } from "@/api/feature/wordUsage/service";
import { CountUpAll } from "@/api/feature/wordUsage/usecase/countUpAll/CountUpAll";
import { CreateAll } from "@/api/feature/wordUsage/usecase/createAll/CreateAll";
import { CountByWordList } from "@/api/feature/wordUsage/usecase/countByWordList/CountByWordList";
import { GetTopUsedList } from "@/api/feature/wordUsage/usecase/getTopUsedList/GetTopUsedList";

export const createAll = new CreateAll(wordUsageService);
export const countUpAll = new CountUpAll(wordUsageService);
export const countByWordList = new CountByWordList(
  wordUsageService,
  createAll,
  countUpAll
);
export const getTopUsedList = new GetTopUsedList(wordUsageService);
