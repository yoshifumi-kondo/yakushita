import { lemmatizationService } from "@/api/feature/lemmatization/service";
import { translationService } from "@/api/feature/translation/service";
import { Translate } from "@/api/feature/translation/usecase/translate/Translate";

export const translate = new Translate(
  lemmatizationService,
  translationService
);
