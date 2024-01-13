export interface PagedResponse {
  success: boolean;
  paging: {
    limit: number;
    next: string | null;
    offset: number;
    pages: number;
    previous: string | null;
    total: number;
  };
}
