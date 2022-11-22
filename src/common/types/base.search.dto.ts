export type BaseSearchResults<T> = {
  TotalCount: number;
  RetrievedCount: number;
  Result: T[];
};
