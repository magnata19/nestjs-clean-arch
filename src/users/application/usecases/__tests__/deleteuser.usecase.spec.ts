import UserInMemoryRepository from "@/users/infrastructure/database/in-memory/repositories/user-in-memory-repository";
import { GetUserUseCase } from "../getuser.usecase";
import { NotFoundError } from "@/shared/errors/not-found-error";
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { DeleteUserUsecase } from "../delete-user.usecase";

describe("DeleteUserUsecase unit test", () => {

  let sut: DeleteUserUsecase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    sut = new DeleteUserUsecase.UseCase(repository);
  })

  it('should throw a NotFoundError when user is not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found')
    )
  })

  it('should delete a user when id is valid', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');
    const items = [new UserEntity(UserDataBuilder({}))];
    repository.items = items;
    expect(repository.items.length).toBe(1)
    const result = await sut.execute({ id: items[0]._id });
    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(result).toEqual(void 0);
    expect(repository.items.length).toBe(0)
  })
})
