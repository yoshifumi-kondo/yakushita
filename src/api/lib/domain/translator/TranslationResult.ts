import { OriginalText } from "@/api/lib/domain/translator/OriginalText";
import { TranslatedText } from "@/api/lib/domain/translator/TranslatedText";
import { TranslationConfig } from "@/api/lib/domain/translator/TranslationConfig";

const symbol = Symbol("TranslationResult");

export class TranslationResult {
  public static [symbol] = symbol;
  private _originalText: OriginalText;
  private _translatedText: TranslatedText;
  private _translationConfig: TranslationConfig;

  constructor(
    originalText: OriginalText,
    translatedText: TranslatedText,
    translationConfig: TranslationConfig
  ) {
    this._originalText = originalText;
    this._translatedText = translatedText;
    this._translationConfig = translationConfig;
  }

  toJSON() {
    return {
      originalText: this._originalText.toJSON(),
      translatedText: this._translatedText.toJSON(),
      translationConfig: this._translationConfig.toJSON(),
    };
  }
}
