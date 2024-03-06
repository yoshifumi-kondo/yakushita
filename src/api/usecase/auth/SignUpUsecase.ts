import { UserAuth } from "@/api/lib/domain/user/auth/UserAuth";
import { userService } from "@/api/service";

export const SignUpUsecase = async (auth: UserAuth) => {
  return await userService.create(auth);
};
