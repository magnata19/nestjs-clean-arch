import { SortDirection } from "@/shared/domain/repositories/searchable-repository-contract";
import { ListUsersUsecase } from "@/users/application/usecases/listusers.usecase";

export class ListUsersDto implements ListUsersUsecase.Input {
  page?: number;
  perPage?: number;
  sort?: string;
  sortDir?: SortDirection;
  filter?: string;
}
