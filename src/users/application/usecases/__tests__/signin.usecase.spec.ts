import UserInMemoryRepository from "@/users/infrastructure/database/in-memory/repositories/user-in-memory-repository";
import { BcryptjsHashProvider } from "@/users/infrastructure/provider/hash-provider/bcryptjs-hash.provider";
import { HashProvider } from "@/shared/application/providers/hash-provider";
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder";
import { BadRequestError } from "../../../../shared/application/errors/bad-request-error";
import { SignInUsecase } from "../signin.usecase";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { NotFoundError } from "@/shared/errors/not-found-error";
import { hash } from "crypto";
import { InvalidCredentialsError } from "@/shared/application/errors/invalid-credentials.error";

describe("SignInUsecase unit test", () => {

  let sut: SignInUsecase.UseCase;
  let repository: UserInMemoryRepository;
  let hashProvider: HashProvider;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    hashProvider = new BcryptjsHashProvider()
    sut = new SignInUsecase.UseCase(repository, hashProvider)
  })

  it('should authenticate a user', async () => {
    const spyFindByEmail = jest.spyOn(repository, 'findByEmail');
    const hashPassword = await hashProvider.generateHash("12345");
    const entity = new UserEntity(UserDataBuilder({ email: 'a@a.com', password: hashPassword }));
    repository.items = [entity]
    const result = await sut.execute({
      email: entity.email,
      password: '12345'
    })
    expect(spyFindByEmail).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(entity.toJSON());
  })

  it('should throw a error when email field is not provider', async () => {
    const props = { email: null, password: '12345' };
    await expect(() => sut.execute(props)).rejects
      .toThrow(new BadRequestError("Input field was not provided."))
  })

  it('should throw a error when password field is not provider', async () => {
    const props = { email: 'a@a.com', password: null };
    await expect(() => sut.execute(props)).rejects
      .toBeInstanceOf(BadRequestError);
  })

  it('should not be able to authenticate a user with invalid email', async () => {
    const props = { email: 'a@a.com', password: '12345' };
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(NotFoundError);
  })

  it('should not be able to authenticate a user with invalid password', async () => {
    const hashPassword = await hashProvider.generateHash('1234');
    const entity = new UserEntity(UserDataBuilder({ email: 'a@a.com', password: hashPassword }));
    repository.items = [entity];

    const props = { email: entity.email, password: 'fake' };
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(InvalidCredentialsError);
  })
})
