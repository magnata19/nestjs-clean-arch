import { BadRequestError } from "../../../shared/application/errors/bad-request-error";
import { UserRepository } from "@/users/domain/repositories/user.repository";
import { HashProvider } from "@/shared/application/providers/hash-provider";
import { UserOutput, UserOutputMapper } from "../dtos/user-output";
import { UseCase as DefaultUseCase } from "@/shared/application/usecases/use-case";
import { InvalidCredentialsError } from "@/shared/application/errors/invalid-credentials.error";

export namespace SignInUsecase {
  export type Input = {
    email: string;
    password: string;
  }

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider
    ) { }

    async execute(input: Input): Promise<Output> {
      const { email, password } = input;

      if (!email || !password) {
        throw new BadRequestError("Input field was not provided.")
      }

      const user = await this.userRepository.findByEmail(email);
      const hashPasswordMatches = await this.hashProvider.compareHash(password, user.password);

      if (!hashPasswordMatches) {
        throw new InvalidCredentialsError("Invalid credentials.")
      }

      return UserOutputMapper.toOutput(user);
    }
  }
}


