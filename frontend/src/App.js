import logo from './logo.svg';
import './App.css';
import { Container, Box } from '@mui/material';
import Header from './components/Header/Header';
import Homepage from './components/Homepage';

function App() {
  return (
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>
      <Box
        sx={{
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <Homepage/>

      </Box>
    </Container>
  );
}

export default App;
