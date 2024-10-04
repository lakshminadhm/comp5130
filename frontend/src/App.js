import logo from './logo.svg';
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

        <Box
          sx={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            height: '600px', // Fixed height for the box
            overflowY: 'auto' // Makes the content scrollable when it exceeds the height
          }}
        >

          {/* Header Component */}
          <Header />

          <Routes>
            {/* Homepage Route */}
            <Route path="/" element={<Homepage />} />

            {/* Create Note Route */}
            <Route path="/create" element={<CreateNote />} />

            {/* View Note Route - The noteId is captured as a parameter */}
            <Route path="/view/:noteId" element={<ViewNote />} />

            {/* Manual Note ID Entry Route - Could use the same ViewNote component */}
            <Route path="/view" element={<ViewNote />} />

            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>

        </Box>
      </Container>
    </Router>
  );
}

export default App;
