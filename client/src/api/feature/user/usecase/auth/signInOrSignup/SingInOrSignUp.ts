import { UserAuth, User } from "@/api/lib/domain";
import { ISignInOrSignUp as ISignInOrSignUp } from "@/api/feature/user/usecase/auth/signInOrSignup/ISingInOrSignUp";
import { IUserService } from "@/api/feature/user/service/IUserService";
import { ISignIn } from "@/api/feature/user/usecase/auth/signin/ISignIn";
import { ISignUp } from "@/api/feature/user/usecase/auth/signup/ISignUp";

export class SignInOrSignUp implements ISignInOrSignUp {
  constructor(
    private readonly userService: IUserService,
    private readonly signIn: ISignIn,
    private readonly signUp: ISignUp
  ) {}

  async execute(auth: UserAuth): Promise<User> {
    const isExist = await this.userService.isExist(auth);
    if (isExist) {
      return await this.signInUser(auth);
    }
    return await this.signUp.execute(auth);
  }

  private async signInUser(auth: UserAuth): Promise<User> {
    const user = await this.signIn.execute(auth);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
