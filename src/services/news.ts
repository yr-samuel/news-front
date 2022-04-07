import { INews } from "../interfaces/news";
import { apiService } from "./api";

class NewsService {
  createNews({ title, description, categories }: { title: string; description: string; categories: string[] }) {
    return apiService.post('/news', { title, description, categories })
  }

  getAllNews(search = '') {
    return apiService.get<INews[]>(`/news?search=${search}`);
  }

  getNewsById(id: string) {
    return apiService.get<INews>(`/news/${id}`)
  }

  updateNews(id: string, news: any) {
    apiService.put(`/news/${id}`, { ...news });
  }

}

export const newsService = new NewsService();
