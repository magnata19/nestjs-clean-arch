import { th } from "@faker-js/faker/.";
import { BadRequestError } from "../errors/bad-request-error";
import { UserRepository } from "@/users/domain/repositories/user.repository";
import { UserEntity } from "@/users/domain/entities/user.entity";

export namespace SignUpUsecase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  }

  export type Output = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
  }

  export class UseCase {
    constructor(private userRepository: UserRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const { name, email, password } = input;

      if (!name || !email || !password) {
        throw new BadRequestError("Input field was not provided.")
      }

      await this.userRepository.emailExists(email);

      const entity = new UserEntity(input);

      await this.userRepository.insert(entity);

      return entity.toJSON() as Output;

    }
  }
}


