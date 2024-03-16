import {
  Language,
  Original,
  Text,
  Translated,
  TranslationConfig,
} from "@/api/lib/domain";

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

  private validate() {
    if (
      !this._translationConfig.matchFromTo(this._original, this._translated)
    ) {
      throw new Error(
        "Translation config does not match original and translated"
      );
    }
  }
  getTextByLanguage(language: Language) {
    if (this._original.language.isSame(language)) {
      return this._original;
    }
    if (this._translated.language.isSame(language)) {
      return this._translated;
    }
    throw new Error(`Language ${language.toJSON()} not found in translation`);
  }

  toJSON() {
    return {
      original: this._original.toJSON(),
      translated: this._translated.toJSON(),
      translationConfig: this._translationConfig.toJSON(),
    };
  }
}
