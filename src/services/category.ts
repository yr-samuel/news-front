import { apiService } from "./api";

class CategoryService {
  createCategory(name: string) {
    apiService.post('/categories', { name })
  }

  getAllCategories() {
    return apiService.get('/categories?search=');
  }

  getById(id: string) {
    return apiService.get(`/categories/${id}`);
  }
}

export const categoryService = new CategoryService();
