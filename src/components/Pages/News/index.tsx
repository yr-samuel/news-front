import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePromise } from '../../../hooks/promise';
import { INews } from '../../../interfaces/news';
import { newsService } from '../../../services/news';
import CategoryChip from '../../shared/CategoryChip';
import EditNewsDialog from './EditNewsModal';
import { Title, Categories, Paragraph } from './styles';

export default function News() {
  const { id }: { id: string } = useParams();
  const [news] = usePromise<INews>(() => newsService.getNewsById(id), [id]);
  const [isNewsDialogOpen, setIsNewsDialogOpen] = useState(false);

  const handleClickEdit = () => setIsNewsDialogOpen(true);

  return (
    <Box width={"100%"}   >
      <Title>{news?.title}</Title>
      <Categories> {news?.categories.map((category, i) => <CategoryChip {...category} key={i} />)}</Categories>
      <Paragraph>{news?.description}</Paragraph>
      <Button onClick={handleClickEdit}>Editar noticia</Button>
      {isNewsDialogOpen && <EditNewsDialog open={isNewsDialogOpen} onClose={() => setIsNewsDialogOpen(false)} news={news} />}
    </Box>
  );
}
