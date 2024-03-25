import { IUserService } from "@/api/feature/user/service/IUserService";
import { ISignUp } from "@/api/feature/user/usecase/auth/signup/ISignUp";
import { UserAuth, User } from "@/api/lib/domain";

export class SignUp implements ISignUp {
  private readonly userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async execute(auth: UserAuth): Promise<User> {
    return await this.userService.create(auth);
  }
}
