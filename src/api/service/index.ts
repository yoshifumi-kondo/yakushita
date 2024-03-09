import { UserRepository } from "@/api/lib/infrastructure/persistent/mongo/UserRepository";
import { UserService } from "@/api/service/user/UserService";

export const userService = new UserService(new UserRepository());
