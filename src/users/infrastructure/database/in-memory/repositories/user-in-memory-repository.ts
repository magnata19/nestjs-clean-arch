import { InMemorySearchableRepository } from "@/shared/domain/repositories/in-memory-searchable-repository";
import { InMemoryRepository } from "@/shared/domain/repositories/in-memory.repository";
import ConflictError from "@/shared/errors/conflict-error";
import { NotFoundError } from "@/shared/errors/not-found-error";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { UserRepository } from "@/users/domain/repositories/user.repository";

export default class UserInMemoryRepository extends InMemorySearchableRepository<UserEntity> implements UserRepository {
  async findByEmail(email: string): Promise<UserEntity> {
    const user = this.items.find(item => item.getEmail === email);
    if (!user) {
      throw new NotFoundError(`User not found with email: ${email}`);
    }
    return user;
  }
  async emailExists(email: string): Promise<void> {
    const user = this.items.find(item => item.getEmail === email);
    if (user) {
      throw new ConflictError(`User with email ${email} already exists`);
    }
  }

  async delete(id: string): Promise<void> {

  }
}
