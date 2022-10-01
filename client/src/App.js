import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';

import './App.scss';
import Navbar from './components/Navbar';
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
