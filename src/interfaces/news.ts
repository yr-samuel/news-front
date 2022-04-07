import { ICategory } from "./category";

export interface INews {
  id: string;
  title: string;
  description: string;
  categories: ICategory[];
}

export type TNewsCategory = Omit<INews, 'categories'>;
