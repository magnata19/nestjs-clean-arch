import { InMemorySearchableRepository } from "@/shared/domain/repositories/in-memory-searchable-repository";
import { InMemoryRepository } from "@/shared/domain/repositories/in-memory.repository";
import { SortDirection } from "@/shared/domain/repositories/searchable-repository-contract";
import ConflictError from "@/shared/errors/conflict-error";
import { NotFoundError } from "@/shared/errors/not-found-error";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { UserRepository } from "@/users/domain/repositories/user.repository";

export default class UserInMemoryRepository extends InMemorySearchableRepository<UserEntity> implements UserRepository.Repository {

  searchableFields: string[] = ['name', 'createdAt'];

  async findByEmail(email: string): Promise<UserEntity> {
    const user = this.items.find(item => item.email === email);
    if (!user) {
      throw new NotFoundError(`User not found with email: ${email}`);
    }
    return user;
  }
  async emailExists(email: string): Promise<void> {
    const user = this.items.find(item => item.email === email);
    if (user) {
      throw new ConflictError(`User with email ${email} already exists`);
    }
  }

  protected async applyFilter(items: UserEntity[], filter: UserRepository.Filter): Promise<UserEntity[]> {
    if (!filter) {
      return items;
    }
    return items.filter(items => {
      return items.props.name.toLowerCase().includes(filter.toLowerCase())
    })
  }

  protected async applySort(items: UserEntity[], sort: string | null, sortDir: SortDirection | null): Promise<UserEntity[]> {
    return !sort ? super.applySort(items, 'createdAt', 'desc') : super.applySort(items, sort, sortDir);
  }
}
