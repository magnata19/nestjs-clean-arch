import { NotFoundError } from "@/shared/errors/not-found-error";
import UserInMemoryRepository from "../user-in-memory-repository";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder";
import ConflictError from "@/shared/errors/conflict-error";

describe("UserInMemoryRepository Unit Tests", () => {

  let sut: UserInMemoryRepository;

  beforeEach(() => {
    sut = new UserInMemoryRepository();
  })

  it('should throw error when not found user by email', async () => {
    expect(sut.findByEmail('fake@email.com')).rejects.toThrow(new NotFoundError(`User not found with email: fake@email.com`))
  })

  it('should find user by email - findByEmail', async () => {
    const user = new UserEntity(UserDataBuilder({
      name: 'John Doe',
      email: 'email@email.com'
    }))

    await sut.insert(user);
    const result = await sut.findByEmail(user.email);

    expect(user.toJSON()).toStrictEqual(result.toJSON())
  })

  it('should throw error when email not found - EmailExists', async () => {
    const user = new UserEntity(UserDataBuilder({}))

    await sut.insert(user);

    expect(sut.emailExists(user.email)).rejects.toThrow(new ConflictError(`User with email ${user.email} already exists`));
  })

  it('should find a user by email - EmailExists', async () => {
    expect.assertions(0);
    await sut.emailExists('a@a.com')
  })

  it('should not filter items when filter object is null', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await sut.insert(entity);
    const result = await sut.findAll();
    const spyFilter = jest.spyOn(result, 'filter');
    const itemsFiltered = await sut['applyFilter'](result, null);
    expect(spyFilter).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(result);
  })

  it('should filter name field - applyFilter', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ name: 'John Doe' })),
      new UserEntity(UserDataBuilder({ name: 'Jane Doe' })),
      new UserEntity(UserDataBuilder({ name: 'John Smith' })),
    ];

    const spyFilter = jest.spyOn(items, 'filter');
    const itemsFiltered = await sut['applyFilter'](items, 'John');
    expect(spyFilter).toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual([items[0], items[2]]);
  })

  it('should sort by createdAt when sort is null - applySort', async () => {

    const createdAt = new Date();

    const items = [
      new UserEntity(UserDataBuilder({ name: 'John Doe', createdAt })),
      new UserEntity(UserDataBuilder({ name: 'Jane Doe', createdAt: new Date(createdAt.getTime() + 1) })),
      new UserEntity(UserDataBuilder({ name: 'John Smith', createdAt: new Date(createdAt.getTime() + 2) })),
    ];

    const itemsSorted = await sut['applySort'](items, null, null)
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]])
  })

  it('should sort by createdAt when sort is null - applySort', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ name: 'John Doe' })),
      new UserEntity(UserDataBuilder({ name: 'Jane Doe' })),
      new UserEntity(UserDataBuilder({ name: 'John Smith' })),
    ];

    const itemsSorted = await sut['applySort'](items, 'name', 'asc')
    expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]])
  })
})
