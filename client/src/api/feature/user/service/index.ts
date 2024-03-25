import { UserRepository } from "@/api/infrastructure/persistent/mongo/UserRepository";
import { UserService } from "@/api/feature/user/service/UserService";

export const userService = new UserService(new UserRepository());
