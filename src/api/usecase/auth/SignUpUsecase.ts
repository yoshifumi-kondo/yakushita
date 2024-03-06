import { UserAuth } from "@/api/lib/domain";
import { userService } from "@/api/service";

export const SignUpUsecase = async (auth: UserAuth) => {
  return await userService.create(auth);
};
