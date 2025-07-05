import { NotFoundError } from "@/shared/errors/not-found-error";
import { PrismaService } from "@/shared/infrastructure/database/prisma/prisma.service";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { UserRepository } from "@/users/domain/repositories/user.repository";
import { UserModelMapper } from "../models/user-model.mapper";

export class UserPrismaRepository implements UserRepository.Repository {

  constructor(private prismaService: PrismaService) { }
  findByEmail(email: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  emailExists(email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  searchableFields: string[];
  search(input: UserRepository.SearchParams): Promise<UserRepository.SearchResult> {
    throw new Error("Method not implemented.");
  }
  async insert(entity: UserEntity): Promise<void> {
    await this.prismaService.user.create({
      data: entity.toJSON() as any
    })
  }
  async findById(id: string): Promise<UserEntity> {
    return this._get(id);
  }
  async findAll(): Promise<UserEntity[]> {
    const models = await this.prismaService.user.findMany();
    return models.map(model => UserModelMapper.toEntity(model));
  }
  update(entity: UserEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  protected async _get(id: string): Promise<UserEntity> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id }
      })
      return UserModelMapper.toEntity(user);
    } catch (err) {
      throw new NotFoundError(`UserModel using id ${id} not found.`)
    }
  }

}
