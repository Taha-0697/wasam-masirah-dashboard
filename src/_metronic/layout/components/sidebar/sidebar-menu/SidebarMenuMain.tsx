/* eslint-disable react/jsx-no-target-blank */
import { Fragment } from 'react';
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub';
import { SidebarMenuItem } from './SidebarMenuItem';
import { useAuth } from '../../../../../app/modules/auth';
import { settingsRoutes } from '../../../../../app/modules/settings/Routes';
import { userManagementRoutes } from '../../../../../app/modules/user-management/Routes';
import { hasPageAccessGranted } from '../../../../helpers';

const SidebarMenuMain = () => {
  const { currentUser } = useAuth();

  const userManagementGrantedRoutes = userManagementRoutes.filter((route) =>
    hasPageAccessGranted(currentUser?.roles, route.id)
  );

  const settingsGrantedRoutes = settingsRoutes.filter((route) =>
    hasPageAccessGranted(currentUser?.roles, route.id)
  );


  return (
    <>
      <SidebarMenuItem to={`/dashboard`} localizedKey='PAGES.DASHBOARD' icon='fa-solid fa-house' />

      {settingsGrantedRoutes.length > 0 && (
        <SidebarMenuItemWithSub
          to='/settings'
          localizedKey='MODULES.SETTINGS'
          icon='fa-solid fa-gears'
        >
          {settingsGrantedRoutes.map((route) => {
            return (
              <Fragment key={route.id}>
                <SidebarMenuItem
                  to={`/settings/${route.to}`}
                  localizedKey={route.localizedKey ? route.localizedKey : route.title}
                  hasBullet={route.hasBullet}
                />
              </Fragment>
            );
          })}
        </SidebarMenuItemWithSub>
      )}

  
      {userManagementGrantedRoutes.length > 0 && (
        <SidebarMenuItemWithSub
          to='/user-management'
          localizedKey='MODULES.USERMANAGEMENT'
          icon='fa-solid fa-user-gear'
        >
          {userManagementGrantedRoutes.map((route) => {
            return (
              <Fragment key={route.id}>
                <SidebarMenuItem
                  to={`/user-management/${route.to}`}
                  localizedKey={route.localizedKey}
                  hasBullet={route.hasBullet}
                />
              </Fragment>
            );
          })}
        </SidebarMenuItemWithSub>
      )
      }
    </>
  );
};

export { SidebarMenuMain };
