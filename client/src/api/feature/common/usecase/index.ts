import { LemmatizeAndCount } from "@/api/feature/common/usecase/lemmatizeAndCount/LemmatizeAndCount";
import { LemmatizeAndCountFromDraft } from "@/api/feature/common/usecase/lemmatizeAndCountFromDraft/LemmatizeAndCountFromDraft";
import { TranslateAndSaveDraftLemmatization } from "@/api/feature/common/usecase/translateAndSaveDraftLemmatization/TranslateAndSaveDraftLemmatization";
import { TranslateWithLemmatizationAndCount } from "@/api/feature/common/usecase/translateWithLemmatizationAndCount/TranslateWithLemmatizationAndCount";
import {
  lemmatize,
  lemmatizeFromDraft,
  saveDraftLemmatization,
} from "@/api/feature/lemmatization/usecase";
import { translate } from "@/api/feature/translation/usecase";
import { count } from "@/api/feature/wordUsage/usecase";

export const lemmatizeAndCount = new LemmatizeAndCount(lemmatize, count);
export const lemmatizeAndCountFromDraft = new LemmatizeAndCountFromDraft(
  lemmatizeFromDraft,
  count
);
export const translateAndSaveDraftLemmatization =
  new TranslateAndSaveDraftLemmatization(translate, saveDraftLemmatization);

export const translateWithLemmatizationAndCount =
  new TranslateWithLemmatizationAndCount(translate, lemmatizeAndCount);
