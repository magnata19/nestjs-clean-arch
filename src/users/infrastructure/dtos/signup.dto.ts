import { SignUpUsecase } from "@/users/application/usecases/signup.usecase";

export class SignupDto implements SignUpUsecase.Input {
  name: string;
  email: string;
  password: string;
}
