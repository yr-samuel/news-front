import { styled, Typography } from '@mui/material'

export const Paragraph = styled(Typography)({
  display: "-webkit-box",
  overflow: "hidden",
  whiteSpace: 'nowrap',
  textOverflow: "ellipsis",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  maxHeight: '200px'
})
