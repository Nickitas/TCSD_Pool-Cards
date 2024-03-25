import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

import { Layout } from './components/Layout';
import { Loader } from './components/ui/Loader';

const Auth = lazy(() => import('./components/pages/Auth'));
const UsersList = lazy(() => import('./components/pages/UsersList'));
const CreateCard = lazy(() => import('./components/pages/CreateCard'));
const Statistics = lazy(() => import('./components/pages/Statistics'));

const App = () => {
  const { isAuth } = useAuthStore();

  const app = (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {isAuth ? (
            <>
              <Route index element={<UsersList />} />
              <Route path="create_card" element={<CreateCard />} />
              <Route path="statistics" element={<Statistics />} />
            </>
          ) : (
            <>
              <Route path="auth" element={<Auth />} />
              <Route path="/" element={<h1>Вы не прошли авторизацию</h1>} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );

  return app;
};

export default App;