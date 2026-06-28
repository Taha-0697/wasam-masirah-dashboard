import { Route, Routes, Outlet } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useAuth } from '../../auth';
import { UsersList } from './users-list/UsersList';
import { UserRoleMapping } from './user-role-mapping/UserRoleMapping';
import { PermissionContext } from './core/PermissionProvider';
import { QueryRequestProvider } from './core/QueryRequestProvider';
import { QueryResponseProvider } from './core/QueryResponseProvider';
import { ListViewProvider } from './core/ListViewProvider';
import { BreadCrumbs, PageLink } from '../../../../_metronic/layout/core';
import { SystemPage, SystemAction, getPagePermissions } from '../../../../_metronic/helpers';
import { UserNew } from './user-new/UserNew';
import { UserEdit } from './user-edit/UserEdit';

const UsersPage = () => {
  const { currentUser } = useAuth();
  const intl = useIntl();

  const grantedPermissions = getPagePermissions(currentUser?.roles, SystemPage.User);

  const canView = grantedPermissions.includes(SystemAction.VIEW);
  const canAdd = grantedPermissions.includes(SystemAction.ADD);
  const canEdit = grantedPermissions.includes(SystemAction.EDIT);
  const canDelete = grantedPermissions.includes(SystemAction.DELETE);
  const canAssignRole = grantedPermissions.includes(SystemAction.ASSIGN_USER_ROLES);

  const commonBreadcrumbLink: PageLink[] = [
    {
      title: intl.formatMessage({ id: 'PAGES.USER' }),
      path: '/user-management/users',
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

  const mappingBreadcrumb: PageLink[] = [
    ...commonBreadcrumbLink,
    {
      title: 'Mapping',
      path: '',
      isSeparator: false,
      isActive: false,
    },
  ];

  return (
    <PermissionContext.Provider value={{ canView, canAdd, canEdit, canDelete, canAssignRole }}>
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
                      <UsersList />
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
                      <UserNew />
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
                      <UserEdit />
                    </>
                  }
                />
              )}
              {canAssignRole && (
                <Route
                  path=':id/roles/mapping'
                  element={
                    <>
                      <BreadCrumbs breadcrumbs={mappingBreadcrumb} />
                      <UserRoleMapping />
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

export default UsersPage;
