import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLanguageMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    handleLanguageMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            component="div"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onClick={() => navigate('/')}
          >
            {t('app_title')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title={t('home')} placement='auto'>
            <IconButton
              onClick={() => navigate('/')}
              color="primary"
              aria-label={t('home')}
              sx={{
                display: { xs: 'flex', sm: 'none' },
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'white',
                },
              }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>

          <Button
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            color="primary"
            sx={{
              display: { xs: 'none', sm: 'flex' },
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'white',
              },
            }}
          >
            {t('home')}
          </Button>

          {localStorage.getItem('auth_token') && (
            <Tooltip title={t('logout')} placement='auto'>
              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                aria-label={t('logout')}
                sx={{
                  '&:hover': {
                    backgroundColor: 'error.dark',
                  },
                }}
              >
                {!isMobile && t('logout')}
              </Button>
            </Tooltip>
          )}

          <Tooltip title={t('change_language')} placement='auto'>
            <IconButton
              color="primary"
              onClick={handleLanguageMenuOpen}
              aria-label={t('change_language')}
              sx={{
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'white',
                },
              }}
            >
              <LanguageIcon />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleLanguageMenuClose}
          >
            <MenuItem onClick={() => handleLanguageChange('en')}>
              {t('language_english')}
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange('fr')}>
              {t('language_french')}
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange('telugu')}>
              {t('language_telugu')}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
