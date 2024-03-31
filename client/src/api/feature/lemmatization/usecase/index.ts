import { lemmatizationService } from "@/api/feature/lemmatization/service";
import { GetLemmatizationByUsingWord } from "@/api/feature/lemmatization/usecase/getLemmatizationByUsingWord/GetLemmatizationByUsingWord";
import { Lemmatize } from "@/api/feature/lemmatization/usecase/lemmatize/Lemmatize";

export const lemmatize = new Lemmatize(lemmatizationService);
export const getLemmatizationByUsingWord = new GetLemmatizationByUsingWord(
  lemmatizationService
);
