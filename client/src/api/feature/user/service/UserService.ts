import { UserAlreadyExistsError, UserNotFoundError } from "@/api/error";
import { User, type UserAuth, UserId } from "@/api/lib/domain";
import type { IUserRepository } from "@/api/lib/repository/IUserRepository";
import type { IUserService } from "@/api/feature/user/service/IUserService";

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async create(auth: UserAuth): Promise<User> {
    if (await this.isExistUser(auth)) {
      throw new UserAlreadyExistsError();
    }
    const user = User.create(auth);
    await this.userRepository.createUser(user);
    return user;
  }

  async getUser(userId: UserId): Promise<User | null> {
    return await this.userRepository.getUserById(userId);
  }
  async isExist(auth: UserAuth): Promise<boolean> {
    const user = await this.isExistUser(auth);
    return Boolean(user);
  }

  async getUserByAuth(auth: UserAuth): Promise<User | null> {
    return await this.userRepository.getUserByAuth(auth);
  }

  async deleteUser(userId: UserId): Promise<void> {
    if (!(await this.isExistUser(userId))) {
      throw new UserNotFoundError();
    }
    await this.userRepository.deleteUser(userId);
  }

  private async isExistUser(entity: UserAuth | UserId): Promise<boolean> {
    if (entity instanceof UserId) {
      return Boolean(await this.userRepository.getUserById(entity));
    }

    return Boolean(await this.userRepository.getUserByAuth(entity));
  }
}
