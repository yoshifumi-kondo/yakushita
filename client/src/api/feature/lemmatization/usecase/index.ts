import { lemmatizationService } from "@/api/feature/lemmatization/service";
import { GetLemmatizationByUsingWord } from "@/api/feature/lemmatization/usecase/getLemmatizationByUsingWord/GetLemmatizationByUsingWord";
import { Lemmatize } from "@/api/feature/lemmatization/usecase/lemmatize/Lemmatize";
import { LemmatizeFromDraft } from "@/api/feature/lemmatization/usecase/lemmatizeFromDraft/LemmatizeFromDraft";
import { SaveDraftLemmatization } from "@/api/feature/lemmatization/usecase/saveDraftLemmatization/SaveDraft";

export const lemmatize = new Lemmatize(lemmatizationService);
export const lemmatizeFromDraft = new LemmatizeFromDraft(lemmatizationService);
export const saveDraftLemmatization = new SaveDraftLemmatization(
  lemmatizationService
);
export const getLemmatizationByUsingWord = new GetLemmatizationByUsingWord(
  lemmatizationService
);
