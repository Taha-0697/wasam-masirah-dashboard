import { Route, Routes, Outlet } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useAuth } from '../../auth';
import { PermissionContext } from './core/PermissionProvider';
import { QueryRequestProvider } from './core/QueryRequestProvider';
import { QueryResponseProvider } from './core/QueryResponseProvider';
import { BreadCrumbs, PageLink } from '../../../../_metronic/layout/core';
import { SystemPage, SystemAction, getPagePermissions } from '../../../../_metronic/helpers';
import { ListViewProvider } from './core/ListViewProvider';
import { PageNew } from './page-new/PageNew';
import { PageEdit } from './page-edit/PageEdit';
import { PageList } from './page-list/PageList';


const PagesPage = () => {
  const { currentUser } = useAuth();
  const intl = useIntl();

  const grantedPermissions = getPagePermissions(currentUser?.roles, SystemPage.Page);

  const canView = grantedPermissions.includes(SystemAction.VIEW);
  const canAdd = grantedPermissions.includes(SystemAction.ADD);
  const canEdit = grantedPermissions.includes(SystemAction.EDIT);
  const canDelete = grantedPermissions.includes(SystemAction.DELETE);

  const commonBreadcrumbLink: PageLink[] = [
    {
      title: 'Page',
      path: '/settings/pages',
      isSeparator: true,
      isActive: true,
    },
  ];

  const listBreadcrumb: PageLink[] = [
    ...commonBreadcrumbLink,
    {
      title: intl.formatMessage({ id: 'GENERAL.LIST' }),
      path: '',
      isSeparator: false,
      isActive: false,
    },
  ];

  const newBreadcrumb: PageLink[] = [
    ...commonBreadcrumbLink,
    {
      title: intl.formatMessage({ id: 'ACTIONS.NEW' }),
      path: '',
      isSeparator: false,
      isActive: false,
    },
  ];

  const editBreadcrumb: PageLink[] = [
    ...commonBreadcrumbLink,
    {
      title: intl.formatMessage({ id: 'ACTIONS.EDIT' }),
      path: '',
      isSeparator: false,
      isActive: false,
    },
  ];

  return (
    <PermissionContext.Provider value={{ canView, canAdd, canEdit, canDelete }}>
      <QueryRequestProvider>
        <QueryResponseProvider>
          <Routes>
            <Route element={<Outlet />}>
              <Route
                index
                element={
                  <>
                    <BreadCrumbs breadcrumbs={listBreadcrumb} />
                    <ListViewProvider>
                      <PageList />
                    </ListViewProvider>
                  </>
                }
              />

              {canAdd && (
                <Route
                  path='new'
                  element={
                    <>
                      <BreadCrumbs breadcrumbs={newBreadcrumb} />
                      <PageNew />
                    </>
                  }
                />
              )}

              {canEdit && (
                <Route
                  path=':id/edit'
                  element={
                    <>
                      <BreadCrumbs breadcrumbs={editBreadcrumb} />
                      <PageEdit />
                    </>
                  }
                />
              )}
            </Route>
          </Routes>
        </QueryResponseProvider>
      </QueryRequestProvider>
    </PermissionContext.Provider>
  );
};

export default PagesPage;
