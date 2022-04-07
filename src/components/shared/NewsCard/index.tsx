import { Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { ICategory } from '../../../interfaces/category';
import CategoryChip from '../CategoryChip';
import { Paragraph } from './styles';

interface IProps {
  title: string;
  description: string;
  id: string;
  categories?: ICategory[];
}

export default function NewsCard({ title, description, categories, id }: IProps) {
  const history = useHistory();

  return (
    <Grid item xs={6} >
      <Card style={{ height: '100%', cursor: 'pointer', }} onClick={() => history.push(`/news/${id}`)}>
        <CardContent style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Paragraph variant="body2" color="textSecondary">
            {description}
          </Paragraph>
          {categories && <span style={{ justifySelf: 'end' }}>Categorias: {' '}
            {categories?.map((category, i) => (
              <CategoryChip id={category.id} name={category.name} key={i} />
            ))}</span>}
        </CardContent>
      </Card>
    </Grid >
  );
}
