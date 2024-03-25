import type { User, UserAuth, UserId } from "@/api/lib/domain";

export abstract class IUserService {
  abstract create(auth: UserAuth): Promise<User>;
  abstract getUser(userId: UserId): Promise<User | null>;
  abstract getUserByAuth(auth: UserAuth): Promise<User | null>;
  abstract isExist(auth: UserAuth): Promise<boolean>;
  abstract deleteUser(id: UserId): Promise<void>;
}
