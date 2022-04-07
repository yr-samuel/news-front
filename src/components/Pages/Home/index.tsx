import React from 'react';
import { useSearchContext } from '../../../context/SearchContext';
import { usePromise } from '../../../hooks/promise';
import { INews } from '../../../interfaces/news';
import { newsService } from '../../../services/news';
import NewsCard from '../../shared/NewsCard';

export default function Home() {
  const { search } = useSearchContext()
  const [news] = usePromise<INews[]>(() => newsService.getAllNews(search), [search]);

  return (
    <>
      {news &&
        news.map(({ title, description, categories, id }, i) => (
          <NewsCard
            {
            ... { title, description, categories, id }
            }
            key={i} />
        )
        )
      }
    </>
  );
}
