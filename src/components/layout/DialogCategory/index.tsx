import { Button, Modal, TextField } from '@mui/material';
import { Form } from './styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { categoryService } from '../../../services/category';

interface IDialogCategory {
  open: boolean;
  onClose: () => void;
}

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Digite um nome para a categoria")
    .min(5, "A categoria deve ter no mínimo 5 letras")
});

export default function DialogCategory({ open, onClose }: IDialogCategory) {

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema,
    onSubmit: ({ name }) => {
      categoryService.createCategory(name);
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
          id="name"
          name="name"
          required
          value={formik.values.name}
          onChange={formik.handleChange}
          label="Nome da Categoria"
          variant="outlined"
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          fullWidth
        />
        <Button type="submit" variant="contained">Criar Categoria</Button>
      </Form>
    </Modal>
  );
}
