import { UserRepository } from "@/users/domain/repositories/user.repository";
import { UserOutput, UserOutputMapper } from "../dtos/user-output";
import { UseCase as DefaultUseCase } from "@/shared/application/usecases/use-case";
import { InvalidPasswordError } from "@/shared/application/errors/invalid-password.error";
import { HashProvider } from "@/shared/application/providers/hash-provider";

export namespace UpdatePasswordUsecase {

  export type Input = {
    id: string;
    password: string;
    oldPassword: string;
  }

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider
    ) { }
    async execute(input: Input): Promise<UserOutput> {
      const entity = await this.userRepository.findById(input.id);
      if (!input.password || !input.oldPassword) {
        throw new InvalidPasswordError("Old Password and new password are required.");
      }

      const checkedPassword = await this.hashProvider.compareHash(input.oldPassword, entity.password);
      if (!checkedPassword) {
        throw new InvalidPasswordError("Old password does not match.");
      }
      const hashedPassword = await this.hashProvider.generateHash(input.password);
      entity.updatePassword(hashedPassword);
      await this.userRepository.update(entity);
      return UserOutputMapper.toOutput(entity);
    }
  }
}
