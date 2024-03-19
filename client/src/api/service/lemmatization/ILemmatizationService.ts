import { Translation, Lemmatization, UserId } from "@/api/lib/domain";

export abstract class ILemmatizationService {
  abstract lemmatize(translation: Translation): Promise<Lemmatization>;
  abstract save(lemmatization: Lemmatization, userId: UserId): Promise<void>;
}
