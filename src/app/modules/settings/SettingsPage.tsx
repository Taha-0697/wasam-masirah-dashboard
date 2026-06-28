import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useAuth } from '../auth';
import { PageTitle } from '../../../_metronic/layout/core';
import { SystemPage, hasPageAccessGranted } from '../../../_metronic/helpers';
import LanguagesPage from './languages/LanguagesPage';
import PagesPage from './pages/PagesPage';

const SettingsPage = () => {
  const { currentUser } = useAuth();
  const intl = useIntl();
  const hasLanguagePageAccess = hasPageAccessGranted(currentUser?.roles, SystemPage.Language);
  const hasPageAccess = hasPageAccessGranted(currentUser?.roles, SystemPage.Page);

  return (
    <>
      <PageTitle>{intl.formatMessage({ id: 'MODULES.SETTINGS' })}</PageTitle>

      <Routes>
        <Route element={<Outlet />}>

          {/* Pages */}
          {hasPageAccess && <Route path='pages/*' element={<PagesPage />} />}

          {/* Languages */}
          {hasLanguagePageAccess && <Route path='languages/*' element={<LanguagesPage />} />}

          {/* Page Not Found */}
          <Route path='*' element={<Navigate to='/error/404' />} />
        </Route>
      </Routes>
    </>
  );
};

export default SettingsPage;
