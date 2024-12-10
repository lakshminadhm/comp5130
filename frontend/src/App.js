import './App.css';
import { Container, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import CreateNote from './components/CreateNote/CreateNote';
import ViewNote from './components/ViewNote/ViewNote';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/Registration/Registration';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Container maxWidth="lg" style={{ marginTop: '40px' }}>

        <Box
          sx={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            height: '750px', // Fixed height for the box
            overflowY: 'auto' // Makes the content scrollable when it exceeds the height
          }}
        >

          {/* Header Component */}
          <Header />

          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute element={<Homepage />} />} />
            <Route path="/create" element={<ProtectedRoute element={<CreateNote />} />} />
            <Route path="/view/:noteId" element={<ProtectedRoute element={<ViewNote />} />} />
            <Route path="/view" element={<ProtectedRoute element={<ViewNote />} />} />

            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>

        </Box>
      </Container>
    </Router>
  );
}

export default App;
