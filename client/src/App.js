import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Context } from '.';
import './App.scss';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import { check } from './http/userApi';

const App = observer(() => {
  const { user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true); // TODO: прикрутить какой то лоадер

  useEffect(() => {
    check()
      .then(() => {
        user.setUser(true);
        user.setIsAuth(true);
      })
      .catch(() => {
        user.setUser({});
        user.setIsAuth(false); // TODO: Авторизация неудачна (например, токен просрочен)
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
