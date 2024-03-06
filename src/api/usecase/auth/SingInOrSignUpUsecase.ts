import { UserAuth } from "@/api/lib/domain";
import { userService } from "@/api/service";
import { SignInUsecase } from "@/api/usecase/auth/SignInUsecase";
import { SignUpUsecase } from "@/api/usecase/auth/SignUpUsecase";

export const SignInOrSignUpUsecase = async (auth: UserAuth) => {
  const user = await userService.getUserByAuth(auth);
  if (user) {
    return await SignInUsecase(auth);
  }
  return await SignUpUsecase(auth);
};
