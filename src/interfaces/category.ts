import { TNewsCategory } from "./news";

export interface ICategory {
  id: string;
  name: string;
  news: TNewsCategory[];
}
