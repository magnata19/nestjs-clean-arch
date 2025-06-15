import { Entity } from "../entities/entity";
import { InMemoryRepository } from "./in-memory.repository";
import { SearchableRepositoryInterface, SearchParams, SearchResult } from "./searchable-repository-contract";

export abstract class InMemorySearchableRepository<E extends Entity> extends InMemoryRepository<E> implements SearchableRepositoryInterface<E, any, any> {
  async search(input: SearchParams): Promise<SearchResult<E>> {
    throw new Error("Method not implemented.");
  }

  protected abstract applyFilter(items: E[], filter: string | null): Promise<E[]>; // cada repositório pode implementar sua própria lógica de filtro

  protected async applySort(items: E[], sort: string | null, sortDir: string | null): Promise<E[]> {
    return;
  }

  protected async applyPaginate(items: E[], page: SearchParams['page'], perPage: SearchParams['perPage']): Promise<E[]> {
    return;
  }
}
