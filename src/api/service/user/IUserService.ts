import { User } from "@/api/lib/domain/user/User";
import { UserId } from "@/api/lib/domain/user/UserId";
import { UserAuth } from "@/api/lib/domain/user/auth/UserAuth";

export abstract class IUserService {
  abstract create(auth: UserAuth): Promise<User>;
  abstract getUser(userId: UserId): Promise<User | null>;
  abstract getUserByAuth(auth: UserAuth): Promise<User | null>;
  abstract deleteUser(id: UserId): Promise<void>;
}
