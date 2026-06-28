import { FC, Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import { MasterLayout } from '../../_metronic/layout/MasterLayout';
import { WithChildren } from '../../_metronic/helpers';
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils';
import DashboardPage from '../modules/pages/dashboard/DashboardPage';

const PrivateRoutes = () => {
  const SettingsPage = lazy(() => import('../modules/settings/SettingsPage'));
  const UserManagementPage = lazy(() => import('../modules/user-management/UserManagementPage'));
  
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='/*' element={<Navigate to='/dashboard' />} />

        {/* Pages */}
        <Route path='dashboard' element={<DashboardPage />} />
       
        {/* Lazy Modules */}
        <Route
          path='settings/*'
          element={
            <SuspensedView>
              <SettingsPage />
            </SuspensedView>
          }
        />
        <Route
          path='user-management/*'
          element={
            <SuspensedView>
              <UserManagementPage />
            </SuspensedView>
          }
        />


        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary');
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
