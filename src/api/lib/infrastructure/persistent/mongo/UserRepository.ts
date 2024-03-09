import { DatabaseError } from "@/api/error";
import { UserId, GoogleAuth, User, UserAuth } from "@/api/lib/domain";
import { GoogleAuthId } from "@/api/lib/domain/user/auth/GoogleAuthId";
import { UserSchema } from "@/api/lib/infrastructure/persistent/mongo/schema";
import { IUserRepository } from "@/api/lib/repository/IUserRepository";
import mongoose from "mongoose";

export class UserRepository implements IUserRepository {
  private readonly MongooseUserModel;

  constructor() {
    this.MongooseUserModel =
      mongoose.models.User || mongoose.model("User", UserSchema);
  }

  async createUser(user: User): Promise<void> {
    try {
      const newUser = new this.MongooseUserModel(user.toJSON());
      await newUser.save();
    } catch (error) {
      console.error("Error creating user:", error);
      throw new DatabaseError("Failed to create user");
    }
  }

  async getUserById(userId: UserId): Promise<User | null> {
    try {
      const userDoc = await this.MongooseUserModel.findById(
        userId.toJSON()
      ).exec();
      if (!userDoc) {
        return null;
      }
      const { id, auth: userAuth } = userDoc;
      const googleAuth = userAuth?.google
        ? new GoogleAuth(new GoogleAuthId(userAuth.google.id))
        : undefined;
      return new User(new UserId(id), new UserAuth({ google: googleAuth }));
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw new DatabaseError("Failed to get user by ID");
    }
  }

  async getUserByAuth(auth: UserAuth): Promise<User | null> {
    try {
      const { google } = auth.toJSON();
      const userDoc = await this.MongooseUserModel.findOne({
        "auth.google.id": google?.id,
      }).exec();
      if (!userDoc) {
        return null;
      }
      const { id, auth: userAuth } = userDoc;
      const googleAuth = userAuth?.google
        ? new GoogleAuth(new GoogleAuthId(userAuth.google.id))
        : undefined;
      return new User(new UserId(id), new UserAuth({ google: googleAuth }));
    } catch (error) {
      console.error("Error getting user by auth:", error);
      throw new DatabaseError("Failed to get user by auth");
    }
  }

  async deleteUser(id: UserId): Promise<void> {
    try {
      await this.MongooseUserModel.findByIdAndDelete(id.toJSON()).exec();
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new DatabaseError("Failed to delete user");
    }
  }
}
