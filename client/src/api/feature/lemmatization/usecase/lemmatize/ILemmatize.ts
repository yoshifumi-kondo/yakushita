import type {
  Language,
  LemmatizedLemmatization,
  Text,
  UserId,
} from "@/api/lib/domain";

export abstract class ILemmatize {
  abstract execute(
    userId: UserId,
    language: Language,
    source: Text
  ): Promise<LemmatizedLemmatization>;
}
