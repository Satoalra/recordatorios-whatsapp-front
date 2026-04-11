export interface PaginationOptions {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  currentPage: number;
  total: number;
  totalPages: number;
}
