import type { UserAuth } from "@/api/lib/domain";
import { SignInUsecase } from "@/api/feature/user/usecase/auth/SignInUsecase";
import { SignUpUsecase } from "@/api/feature/user/usecase/auth/SignUpUsecase";
import { userService } from "@/api/feature/user/service";

export const SignInOrSignUpUsecase = async (auth: UserAuth) => {
  const user = await userService.getUserByAuth(auth);
  if (user) {
    return await SignInUsecase(auth);
  }
  return await SignUpUsecase(auth);
};
