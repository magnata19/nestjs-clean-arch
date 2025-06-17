import { Entity } from "../../entities/entity";
import { InMemorySearchableRepository } from "../in-memory-searchable-repository";

export type StubEntityProps = {
  name: string;
  price: number;
}

export class StubEntity extends Entity<StubEntityProps> { }

export class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  searchableFields: string[] = ['name'];
  protected async applyFilter(items: StubEntity[], filter: string | null): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter(item => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
}

describe('InMemorySearchableRepository unit test', () => {
  let sut: StubInMemorySearchableRepository

  beforeEach(() => {
    sut = new StubInMemorySearchableRepository();
  })

  describe('applyFilter method', () => {
    it('should return filter items when filter is null', async () => {
      const items = [
        new StubEntity({ name: 'Item 1', price: 10 }),
        new StubEntity({ name: 'Item 2', price: 20 }),
      ];
      const spyFilterMethod = jest.spyOn(items, 'filter');
      const itemsFiltered = await sut['applyFilter'](items, null);
      expect(itemsFiltered).toStrictEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    })

    it('should filter using filter param', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 10 }),
        new StubEntity({ name: 'TEST', price: 20 }),
        new StubEntity({ name: 'fake', price: 30 }),
      ];
      const spyFilterMethod = jest.spyOn(items, 'filter');
      let itemsFiltered = await sut['applyFilter'](items, 'TEST');
      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);

      itemsFiltered = await sut['applyFilter'](items, 'test');
      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);

      itemsFiltered = await sut['applyFilter'](items, 'FAKE');
      expect(itemsFiltered).toStrictEqual([items[2]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(3);

      itemsFiltered = await sut['applyFilter'](items, 'algo');
      expect(itemsFiltered).toHaveLength(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(4);
    })
  })

  describe('applySort method', () => {

  })

  describe('applyPaginate method', () => {

  })

  describe('search method', () => {

  })
})
