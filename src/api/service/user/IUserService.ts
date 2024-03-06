import { User, UserAuth, UserId } from "@/api/lib/domain";

export abstract class IUserService {
  abstract create(auth: UserAuth): Promise<User>;
  abstract getUser(userId: UserId): Promise<User | null>;
  abstract getUserByAuth(auth: UserAuth): Promise<User | null>;
  abstract deleteUser(id: UserId): Promise<void>;
}
