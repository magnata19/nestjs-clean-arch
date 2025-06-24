import UserInMemoryRepository from "@/users/infrastructure/database/in-memory/repositories/user-in-memory-repository";
import { NotFoundError } from "@/shared/errors/not-found-error";
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { UpdatePasswordUsecase } from "../update-password.usecase";
import { HashProvider } from "@/shared/application/providers/hash-provider";
import { BcryptjsHashProvider } from "@/users/infrastructure/provider/hash-provider/bcryptjs-hash.provider";
import { InvalidPasswordError } from "@/shared/application/errors/invalid-password.error";

describe("UpdatePasswordUsecase unit test", () => {

  let sut: UpdatePasswordUsecase.UseCase;
  let repository: UserInMemoryRepository;
  let hashProvider: HashProvider;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    hashProvider = new BcryptjsHashProvider();
    sut = new UpdatePasswordUsecase.UseCase(repository, hashProvider);
  })

  it('should throw a NotFoundError when user is not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId', password: "davidson", oldPassword: "dasdas" })).rejects.toThrow(
      new NotFoundError('Entity not found')
    )
  })

  it('should throw a BadRequestError when oldPassword is not provided', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    repository.items = [entity];
    await expect(() => sut.execute({ id: entity._id, password: "davidson", oldPassword: "" })).rejects.toThrow
      (new InvalidPasswordError("Old Password and new password are required."))
  })

  it('should throw a BadRequestError when new password is not provided', async () => {
    const entity = new UserEntity(UserDataBuilder({ password: "1234" }));
    repository.items = [entity];
    await expect(() => sut.execute({ id: entity._id, password: "", oldPassword: "1234" })).rejects.toThrow
      (new InvalidPasswordError("Old Password and new password are required."))
  })

  it('should throw a error when old password does not match', async () => {
    const hashedPassword = await hashProvider.generateHash("1234")
    const entity = new UserEntity(UserDataBuilder({ password: hashedPassword }));
    repository.items = [entity];
    await expect(() => sut.execute({ id: entity._id, password: "davidson", oldPassword: "1234" }))
      .rejects.toThrow(new InvalidPasswordError("Old password does not match."));
  })

  it("should update a user name", async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const hashedPassword = await hashProvider.generateHash("1234");
    const items = [new UserEntity(UserDataBuilder({ password: hashedPassword }))];
    repository.items = items;
    const result = await sut.execute({ id: items[0]._id, password: "davidson", oldPassword: "1234" });
    const checkPassword = await hashProvider.compareHash("davidson", result.password);
    expect(spyUpdate).toHaveBeenCalled();
    expect(checkPassword).toBeTruthy()
  })

})
