import { LanguagesType, PartOfSpeechType } from "@/api/lib/domain";
import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  id: string;
  auth: {
    google: {
      id: string;
    };
  };
}

export interface ISentence extends Document {
  content: string;
  words: mongoose.Types.ObjectId[];
  language: LanguagesType;
  userId: string;
}

export interface IWord extends Document {
  word: string;
  count: number;
  sentences: mongoose.Types.ObjectId[];
  language: LanguagesType;
  userId: string;
  partOfSpeech: PartOfSpeechType;
}

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  auth: {
    google: {
      id: {
        type: String,
        required: true,
      },
    },
  },
});

const SentenceSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  words: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Word",
    },
  ],
  language: {
    type: String,
    enum: Object.values(LanguagesType),
    required: true,
  },
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
});

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  sentences: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sentence",
    },
  ],
  language: {
    type: String,
    enum: Object.values(LanguagesType),
    required: true,
  },
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  partOfSpeech: {
    type: String,
    enum: Object.values(PartOfSpeechType),
    required: true,
  },
});

export const UserModel: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);

export const SentenceModel: Model<ISentence> =
  (mongoose.models.Sentence as Model<ISentence>) ||
  mongoose.model<ISentence>("Sentence", SentenceSchema);

export const WordModel: Model<IWord> =
  (mongoose.models.Word as Model<IWord>) ||
  mongoose.model<IWord>("Word", WordSchema);
