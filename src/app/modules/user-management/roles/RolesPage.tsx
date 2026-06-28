import { Route, Routes, Outlet } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useAuth } from '../../auth';
import { RolesList } from './roles-list/RolesList';
import { RoleNew } from './role-new/RoleNew';
import { RoleEdit } from './role-edit/RoleEdit';
import { PermissionContext } from './core/PermissionProvider';
import { QueryRequestProvider } from './core/QueryRequestProvider';
import { QueryResponseProvider } from './core/QueryResponseProvider';
import { ListViewProvider } from './core/ListViewProvider';
import { BreadCrumbs, PageLink } from '../../../../_metronic/layout/core';
import { SystemPage, SystemAction, getPagePermissions } from '../../../../_metronic/helpers';

const RolesPage = () => {
  const { currentUser } = useAuth();
  const intl = useIntl();

  const grantedPermissions = getPagePermissions(currentUser?.roles, SystemPage.Role);

  const canView = grantedPermissions.includes(SystemAction.VIEW);
  const canAdd = grantedPermissions.includes(SystemAction.ADD);
  const canEdit = grantedPermissions.includes(SystemAction.EDIT);
  const canDelete = grantedPermissions.includes(SystemAction.DELETE);

  const commonBreadcrumbLink: PageLink[] = [
    {
      title: intl.formatMessage({ id: 'PAGES.ROLE' }),
      path: '/user-management/roles',
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
                      <RolesList />
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
                      <RoleNew />
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
                      <RoleEdit />
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

export default RolesPage;
