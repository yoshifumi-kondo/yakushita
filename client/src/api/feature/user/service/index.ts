import { UserRepository } from "@/api/infrastructure/persistent/mongo/UserRepository";
import { UserService } from "@/api/feature/user/service/UserService";
import { UserModel } from "@/api/infrastructure/persistent/mongo/Schema";

export const userService = new UserService(new UserRepository(UserModel));
