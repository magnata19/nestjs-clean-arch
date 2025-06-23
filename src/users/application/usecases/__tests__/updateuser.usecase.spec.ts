import UserInMemoryRepository from "@/users/infrastructure/database/in-memory/repositories/user-in-memory-repository";
import { GetUserUseCase } from "../getuser.usecase";
import { NotFoundError } from "@/shared/errors/not-found-error";
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { UpdateUserUsecase } from "../update-user.usecase";
import { BadRequestError } from "@/shared/application/errors/bad-request-error";

describe("UpdateUserUsecase unit test", () => {

  let sut: UpdateUserUsecase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    sut = new UpdateUserUsecase.UseCase(repository);
  })

  it('should throw a NotFoundError when user is not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId', name: "Davidson" })).rejects.toThrow(
      new NotFoundError('Entity not found')
    )
  })

  it('should throw a BadRequestError when name is not provided', async () => {
    await expect(() => sut.execute({ id: "fakeId", name: "" })).rejects.toThrow
      (new BadRequestError("Name not provided."))
  })

  it("should update a user name", async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const items = [new UserEntity(UserDataBuilder({}))];
    repository.items = items;
    const result = await sut.execute({ id: items[0]._id, name: "Davidson" });
    expect(spyUpdate).toHaveBeenCalled();
    expect(result).toStrictEqual({
      id: items[0]._id,
      name: "Davidson",
      email: items[0].getEmail,
      password: items[0].getPassword,
      createdAt: items[0].createdAt,
    })
  })

})
