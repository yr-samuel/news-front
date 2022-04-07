import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem, TextField } from '@mui/material';
import DialogCategory from '../DialogCategory';
import DialogNews from '../DialogNews';
import { useHistory, useLocation } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useSearchContext } from '../../../context/SearchContext';

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isCategoryForm, setCategoryForm] = React.useState<boolean>(false);
  const [isNewsForm, setIsNewsForm] = React.useState<boolean>(false);
  const [text, setText] = React.useState('');
  const [forSearch] = useDebounce(text, 1000);
  const { setSearch } = useSearchContext()
  const open = Boolean(anchorEl);

  const { push } = useHistory();
  const { pathname } = useLocation()

  const isCorrectlyPath = React.useMemo(() => pathname.match(/\/$/), [pathname]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  }

  const handleCategoryForm = () => {
    setCategoryForm(true);
    setAnchorEl(null);
  };

  const handleCloseCategoryForm = () => {
    setCategoryForm(false);
  }

  const handleNewsForm = () => {
    setIsNewsForm(true);
    setAnchorEl(null);
  };

  const handleCloseNewsForm = () => {
    setIsNewsForm(false);
  }

  React.useEffect(() => setSearch(forSearch), [forSearch, setSearch]);

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={handleClick}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleNewsForm}>Adicionar noticia</MenuItem>
            <MenuItem onClick={handleCategoryForm}>Adicionar categoria</MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => push('/')} style={{ cursor: 'pointer' }}>
            News
          </Typography>
          {isCorrectlyPath && <TextField onChange={(event) => setText(event.target.value)} value={text} placeholder="Procure por uma noticia" />}
        </Toolbar>
      </AppBar>
      <DialogCategory open={isCategoryForm} onClose={handleCloseCategoryForm} />
      <DialogNews open={isNewsForm} onClose={handleCloseNewsForm} />
    </Box>
  );
}
