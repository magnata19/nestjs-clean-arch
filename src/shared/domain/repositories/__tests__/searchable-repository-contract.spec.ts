import { SearchParams } from "../searchable-repository-contract"

describe("SeachableRepositoryContract unit test", () => {
  describe("SeachParam tests", () => {
    it("page prop", () => {
      const sut = new SearchParams();
      expect(sut.page).toBe(1);

      const params = [
        { page: null as any, expected: 1 },
        { page: undefined as any, expected: 1 },
        { page: 'nu', expected: 1 },
        { page: '', expected: 1 },
        { page: -1, expected: 1 },
        { page: true, expected: 1 },
        { page: false, expected: 1 },
        { page: {}, expected: 1 },
        { page: 1, expected: 1 },
        { page: 2, expected: 2 },
      ]

      params.forEach((i) => {
        expect(new SearchParams({ page: i.page }).page).toBe(i.expected);
      })
    })

    it('perPage prop', () => {

      const sut = new SearchParams();
      expect(sut.perPage).toBe(15);

      const params = [
        { perPage: null as any, expected: 15 },
        { perPage: undefined as any, expected: 15 },
        { perPage: 'nu', expected: 15 },
        { perPage: '', expected: 15 },
        { perPage: -1, expected: 15 },
        { perPage: true, expected: 15 },
        { perPage: false, expected: 15 },
        { perPage: {}, expected: 15 },
        { perPage: 1, expected: 1 },
        { perPage: 2, expected: 2 },
      ]

      params.forEach((i) => {
        expect(new SearchParams({ perPage: i.perPage }).perPage).toBe(i.expected);
      })
    })

    it('sort prop', () => {

      const sut = new SearchParams();
      expect(sut.sort).toBeNull();

      const params = [
        { sort: null as any, expected: null },
        { sort: undefined as any, expected: null },
        { sort: 'nu', expected: 'nu' },
        { sort: '', expected: null },
        { sort: -1, expected: '-1' },
        { sort: true, expected: 'true' },
        { sort: false, expected: 'false' },
        { sort: {}, expected: '[object Object]' }, // This is how JS converts objects to strings
        { sort: 1, expected: '1' },
        { sort: 2, expected: '2' },
      ]

      params.forEach((i) => {
        expect(new SearchParams({ sort: i.sort }).sort).toBe(i.expected);
      })
    })

    it('sortDir prop', () => {

      let sut: string | null;

      const sort = [
        { sort: null, expected: null },
        { sort: undefined, expected: null },
        { sort: '', expected: null },
      ]

      sort.forEach((i) => {
        expect(sut = new SearchParams({ sort: i.sort }).sortDir).toBe(i.expected);
      })

      const params = [
        { sortDir: null as any, expected: 'desc' },
        { sortDir: undefined as any, expected: 'desc' },
        { sortDir: 'nu', expected: 'desc' },
        { sortDir: '', expected: 'desc' },
        { sortDir: -1, expected: 'desc' },
        { sortDir: 'asc', expected: 'asc' },
        { sortDir: 'desc', expected: 'desc' },
        { sortDir: 'ASC', expected: 'asc' },
        { sortDir: 'DESC', expected: 'desc' },
      ]

      params.forEach((i) => {
        expect(new SearchParams({ sort: 'algo', sortDir: i.sortDir }).sortDir).toBe(i.expected);
      })
    })

    it('filter prop', () => {

      const sut = new SearchParams();
      expect(sut.filter).toBeNull();

      const params = [
        { filter: null as any, expected: null },
        { filter: undefined as any, expected: null },
        { filter: 'nu', expected: 'nu' },
        { filter: '', expected: null },
        { filter: -1, expected: '-1' },
        { filter: true, expected: 'true' },
        { filter: false, expected: 'false' },
        { filter: {}, expected: '[object Object]' }, // This is how JS converts objects to strings
        { filter: 1, expected: '1' },
        { filter: 2, expected: '2' },
      ]

      params.forEach((i) => {
        expect(new SearchParams({ filter: i.filter }).filter).toBe(i.expected);
      })
    })
  })
})
