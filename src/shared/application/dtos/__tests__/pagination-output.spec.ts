import { SearchResult } from "@/shared/domain/repositories/searchable-repository-contract"
import { PaginationOutputMapper } from "../pagination-output"

describe('PaginationOutputMapper unit test', () => {
  it('should convert a SearchResult to a Output', () => {
    const result = new SearchResult({
      items: ['fake'] as any,
      total: 1,
      currentPage: 1,
      perPage: 1,
      sort: '',
      sortDir: '',
      filter: 'fake',
    })

    const sut = PaginationOutputMapper.toOutput(result.items, result);
    expect(sut).toStrictEqual({
      items: ['fake'],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
    })
  })
})
