import './App.css';
import { Container, Box, useTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import ProtectedRoute from './ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// Lazy load components
const Homepage = lazy(() => import('./components/Homepage/Homepage'));
const CreateNote = lazy(() => import('./components/CreateNote/CreateNote'));
const ViewNote = lazy(() => import('./components/ViewNote/ViewNote'));
const LoginForm = lazy(() => import('./components/LoginForm/LoginForm'));
const RegisterForm = lazy(() => import('./components/Registration/Registration'));
const NotFound = lazy(() => import('./components/NotFound/NotFound'));

function App() {
  const theme = useTheme();

  return (
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Header />
            <Box
              sx={{
                minHeight: '100vh',
                backgroundColor: theme.palette.background.default,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  py: 3,
                  px: { xs: 2, sm: 3 },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/login" element={<LoginForm />} />
                      <Route path="/register" element={<RegisterForm />} />
                      <Route path="/" element={<ProtectedRoute element={<Homepage />} />} />
                      <Route path="/create" element={<ProtectedRoute element={<CreateNote />} />} />
                      <Route path="/view/:noteId" element={<ProtectedRoute element={<ViewNote />} />} />
                      <Route path="/view" element={<ProtectedRoute element={<ViewNote />} />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </Container>
              </Box>
            </Box>
          </Router>
        </ThemeProvider>
      </I18nextProvider>
    </ErrorBoundary>
  );
}

export default App;
