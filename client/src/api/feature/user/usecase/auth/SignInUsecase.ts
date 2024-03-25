import { userService } from "@/api/feature/user/service";
import type { UserAuth } from "@/api/lib/domain";

export const SignInUsecase = async (auth: UserAuth) => {
  return await userService.getUserByAuth(auth);
};
