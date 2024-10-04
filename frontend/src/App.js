import './App.css';
import { Container, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import CreateNote from './components/CreateNote/CreateNote';
import ViewNote from './components/ViewNote/ViewNote';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <Router>
      <Container maxWidth="lg" style={{ marginTop: '50px' }}>
        <Header />
        <Box
          sx={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            height: '600px',
            overflowY: 'auto'
          }}
        >
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/create" element={<CreateNote />} />
            <Route path="/view/:noteId" element={<ViewNote />} />
            <Route path="/view" element={<ViewNote />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
