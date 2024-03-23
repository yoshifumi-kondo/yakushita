import {
  Language,
  LanguagesType,
  Original,
  Text,
  Translated,
  Word,
  WordList,
  Lemmatization,
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
  async lemmatizeForEnglish(
    target: Translated | Original
  ): Promise<Lemmatization> {
    if (!target.language.isSame(new Language(LanguagesType.ENGLISH))) {
      console.log(
        `Lemmatization failed: target language is not English: ${target.language}`
      );
      throw new Error("Lemmatization failed: target language is not English");
    }

    const data = await this._lemmatizeEnglishText(target.text.toJSON());
    if (!data) {
      throw new Error(
        "Lemmatization failed: received empty response from the server"
      );
    }
    const { tokens_with_POS, original } = data;

    if (!tokens_with_POS || tokens_with_POS.length === 0) {
      throw new Error("Lemmatization failed: no tokens found in the response");
    }

    const wordList = new WordList(
      tokens_with_POS.map(
        (token) =>
          new Word(
            new Text(token.lemma),
            new Language(LanguagesType.ENGLISH),
            this.convertLemmaPOSTagToPartOfSpeech(token.lemma_POS)
          )
      ),
      new Language(LanguagesType.ENGLISH)
    );

    return new Lemmatization(
      wordList,
      new Language(LanguagesType.ENGLISH),
      new Text(original)
    );
  }

  private async _lemmatizeEnglishText(text: string) {
    try {
      const response: Response = await fetch(
        `${getEnvValue(ENV_KEY.ENGLISH_LEMMATIZER_URL)}/api/lemmatize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );
      const data: responseData | null = await response.json();
      return data;
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
