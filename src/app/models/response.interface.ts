export interface Response<T> {
  StatusCode: number;
  Data: T;
  Message: string[];
}
