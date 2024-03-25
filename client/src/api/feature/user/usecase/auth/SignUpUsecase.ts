import { userService } from "@/api/feature/user/service";
import type { UserAuth } from "@/api/lib/domain";

export const SignUpUsecase = async (auth: UserAuth) => {
  return await userService.create(auth);
};
