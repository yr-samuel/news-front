import { useParams } from 'react-router-dom';
import { usePromise } from '../../../hooks/promise';
import { ICategory } from '../../../interfaces/category';
import { categoryService } from '../../../services/category';
import NewsCard from '../../shared/NewsCard';
import { Title } from './styles';

export default function Category() {
  const { id }: { id: string } = useParams();
  const [category] = usePromise<ICategory>(() => categoryService.getById(id), [id])

  return (
    <>
      <Title>{category?.name}</Title>
      {category?.news.map((news, i) => <NewsCard description={news.description} id={news.id} title={news.title} key={i} />)}
    </>
  );
}
