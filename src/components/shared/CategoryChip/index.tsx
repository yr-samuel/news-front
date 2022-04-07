import { Chip } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';

interface IProps {
  name: string;
  id: string;
}

export default function CategoryChip({ name, id }: IProps) {
  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    history.push(`/category/${id}`)
  }

  return (
    <Chip label={name} onClick={handleClick} variant="outlined" />
  );
}
