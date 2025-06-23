import UserInMemoryRepository from "@/users/infrastructure/database/in-memory/repositories/user-in-memory-repository";
import { SignUpUsecase } from "../signup.usecase"
import { BcryptjsHashProvider } from "@/users/infrastructure/provider/hash-provider/bcryptjs-hash.provider";
import { HashProvider } from "@/shared/application/providers/hash-provider";
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder";
import ConflictError from "@/shared/errors/conflict-error";
import { BadRequestError } from "../../../../shared/application/errors/bad-request-error";

describe("SignUpUsecase unit test", () => {

  let sut: SignUpUsecase.UseCase;
  let repository: UserInMemoryRepository;
  let hashProvider: HashProvider;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    hashProvider = new BcryptjsHashProvider()
    sut = new SignUpUsecase.UseCase(repository, hashProvider)
  })

  it('should create a user', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    const props = UserDataBuilder({});
    const result = await sut.execute({
      name: props.name,
      email: props.email,
      password: props.password
    })

    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.password).not.toBe(props.password);
    expect(spyInsert).toHaveBeenCalledTimes(1);
  })

  it('should not be able to register a user with existing email', async () => {
    const props = UserDataBuilder({ email: "a@a.com" });
    await sut.execute(props)
    await expect(() => sut.execute(props)).rejects.toThrow(
      new ConflictError(`User with email ${props.email} already exists`))
  })

  it('should throw a error when name field is not provider', async () => {
    const props = Object.assign(UserDataBuilder({}), { name: null })
    await expect(() => sut.execute(props)).rejects
      .toThrow(new BadRequestError("Input field was not provided."))
  })

  it('should throw a error when email field is not provider', async () => {
    const props = Object.assign(UserDataBuilder({}), { email: null })
    await expect(() => sut.execute(props)).rejects
      .toThrow(new BadRequestError("Input field was not provided."))
  })

  it('should throw a error when password field is not provider', async () => {
    const props = Object.assign(UserDataBuilder({}), { password: null })
    await expect(() => sut.execute(props)).rejects
      .toThrow(new BadRequestError("Input field was not provided."))
  })
})
