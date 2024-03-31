import { GoogleAuth, User, UserAuth, UserId } from "@/api/lib/domain";
import { GoogleAuthId } from "@/api/lib/domain/user/auth/GoogleAuthId";
import { BaseRepository } from "@/api/infrastructure/persistent/mongo/BaseRepository";
import type { IUserRepository } from "@/api/lib/repository/IUserRepository";
import type { UserModel } from "@/api/infrastructure/persistent/mongo/Schema";

export class UserRepository extends BaseRepository implements IUserRepository {
  constructor(private readonly model: typeof UserModel) {
    super();
  }

  async createUser(user: User): Promise<void> {
    await this.performDbOperation(
      async () => {
        const json = user.toJSON();
        const newUser = new this.model(json);
        await newUser.save();
      },
      "Error creating user:",
      "Failed to create user"
    );
  }

  async getUserById(userId: UserId): Promise<User | null> {
    return await this.performDbOperation(
      async () => {
        const userDoc = await this.model.findById(userId.toJSON()).exec();
        return this.convertToUser(userDoc);
      },
      "Error getting user by ID:",
      "Failed to get user by ID"
    );
  }

  async getUserByAuth(auth: UserAuth): Promise<User | null> {
    return await this.performDbOperation(
      async () => {
        const { google } = auth.toJSON();
        const userDoc = await this.model
          .findOne({
            "auth.google.id": google?.id,
          })
          .exec();
        return this.convertToUser(userDoc);
      },
      "Error getting user by auth:",
      "Failed to get user by auth"
    );
  }

  async deleteUser(id: UserId): Promise<void> {
    await this.performDbOperation(
      async () => {
        await this.model.findByIdAndDelete(id.toJSON()).exec();
      },
      "Error deleting user:",
      "Failed to delete user"
    );
  }

  // TODO: Remove any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private convertToUser(userDoc: any): User | null {
    if (!userDoc) return null;
    const { id, auth: userAuth } = userDoc;
    const googleAuth = userAuth?.google
      ? new GoogleAuth(new GoogleAuthId(userAuth.google.id))
      : undefined;
    return new User(new UserId(id), new UserAuth({ google: googleAuth }));
  }
}
