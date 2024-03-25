import { UserAuth, User } from "@/api/lib/domain";

export interface ISignUp {
  execute(auth: UserAuth): Promise<User>;
}
