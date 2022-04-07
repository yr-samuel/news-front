import { Button, Checkbox, FormGroup, Modal, TextField } from '@mui/material';
import { Form } from './styles';
import { useFormik, } from 'formik';
import * as yup from 'yup';
import { usePromise } from '../../../../hooks/promise';
import { ICategory } from '../../../../interfaces/category';
import { categoryService } from '../../../../services/category';
import { INews } from '../../../../interfaces/news';
import { newsService } from '../../../../services/news';
import { useHistory } from 'react-router-dom';

interface IDialogCategory {
  open: boolean;
  onClose: () => void;
  news?: INews;
}

const validationSchema = yup.object({
  title: yup
    .string()
    .required("Digite um título para sua notícia")
    .min(5, "Deve haver no mínimo 5 letras "),
  description: yup
    .string()
    .required("Digite uma descrição para sua notícia")
    .min(100, "Sua descrição deve ter no mínimo 100 caracteres"),
});

export default function EditNewsDialog({ open, onClose, news }: IDialogCategory) {
  const [categories] = usePromise<ICategory[]>(() => categoryService.getAllCategories(), [])
  const verifyCategoryIsChecked = (name: string) => {
    if (news?.categories?.find(category => category.name === name)) return true;
  };

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      title: news!.title,
      description: news!.description,
      categories: news && [...news.categories.map(category => category.id)]
    },
    validationSchema,
    onSubmit: (values) => {
      newsService.updateNews(news?.id!, values);
      formik.resetForm();
      onClose();
      history.push('/')

    }
  })

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Form onSubmit={formik.handleSubmit}>
        <TextField
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          label="Título da Notícia"
          variant="outlined"
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          fullWidth
        />

        <TextField
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          label="Descrição"
          variant="outlined"
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          fullWidth
          multiline
          rows={3}
        />
        <div role="group" aria-labelledby="checkbox-group">
          <FormGroup style={{
            display: 'flex', flexDirection: 'row',
            gap: 10
          }}>
            {categories && categories.map((category, index) => (
              <div key={index}>
                <Checkbox
                  name="categories"
                  key={index}
                  onChange={formik.handleChange}
                  defaultChecked={verifyCategoryIsChecked(category.name)}
                  value={category.id}
                />
                {category.name}
              </div>
            ))}
          </FormGroup>
        </div>
        <Button type="submit" variant="contained">Atualizar Noticia</Button>
      </Form>
    </Modal>
  );
}
