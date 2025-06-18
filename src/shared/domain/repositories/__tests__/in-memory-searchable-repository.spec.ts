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
    it('should not to sort items', async () => {
      const items = [
        new StubEntity({ name: 'c', price: 10 }),
        new StubEntity({ name: 'b', price: 20 }),
        new StubEntity({ name: 'a', price: 30 }),
      ];

      let itemsNotSorted = await sut['applySort'](items, null, null);
      expect(itemsNotSorted).toStrictEqual(items);

      itemsNotSorted = await sut['applySort'](items, 'price', 'asc');
      expect(itemsNotSorted).toStrictEqual(items);
    })

    it('should sort items by field and direction', async () => {
      const items = [
        new StubEntity({ name: 'c', price: 10 }),
        new StubEntity({ name: 'a', price: 30 }),
        new StubEntity({ name: 'b', price: 20 }),
      ];

      let itemsSorted = await sut['applySort'](items, 'name', 'asc');
      expect(itemsSorted).toStrictEqual([items[1], items[2], items[0]]);

      itemsSorted = await sut['applySort'](items, 'name', 'desc');
      expect(itemsSorted).toStrictEqual([items[0], items[2], items[1]]);
    })
  })

  describe('applyPaginate method', () => {
    it('should paginate items', async () => {
      const items = [
        new StubEntity({ name: 'a', price: 30 }),
        new StubEntity({ name: 'b', price: 20 }),
        new StubEntity({ name: 'c', price: 10 }),
        new StubEntity({ name: 'd', price: 20 }),
        new StubEntity({ name: 'e', price: 20 }),
        new StubEntity({ name: 'f', price: 20 }),
        new StubEntity({ name: 'g', price: 20 }),
        new StubEntity({ name: 'h', price: 20 }),
      ];

      let itemsPaginated = await sut['applyPaginate'](items, 1, 3)
      expect(itemsPaginated).toStrictEqual([items[0], items[1], items[2]]);

      itemsPaginated = await sut['applyPaginate'](items, 2, 3)
      expect(itemsPaginated).toStrictEqual([items[3], items[4], items[5]]);

      itemsPaginated = await sut['applyPaginate'](items, 3, 3)
      expect(itemsPaginated).toStrictEqual([items[6], items[7]]);

      itemsPaginated = await sut['applyPaginate'](items, 4, 3)
      expect(itemsPaginated).toStrictEqual([]);
    })
  })

  describe('search method', () => {

  })
})
