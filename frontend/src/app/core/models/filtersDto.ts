export interface FiltersDto {
  page: number;
  limit: number;
  type?: number;
  property?: string;
  query?: string;
}
