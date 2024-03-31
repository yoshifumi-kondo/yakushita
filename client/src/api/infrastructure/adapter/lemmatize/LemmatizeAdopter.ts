import {
  Language,
  LanguagesType,
  Text,
  Word,
  WordList,
  Lemmatization,
  type Sentence,
} from "@/api/lib/domain";
import {
  PartOfSpeech,
  PartOfSpeechType,
} from "@/api/lib/domain/lemmatization/PartOfSpeech";
import { ENV_KEY, getEnvValue } from "@/utils/getEnv";
// Enum definition for part-of-speech tags by WordNet
enum LemmaPOSTag {
  NOUN = "n",
  VERB = "v",
  ADJECTIVE = "a",
  ADVERB = "r",
}

// Type representing a single token, its NLTK POS tag, lemmatized form (lemma), and WordNet POS tag after lemmatization
type TokenWithLemmaPOSTag = {
  token: string;
  POS: string; // POS tag by NLTK
  lemma: string; // Lemmatized word
  lemma_POS: LemmaPOSTag; // WordNet POS tag after lemmatization
};

type responseData = {
  original: string;
  tokens_with_POS: TokenWithLemmaPOSTag[];
};

export class LemmatizeAdopter {
  async lemmatize(sentence: Sentence, language: Language): Promise<WordList> {
    if (!this.isMatchedLanguage(sentence, language)) {
      throw new Error("Language is not matched");
    }

    if (language.isEnglish()) {
      return await this._forEnglish(sentence);
    }
    throw new Error("Not implemented");
  }
  private isMatchedLanguage(sentence: Sentence, language: Language): boolean {
    return sentence.language.isSame(language);
  }
  private async _forEnglish(sentence: Sentence): Promise<WordList> {
    try {
      const response: Response = await fetch(
        `${getEnvValue(ENV_KEY.ENGLISH_LEMMATIZER_URL)}/api/lemmatize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: sentence.text.toJSON() }),
        }
      );
      const data: responseData | null = await response.json();
      if (!data) {
        throw new Error(
          "Lemmatization failed: received empty response from the server"
        );
      }
      const { tokens_with_POS } = data;

      if (!tokens_with_POS || tokens_with_POS.length === 0) {
        throw new Error(
          "Lemmatization failed: no tokens found in the response"
        );
      }
      return new WordList(
        tokens_with_POS.map(
          (token) =>
            new Word(
              new Text(token.lemma),
              new Language(LanguagesType.ENGLISH),
              this.convertLemmaPOSTagToPartOfSpeech(token.lemma_POS)
            )
        )
      );
    } catch (error) {
      throw new Error(`Failed to lemmatize text: ${error}`);
    }
  }

  private convertLemmaPOSTagToPartOfSpeech(
    lemmaPOSTag: LemmaPOSTag
  ): PartOfSpeech {
    const posMapping = {
      [LemmaPOSTag.NOUN]: PartOfSpeechType.NOUN,
      [LemmaPOSTag.VERB]: PartOfSpeechType.VERB,
      [LemmaPOSTag.ADJECTIVE]: PartOfSpeechType.ADJECTIVE,
      [LemmaPOSTag.ADVERB]: PartOfSpeechType.ADVERB,
    };
    const posType = posMapping[lemmaPOSTag];
    if (!posType) {
      throw new Error(`Unknown lemma POS tag: ${lemmaPOSTag}`);
    }
    return new PartOfSpeech(posType);
  }
}
