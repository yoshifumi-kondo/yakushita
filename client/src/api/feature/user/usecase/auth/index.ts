import { userService } from "@/api/feature/user/service";
import { SignIn } from "@/api/feature/user/usecase/auth/signin/SignIn";
import { SignUp } from "@/api/feature/user/usecase/auth/signup/SignUp";
import { SignInOrSignUp } from "@/api/feature/user/usecase/auth/signInOrSignup/SingInOrSignUp";

export const signIn = new SignIn(userService);
export const signUp = new SignUp(userService);
export const signInOrSignUp = new SignInOrSignUp(userService, signIn, signUp);
