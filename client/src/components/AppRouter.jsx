import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Context } from '..';
import { adminRoutes, authRoutes, publicRoutes } from '../routes';
import { ADMIN_ROLE, SHOP_ROUTE } from '../utils/consts';

const AppRouter = observer(() => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {user.isAuth && user.userRole === ADMIN_ROLE
        ? adminRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))
        : authRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))}

      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.component />} />
      ))}
      <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
    </Routes>
  );
});

export default AppRouter;
