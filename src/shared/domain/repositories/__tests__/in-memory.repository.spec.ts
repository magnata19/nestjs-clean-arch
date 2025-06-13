import { NotFoundError } from "@/shared/errors/not-found-error";
import { Entity } from "../../entities/entity";
import { InMemoryRepository } from "../in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
}

class StubEntity extends Entity<StubEntityProps> { }

class StubInMemoryRepository extends InMemoryRepository<StubEntity> { }

describe("InMemoryRepository Unit Tests", () => {
  let sut: StubInMemoryRepository;

  beforeEach(() => {
    sut = new StubInMemoryRepository();
  })

  it("should insert a new entity", async () => {
    const entity = new StubEntity({ name: "Davidson", price: 100 });
    await sut.insert(entity);
    expect(sut.items[0]).toBe(entity);
    expect(sut.items).toHaveLength(1);
    expect(sut.items[0].toJSON()).toStrictEqual(sut.items[0].toJSON());
  })

  it("should throw an error when trying to find a user with a invalid id", async () => {
    await expect(sut.findById('fakeIdHAHAHA')).rejects.toThrow(new NotFoundError('Entity not found'));
  })

  it("should find an entity by id", async () => {
    const entity = new StubEntity({ name: "Davidson", price: 100 });
    await sut.insert(entity);
    const foundEntity = await sut.findById(entity.id);
    expect(foundEntity).toBe(entity);
    expect(entity.toJSON()).toStrictEqual(foundEntity.toJSON());
  })

  it("should find all entitites", async () => {
    const entity = new StubEntity({ name: "Davidson", price: 100 });
    await sut.insert(entity);
    const foundEntities = await sut.findAll();
    expect([entity]).toStrictEqual(foundEntities); // o [] em entity faz com que o jest entenda que é um array
  })

  it("should throw an error when trying to update a entity with a invalid id", async () => {
    const entity = new StubEntity({ name: "Davidson", price: 100 });
    await expect(sut.update(entity)).rejects.toThrow(new NotFoundError('Entity not found')); // retornara erro pois entity ainda nao foi inserida
  })

  it("should update an entity", async () => {
    const entity = new StubEntity({ name: "Davidson", price: 100 });
    await sut.insert(entity);
    const updatedEntity = new StubEntity({ name: "Davidson Updated", price: 200 }, entity.id);
    await sut.update(updatedEntity);
    expect(updatedEntity.toJSON()).toStrictEqual(sut.items[0].toJSON());
  })

  it("should throw an error when trying to delete a entity with a invalid id", async () => {
    await expect(sut.delete('fakeIdMWAHAHA')).rejects.toThrow(new NotFoundError('Entity not found'));
  })

  it('should delete an entity', async () => {
    const entity = new StubEntity({ name: "Davidson", price: 100 });
    await sut.insert(entity);
    await sut.delete(entity.id);
    expect(sut.items).toHaveLength(0);
  })
})
