import { Entity } from "../entities/entity";
import { RepositoryInterface } from "./repository-contracts";

export type SortDirection = 'asc' | 'desc';

export type SearchProps<Filter = string> = {
  page?: number; // Número da página para paginação
  perPage?: number; // Número de itens por página
  sort?: string | null; // Campo para ordenação
  sortDir?: SortDirection | null; // Direção da ordenação (asc ou desc)
  filter?: Filter | null; // Filtro para pesquisa, pode ser um termo de busca ou outro critério
};

export class SearchParams {
  protected _page?: number;
  protected _perPage = 15;
  protected _sort?: string | null;
  protected _sortDir?: SortDirection | null;
  protected _filter?: string | null;

  constructor(props: SearchProps) {
    this._page = props.page;
    this._perPage = props.perPage;
    this._sort = props.sort;
    this._sortDir = props.sortDir;
    this._filter = props.filter;
  }

  get page() {
    return this._page;
  }

  private set page(value: number) {
    let _page: number = +value;
    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      this._page = 1;
    }
    this._page = _page;
  }

  get perPage() {
    return this._perPage;
  }

  private set perPage(value: number) {
    let _perPage: number = +value;
    if (Number.isNaN(_perPage) || _perPage <= 0 || parseInt(_perPage as any) !== _perPage) {
      _perPage = this._perPage;
    }
    this._perPage = _perPage;
  }

  get sort() {
    return this._sort;
  }

  private set sort(value: string | null) {
    this._sort = value === null || value === '' || value === undefined ? null : `${value}`;
  }

  get sortDir() {
    return this._sortDir;
  }
  private set sortDir(value: SortDirection | null) {
    if (!this.sort) {
      this._sortDir = null;
      return;
    }
    const dir = `${value}`.toLowerCase();
    this._sortDir = dir !== 'asc' && dir !== 'desc' ? 'desc' : dir;
  }

  get filter() {
    return this._filter;
  }

  private set filter(value: string | null) {
    this._filter = value === null || value === '' || value === undefined ? null : `${value}`;
  }
}

export interface SearchableRepositoryInterface<E extends Entity,
  SearchInput, // tipo de entrada para a pesquisa ex: nome, email, etc
  SearchOutput // tipo de saida da pesquisa ex: numero de resultados, lista de entidades, etc
> extends RepositoryInterface<E> {
  search(input: SearchParams): Promise<SearchOutput>;
}
