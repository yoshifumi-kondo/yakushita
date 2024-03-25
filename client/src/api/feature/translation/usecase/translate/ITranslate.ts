import {
  Original,
  TranslationConfig,
  UserId,
  Translation,
} from "@/api/lib/domain";

export interface ITranslate {
  execute(
    original: Original,
    config: TranslationConfig,
    userId: UserId
  ): Promise<Translation>;
}
