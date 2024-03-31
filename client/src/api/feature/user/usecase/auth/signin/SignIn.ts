import type { IUserService } from "@/api/feature/user/service/IUserService";
import type { ISignIn } from "@/api/feature/user/usecase/auth/signin/ISignIn";
import type { UserAuth, User } from "@/api/lib/domain";

export class SignIn implements ISignIn {
  private readonly userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async execute(auth: UserAuth): Promise<User | null> {
    return await this.userService.getUserByAuth(auth);
  }
}
