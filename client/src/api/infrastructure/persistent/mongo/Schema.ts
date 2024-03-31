import mongoose, { type Document, type Model } from "mongoose";
import { LanguagesType, PartOfSpeechType } from "@/api/lib/domain";
import { TRANSLATION_TYPE } from "@/api/lib/domain/translation/TranslationStatus";
import { LEMMATIZATION_TYPE } from "@/api/lib/domain/lemmatization/LemmatizationStatus";

enum MODEL_NAMES {
  USER = "User",
  TRANSLATION = "Translation",
  LEMMATIZATION = "Lemmatization",
  WORD_USAGE = "WordUsage",
}

interface Sentence {
  text: string;
  language: LanguagesType;
}

export interface IUser extends Document {
  auth: {
    google: {
      id: string;
    };
  };
}

export interface ITranslation extends Document {
  id: string;
  status: TRANSLATION_TYPE;
  userId: string;
  original: {
    sentence: Sentence;
  };
  config: {
    fromTo: {
      from: LanguagesType;
      to: LanguagesType;
    };
  };
  translated?: {
    sentence: Sentence;
  };
}

export interface ILemmatization extends Document {
  id: string;
  status: LEMMATIZATION_TYPE;
  userId: string;
  language: LanguagesType;
  source: Sentence;
  wordList?: {
    text: string;
    partOfSpeech: PartOfSpeechType;
    language: LanguagesType;
  }[];
}

export interface IWordUsage extends Document {
  id: string;
  userId: string;
  word: {
    text: string;
    partOfSpeech: PartOfSpeechType;
    language: LanguagesType;
  };
  count: number;
  masteryPercentage: number;
  exclusion: boolean;
}

const UserSchema = new mongoose.Schema({
  auth: {
    google: {
      id: { type: String, required: true },
    },
  },
});

const TranslationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: Object.values(TRANSLATION_TYPE),
    required: true,
  },
  userId: { type: String, required: true, ref: MODEL_NAMES.USER },
  original: {
    sentence: {
      text: { type: String, required: true },
      language: {
        type: String,
        enum: Object.values(LanguagesType),
        required: true,
      },
    },
  },
  translated: {
    sentence: {
      text: { type: String, required: true },
      language: {
        type: String,
        enum: Object.values(LanguagesType),
        required: true,
      },
    },
  },
  config: {
    fromTo: {
      from: {
        type: String,
        enum: Object.values(LanguagesType),
        required: true,
      },
      to: {
        type: String,
        enum: Object.values(LanguagesType),
        required: true,
      },
    },
  },
});

const LemmatizationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: Object.values(LEMMATIZATION_TYPE),
    required: true,
  },
  userId: { type: String, required: true, ref: MODEL_NAMES.USER },
  wordList: [
    {
      text: { type: String, required: true },
      partOfSpeech: {
        type: String,
        enum: Object.values(PartOfSpeechType),
        required: true,
      },
      language: {
        type: String,
        enum: Object.values(LanguagesType),
        required: true,
      },
    },
  ],
  language: {
    type: String,
    enum: Object.values(LanguagesType),
    required: true,
  },
  source: {
    text: { type: String, required: true },
    language: {
      type: String,
      enum: Object.values(LanguagesType),
      required: true,
    },
  },
});

const WordUsageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    ref: MODEL_NAMES.USER,
  },
  word: {
    text: { type: String, required: true },
    partOfSpeech: {
      type: String,
      enum: Object.values(PartOfSpeechType),
      required: true,
    },
    language: {
      type: String,
      enum: Object.values(LanguagesType),
      required: true,
    },
  },
  count: {
    type: Number,
    required: true,
  },
  masteryPercentage: {
    type: Number,
    required: true,
  },
  exclusion: {
    type: Boolean,
    required: true,
  },
});

export const UserModel: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>(MODEL_NAMES.USER, UserSchema);
export const TranslationModel: Model<ITranslation> =
  (mongoose.models.Translation as Model<ITranslation>) ||
  mongoose.model<ITranslation>(MODEL_NAMES.TRANSLATION, TranslationSchema);
export const LemmatizationModel: Model<ILemmatization> =
  (mongoose.models.Lemmatization as Model<ILemmatization>) ||
  mongoose.model<ILemmatization>(
    MODEL_NAMES.LEMMATIZATION,
    LemmatizationSchema
  );
export const WordUsageModel: Model<IWordUsage> =
  (mongoose.models.WordUsage as Model<IWordUsage>) ||
  mongoose.model<IWordUsage>(MODEL_NAMES.WORD_USAGE, WordUsageSchema);
