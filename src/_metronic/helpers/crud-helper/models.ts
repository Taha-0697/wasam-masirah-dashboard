import { Dispatch, SetStateAction } from 'react';

export type ID = undefined | null | number | string;

export type PaginationState = {
  pageNumber: number;
  pageSize: number;
  sortOrder: 'asc' | 'desc';
  sortField: string;
  totalCount: number;
};

export type PaginationCount = {
  totalCount: number;
  pageCount: number;
};

export type SortState = {
  sortOrder: 'asc' | 'desc';
};

export type FilterState = {
  filter?: unknown;
};

export type SearchState = {
  searchText?: string;
};

export type Response<T> = {
  entities?: T;
  pagination: PaginationCount;
};

export type QueryState = PaginationState & SortState & FilterState & SearchState;

export type QueryRequestContextProps = {
  state: QueryState;
  updateState: (updates: Partial<QueryState>) => void;
};

export const PAGE_SIZES = [5, 10, 20];

export const initialQueryState: QueryState = {
  pageNumber: 1,
  pageSize: 10,
  sortOrder: 'desc',
  sortField: 'creation',
  totalCount: 0,
};

export const initialQueryRequest: QueryRequestContextProps = {
  state: initialQueryState,
  updateState: () => { },
};

export type QueryResponseContextProps<T> = {
  response?: Response<Array<T>> | undefined;
  refetch: () => void;
  isLoading: boolean;
  query: string;
};

export const initialQueryResponse = {
  refetch: () => { },
  isLoading: false,
  query: '',
};

export type ListViewContextProps = {
  selected: Array<ID>;
  onSelect: (selectedId: ID) => void;
  onSelectAll: () => void;
  clearSelected: () => void;
  // NULL => (CREATION MODE) | MODAL IS OPENED
  // NUMBER => (EDIT MODE) | MODAL IS OPENED
  // UNDEFINED => MODAL IS CLOSED
  selectedItemId?: ID;
  setSelectedItemId: Dispatch<SetStateAction<ID>>;
  isAllSelected: boolean;
  disabled: boolean;
};

export const initialListView: ListViewContextProps = {
  selected: [],
  onSelect: () => { },
  onSelectAll: () => { },
  clearSelected: () => { },
  setSelectedItemId: () => { },
  isAllSelected: false,
  disabled: false,
};

export type PermissionContextProps = {
  canView?: boolean;
  canAdd?: boolean;
  canAssignRole?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  canApprove?: boolean;
};

export const initialPermission: PermissionContextProps = {
  canView: false,
  canAdd: false,
  canEdit: false,
  canDelete: false,
  canAssignRole: false,
  canApprove: false,
};
