import { Info } from './Info';

export interface PagedResults<T> {
  info: Info;
  results: T[];
}
