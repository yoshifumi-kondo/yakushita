import { LemmatizeAndCount } from "@/api/feature/common/usecase/lemmatizeAndCount/LemmatizeAndCount";
import { TranslateWithLemmatizationAndCount } from "@/api/feature/common/usecase/translateWithLemmatizationAndCount/TranslateWithLemmatizationAndCount";
import { lemmatize } from "@/api/feature/lemmatization/usecase";
import { translate } from "@/api/feature/translation/usecase";
import { countByWordList } from "@/api/feature/wordUsage/usecase";

export const lemmatizeAndCount = new LemmatizeAndCount(
  lemmatize,
  countByWordList
);

export const translateWithLemmatizationAndCount =
  new TranslateWithLemmatizationAndCount(translate, lemmatizeAndCount);
