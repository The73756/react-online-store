import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';

import './App.scss';
const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
