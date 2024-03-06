import { UserAuth } from "@/api/lib/domain/user/auth/UserAuth";
import { userService } from "@/api/service";

export const SignInUsecase = async (auth: UserAuth) => {
  return await userService.getUserByAuth(auth);
};
