import { PrismaClient } from "@prisma/client";
import { UserPrismaRepository } from "../../user-prisma-repository";
import { Test, TestingModule } from "@nestjs/testing";
import { setupPrismaTests } from "@/shared/infrastructure/database/prisma/testing/setup-prisma-tests";
import { DatabaseModule } from "@/shared/infrastructure/database/database.module";
import { PrismaService } from "@/shared/infrastructure/database/prisma/prisma.service";
import { NotFoundError } from "@/shared/errors/not-found-error";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder";

describe("UserPrismaRepository Integration Tests", () => {
  const prismaService = new PrismaClient();
  let sut: UserPrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setupPrismaTests()
    module = await Test.createTestingModule({ //create a module to be able to test the repository
      imports: [DatabaseModule.forTest(prismaService)]
    }).compile();
  })

  beforeEach(async () => {
    sut = new UserPrismaRepository(prismaService as PrismaService);
    await prismaService.user.deleteMany();
  })

  it('should throws an error when entity is not found by id', () => {
    expect(() => sut.findById("fake id")).rejects.toThrow(new NotFoundError(`UserModel using id fake id not found.`))
  })

  it('should find a user by id', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    const newUser = await prismaService.user.create({
      data: entity.toJSON() as any
    })

    const output = await sut.findById(newUser.id);
    expect(output.toJSON()).toStrictEqual(entity.toJSON());
  })

  it('should be able to insert a user', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await sut.insert(entity);

    const result = await prismaService.user.findUnique({
      where: { id: entity.id }
    })
    expect(result).toStrictEqual(entity.toJSON());
  })

  it('should return all users', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    const newUser = await prismaService.user.create({
      data: entity.toJSON() as any
    })

    const entities: UserEntity[] = await sut.findAll();
    expect(entities).toHaveLength(1)
    entities.map(item => expect(item.toJSON()).toStrictEqual(entity.toJSON()));
  })
})
