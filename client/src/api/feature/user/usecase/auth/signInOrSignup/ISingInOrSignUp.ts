import { UserAuth, User } from "@/api/lib/domain";

export interface ISignInOrSignUp {
  execute(auth: UserAuth): Promise<User>;
}
