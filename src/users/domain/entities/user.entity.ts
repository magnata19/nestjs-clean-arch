import { Entity } from "@/shared/domain/entities/entity";

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export class UserEntity extends Entity {
  constructor(public readonly props: UserProps, id?: string) {
    super(props, id)
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  updateName(value: string): void {
    this.setName = value;
  }

  updatePassword(value: string): void {
    this.setPassword = value
  }

  get getName() {
    return this.props.name;
  }

  private set setName(value: string) {
    this.props.name = value;
  }

  get getEmail() {
    return this.props.email;
  }

  get getPassword() {
    return this.props.password;
  }

  private set setPassword(value: string) {
    this.props.password = value
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
