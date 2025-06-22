import UserInMemoryRepository from "@/users/infrastructure/database/in-memory/repositories/user-in-memory-repository";
import { GetUserUseCase } from "../getuser.usecase";
import { NotFoundError } from "@/shared/errors/not-found-error";
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder";
import { UserEntity } from "@/users/domain/entities/user.entity";

describe("GetUserUsecase unit test", () => {

  let sut: GetUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    sut = new GetUserUseCase.UseCase(repository);
  })

  it('should throw a NotFoundError when user is not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found')
    )
  })

  it('should return a user when id is valid', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');
    const items = [new UserEntity(UserDataBuilder({}))];
    repository.items = items;
    const result = await sut.execute({ id: items[0]._id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(items[0].toJSON());
  })
})
