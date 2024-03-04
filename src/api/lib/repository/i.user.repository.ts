import { UserAuth } from "@/api/lib/domain/user/auth/UserAuth";
import { User } from "@/api/lib/domain/user/User";
import { UserId } from "@/api/lib/domain/user/UserId";

export abstract class IUserRepository {
  abstract createUser(user: User): Promise<void>;
  abstract getUser(auth: UserAuth): Promise<User>;
  abstract deleteUser(id: UserId): Promise<void>;
}
