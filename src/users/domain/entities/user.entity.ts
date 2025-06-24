import { Entity } from "@/shared/domain/entities/entity";
import { UserValidatorFactory } from "../validator/user-validator";
import { EntityValidationError } from "@/shared/errors/validation-error";

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export class UserEntity extends Entity {
  constructor(public readonly props: UserProps, id?: string) {
    UserEntity.validate(props);
    super(props, id)
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  updateName(value: string): void {
    UserEntity.validate({ ...this.props, name: value })
    this.name = value;
  }

  updatePassword(value: string): void {
    UserEntity.validate({ ...this.props, password: value })
    this.setPassword = value
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  private set setPassword(value: string) {
    this.props.password = value
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create()
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
