import type {
  LemmatizedLemmatizationList,
  UserId,
  Word,
} from "@/api/lib/domain";

export abstract class IGetLemmatizationByUsingWord {
  abstract execute(
    word: Word,
    userId: UserId
  ): Promise<LemmatizedLemmatizationList>;
}
