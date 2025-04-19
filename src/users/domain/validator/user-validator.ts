import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { UserProps } from "../entities/user.entity";
import { ClassValidatorFields } from "@/shared/domain/validators/class-validator-fields";

export class UserRoles {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  email: string;

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;
  constructor({ email, name, password, createdAt }: UserProps) {
    Object.assign(this, { email, name, password, createdAt });
  }
}

export class UserValidator extends ClassValidatorFields<UserProps> {
  validate(data: UserProps): boolean {
    return super.validate(new UserRoles(data ?? {} as UserProps));
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator();
  }
}
