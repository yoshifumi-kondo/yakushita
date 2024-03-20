import type { User, UserAuth, UserId } from "@/api/lib/domain";

export abstract class IUserRepository {
	abstract createUser(user: User): Promise<void>;
	abstract getUserById(userId: UserId): Promise<User | null>;
	abstract getUserByAuth(auth: UserAuth): Promise<User | null>;
	abstract deleteUser(id: UserId): Promise<void>;
}
