import { SignInUsecase } from "@/users/application/usecases/signin.usecase";

export class SigninDto implements SignInUsecase.Input {
  email: string;
  password: string;
}
