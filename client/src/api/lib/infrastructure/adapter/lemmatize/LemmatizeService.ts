import {
  Language,
  LanguagesType,
  Original,
  Text,
  Translated,
  Word,
  WordList,
} from "@/api/lib/domain";
import {
  PartOfSpeech,
  PartOfSpeechType,
} from "@/api/lib/domain/translation/PartOfSpeech";
import { ENV_KEY, getEnvValue } from "@/utils/geEnv";
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

export class LemmatizeService {
  async lemmatizeForEnglish(target: Translated | Original): Promise<WordList> {
    if (!target.language.isSame(new Language(LanguagesType.ENGLISH))) {
      console.log(
        `Lemmatization failed: target language is not English: ${target.language}`
      );
      throw new Error("Lemmatization failed: target language is not English");
    }
    const response: Response = await fetch(
      `${getEnvValue(ENV_KEY.API_URL)}/api/lemmatize`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: target.text.toJSON() }),
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
      throw new Error("Lemmatization failed: no tokens found in the response");
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
  }

  private convertLemmaPOSTagToPartOfSpeech(
    lemmaPOSTag: LemmaPOSTag
  ): PartOfSpeech {
    switch (lemmaPOSTag) {
      case LemmaPOSTag.NOUN:
        return new PartOfSpeech(PartOfSpeechType.NOUN);
      case LemmaPOSTag.VERB:
        return new PartOfSpeech(PartOfSpeechType.VERB);
      case LemmaPOSTag.ADJECTIVE:
        return new PartOfSpeech(PartOfSpeechType.ADJECTIVE);
      case LemmaPOSTag.ADVERB:
        return new PartOfSpeech(PartOfSpeechType.ADVERB);
      default:
        throw new Error(`Unknown lemma POS tag: ${lemmaPOSTag}`);
    }
  }
}
