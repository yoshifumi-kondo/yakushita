import type {
  Language,
  LemmatizedLemmatization,
  Sentence,
  UserId,
} from "@/api/lib/domain";

export abstract class ILemmatize {
  abstract execute(
    userId: UserId,
    source: Sentence
  ): Promise<LemmatizedLemmatization>;
}
