import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useAuth } from '../auth';
import { PageTitle } from '../../../_metronic/layout/core';
import { SystemPage, hasPageAccessGranted } from '../../../_metronic/helpers';
import UsersPage from './users/UsersPage';
import RolesPage from './roles/RolesPage';

const UserManagementPage = () => {
  const { currentUser } = useAuth();
  const intl = useIntl();

  const hasUsersPageAccess = hasPageAccessGranted(currentUser?.roles, SystemPage.User);
  const hasRolesPageAccess = hasPageAccessGranted(currentUser?.roles, SystemPage.Role);

  return (
    <>
      <PageTitle>{intl.formatMessage({ id: 'MODULES.USERMANAGEMENT' })}</PageTitle>

      <Routes>
        <Route element={<Outlet />}>
          {/* Users */}
          {hasUsersPageAccess && <Route path='users/*' element={<UsersPage />} />}

          {/* Roles */}
          {hasRolesPageAccess && <Route path='roles/*' element={<RolesPage />} />}

          {/* Page Not Found */}
          <Route path='*' element={<Navigate to='/error/404' />} />
        </Route>
      </Routes>
    </>
  );
};

export default UserManagementPage;
