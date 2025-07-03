import { ValidationError } from "@/shared/errors/validation-error";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { User } from "@prisma/client";

export class UserModelMapper {
  static toEntity(model: User) {
    const data = {
      name: model.name,
      email: model.email,
      password: model.password,
      createdAt: model.createdAt,
    }

    try {
      return new UserEntity(data, model.id);
    } catch (err) {
      throw new ValidationError("An entity was not able to be loaded")
    }
  }
}
