import { NotFoundError } from "@/shared/errors/not-found-error";
import { PrismaService } from "@/shared/infrastructure/database/prisma/prisma.service";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { UserRepository } from "@/users/domain/repositories/user.repository";
import { UserModelMapper } from "../models/user-model.mapper";

export class UserPrismaRepository implements UserRepository.Repository {
  searchableFields: string[] = ['name', 'createdAt'];

  constructor(private prismaService: PrismaService) { }
  findByEmail(email: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  emailExists(email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async search(props: UserRepository.SearchParams): Promise<UserRepository.SearchResult> {
    const sortable: boolean = this.searchableFields?.includes(props.sort) || false;
    const orderByField = sortable ? props.sort : 'createdAt';
    const orderByDir = sortable ? props.sortDir : 'desc';
    const count = await this.prismaService.user.count({
      ...(props.filter && { // caso exista filtro, entao adiciona o filtro
        where: {
          name: { // filtro de pesquisa
            contains: props.filter,
            mode: 'insensitive'
          }
        }
      })
    })

    const models = await this.prismaService.user.findMany({
      where: {
        ...(props.filter && {
          name: {
            contains: props.filter,
            mode: 'insensitive'
          }
        }),
      },
      orderBy: {
        [orderByField]: orderByDir
      },
      skip: props.page && props.page > 0 ? (props.page - 1) * props.perPage : 1,
      take: props.perPage && props.perPage > 0 ? props.perPage : 15
    })
    return new UserRepository.SearchResult({
      items: (await models).map(model => UserModelMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByField,
      sortDir: orderByDir,
      filter: props.filter
    })
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
