import { Button, FormGroup, Modal, TextField } from '@mui/material';
import { Form } from './styles';
import { useFormik, } from 'formik';
import * as yup from 'yup';
import { usePromise } from '../../../hooks/promise';
import { categoryService } from '../../../services/category';
import { newsService } from '../../../services/news';
import { ICategory } from '../../../interfaces/category';
import { useHistory } from 'react-router-dom';

interface IDialogCategory {
  open: boolean;
  onClose: () => void;
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

export default function DialogNews({ open, onClose }: IDialogCategory) {
  const [categories] = usePromise<ICategory[]>(() => categoryService.getAllCategories(), [])
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      categories: []
    },
    validationSchema,
    onSubmit: (values) => {
      newsService.createNews(values).then(({ data }: any) => history.push(`/news/${data.id}`));
      formik.resetForm();
      onClose();
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
          label="Titulo da Noticia"
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
          label="Descrição da notícia"
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
                <input
                  type="checkbox"
                  name="categories"
                  key={index}
                  onChange={formik.handleChange}
                  value={category.id}
                />
                {category.name}
              </div>
            ))}
          </FormGroup>
        </div>
        <Button type="submit" variant="contained">Criar Categoria</Button>
      </Form>
    </Modal>
  );
}
