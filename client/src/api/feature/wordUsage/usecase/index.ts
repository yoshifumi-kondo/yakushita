import { wordUsageService } from "@/api/feature/wordUsage/service";
import { CountUpAll } from "@/api/feature/wordUsage/usecase/countUpAll/CountUpAll";
import { CreateAll } from "@/api/feature/wordUsage/usecase/createAll/CreateAll";
import { CountByWordList } from "@/api/feature/wordUsage/usecase/count/Count";
import { GetTopUsedList } from "@/api/feature/wordUsage/usecase/getTopUsedList/GetTopUsedList";

export const createAll = new CreateAll(wordUsageService);
export const countUpAll = new CountUpAll(wordUsageService);
export const count = new CountByWordList(
  wordUsageService,
  createAll,
  countUpAll
);
export const getTopUsedList = new GetTopUsedList(wordUsageService);
