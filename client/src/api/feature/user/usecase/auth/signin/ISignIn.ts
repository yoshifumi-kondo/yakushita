import { UserAuth, User } from "@/api/lib/domain";

export interface ISignIn {
  execute(auth: UserAuth): Promise<User | null>;
}
