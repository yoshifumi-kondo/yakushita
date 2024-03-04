import { User } from "@/api/lib/domain/user/User";
import { UserId } from "@/api/lib/domain/user/UserId";
import { GoogleAuth } from "@/api/lib/domain/user/auth/GoogleAuth";
import { UserAuth } from "@/api/lib/domain/user/auth/UserAuth";
import { UserSchema } from "@/api/lib/infrastructure/persistent/mongo/schema";
import { IUserRepository } from "@/api/lib/repository/IUserRepository";
import mongoose from "mongoose";

export class UserRepository implements IUserRepository {
  private readonly MongooseUserModel;

  constructor() {
    this.MongooseUserModel = mongoose.model("User", UserSchema);
  }

  async createUser(user: User): Promise<void> {
    const newUser = new this.MongooseUserModel(user.toJSON());
    await newUser.save();
  }

  async getUser(auth: UserAuth): Promise<User> {
    const userDoc = await this.MongooseUserModel.findOne(auth.toJSON()).exec();
    if (!userDoc) {
      throw new Error("User not found");
    }
    const { id, auth: userAuth } = userDoc;
    const googleAuth = userAuth?.google
      ? new GoogleAuth(userAuth.google.id)
      : undefined;
    return new User(new UserId(id), new UserAuth({ google: googleAuth }));
  }

  async deleteUser(id: UserId): Promise<void> {
    await this.MongooseUserModel.findByIdAndDelete(id.toJSON()).exec();
  }
}
