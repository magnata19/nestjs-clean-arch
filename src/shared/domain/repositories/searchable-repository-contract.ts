import { Entity } from "../entities/entity";
import { RepositoryInterface } from "./repository-contracts";

export interface SearchableRepositoryInterface<E extends Entity,
  SearchInput, // tipo de entrada para a pesquisa ex: nome, email, etc
  SearchOutput // tipo de saida da pesquisa ex: numero de resultados, lista de entidades, etc
> extends RepositoryInterface<E> {
  search(input: SearchInput): Promise<SearchOutput>;
}
