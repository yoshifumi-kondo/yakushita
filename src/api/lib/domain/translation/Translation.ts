import { Original, Translated, TranslationConfig } from "@/api/lib/domain";

const symbol = Symbol("Translation");

export class Translation {
  public static [symbol] = symbol;
  private _original: Original;
  private _translated: Translated;
  private _translationConfig: TranslationConfig;

  constructor(
    originalText: Original,
    translatedText: Translated,
    translationConfig: TranslationConfig
  ) {
    this._original = originalText;
    this._translated = translatedText;
    this._translationConfig = translationConfig;
    this.validate();
  }

  validate() {
    if (
      !this._translationConfig.matchFromTo(this._original, this._translated)
    ) {
      throw new Error(
        "Translation config does not match original and translated"
      );
    }
  }

  toJSON() {
    return {
      original: this._original.toJSON(),
      translated: this._translated.toJSON(),
      translationConfig: this._translationConfig.toJSON(),
    };
  }
}
