import { PrismaClient, User } from "@prisma/client";
import { UserModelMapper } from "../user-model.mapper";
import { ValidationError } from "@/shared/errors/validation-error";
import { setupPrismaTests } from "@/shared/infrastructure/database/prisma/testing/setup-prisma-tests";
import { UserEntity } from "@/users/domain/entities/user.entity";

describe("UserModelMapper Integration Tests", () => {
  let prismaService: PrismaClient;
  let props: any;

  beforeAll(async () => {
    prismaService = new PrismaClient();
    await prismaService.$connect();
  })

  beforeEach(async () => {
    setupPrismaTests()
    await prismaService.user.deleteMany();
    props = {
      id: '448df28e-e2f1-4045-b63c-4cadbaa09f4e',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'hashed_password',
      createdAt: new Date(),
    }
  })

  afterAll(async () => {
    await prismaService.$disconnect();
  })


  it('should throws error when user model is invalid', () => {
    const model: User = Object.assign(props, { name: null });
    expect(() => UserModelMapper.toEntity(model)).toThrow(new ValidationError("An entity was not able to be loaded"));
  })

  it('should convert a user to a user entity', async () => {
    const model: User = await prismaService.user.create({ data: props });
    const sut = UserModelMapper.toEntity(model);
    expect(sut).toBeInstanceOf(UserEntity);
    expect(sut.toJSON()).toStrictEqual(props);
  })
})
