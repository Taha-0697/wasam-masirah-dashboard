import { Role, Permission } from '../../app/modules/user-management/roles/core/_models';

//IDS should be same as stored in the Database
export enum SystemPage {
  User = 1,
  Role = 2,
  Page = 3,
  Permission = 4,
  Language = 5,
}

//IDS should be same as stored in the Database
export enum SystemAction {
  VIEW = 1,
  ADD = 2,
  EDIT = 3,
  DELETE = 4,
  ASSIGN_USER_ROLES = 5,
  APPROVE_WORKFLOW = 6,
}

export type SystemPermission = {
  page: SystemPage;
  localizedKey?: string;
  title?: string;
  actions: { action: SystemAction; localizedKey?: string; title?: string }[];
};

export function hasPageAccessGranted (roles: Array<Role> = [], pageToCheck: SystemPage): boolean {
  if (!roles || roles.length === 0) return false;
  let hasPageAccessGranted = false;
  const page: Permission | undefined = roles[0].permissions.find((permission: any) => {
    const permissionPage = SystemPage[permission.page as keyof typeof SystemPage];
    return permissionPage === pageToCheck;
  });

  hasPageAccessGranted = page ? page.actions.length > 0 : false;

  return hasPageAccessGranted;
}

export function getPagePermissions (
  roles: Array<Role> = [],
  pageToCheck: SystemPage
): Array<number> {
  if (!roles || roles.length === 0) return [];

  const allowedActions: Set<number> = new Set();

  roles.forEach((role) => {
    const page: Permission | undefined = role.permissions.find((permission: any) => {
      const permissionPage = SystemPage[permission.page as keyof typeof SystemPage];
      return permissionPage === pageToCheck;
    });

    if (page) {
      page.actions.forEach((action: any) => {
        allowedActions.add(SystemAction[action.action as keyof typeof SystemAction]);
      });
    }
  });
  return Array.from(allowedActions);
}

export const SYSTEM_PERMISSIONS: SystemPermission[] = [
  {
    page: SystemPage.User,
    localizedKey: 'PAGES.USER',
    actions: [
      { action: SystemAction.VIEW, localizedKey: 'ACTIONS.VIEW' },
      { action: SystemAction.ADD, localizedKey: 'ACTIONS.ADD' },
      { action: SystemAction.EDIT, localizedKey: 'ACTIONS.EDIT' },
      { action: SystemAction.DELETE, localizedKey: 'ACTIONS.DELETE' },
      { action: SystemAction.ASSIGN_USER_ROLES, title: 'Assign Role' },
      { action: SystemAction.APPROVE_WORKFLOW, title: 'Approval Flow' },
    ],
  },
  {
    page: SystemPage.Role,
    localizedKey: 'PAGES.ROLE',
    actions: [
      { action: SystemAction.VIEW, localizedKey: 'ACTIONS.VIEW' },
      { action: SystemAction.ADD, localizedKey: 'ACTIONS.ADD' },
      { action: SystemAction.EDIT, localizedKey: 'ACTIONS.EDIT' },
      { action: SystemAction.DELETE, localizedKey: 'ACTIONS.DELETE' },
    ],
  },
  {
    page: SystemPage.Language,
    localizedKey: 'PAGES.LANGUAGE',
    actions: [
      { action: SystemAction.VIEW, localizedKey: 'ACTIONS.VIEW' },
      { action: SystemAction.ADD, localizedKey: 'ACTIONS.ADD' },
      { action: SystemAction.EDIT, localizedKey: 'ACTIONS.EDIT' },
      { action: SystemAction.DELETE, localizedKey: 'ACTIONS.DELETE' },
    ],
  },
  {
    page: SystemPage.Page,
    title: 'Page',
    localizedKey: 'PAGES.PAGE',
    actions: [
      { action: SystemAction.VIEW, localizedKey: 'ACTIONS.VIEW' },
      { action: SystemAction.ADD, localizedKey: 'ACTIONS.ADD' },
      { action: SystemAction.EDIT, localizedKey: 'ACTIONS.EDIT' },
      { action: SystemAction.DELETE, localizedKey: 'ACTIONS.DELETE' },
    ],
  },
  {
    page: SystemPage.Permission,
    title: 'Permission',
    localizedKey: 'PAGES.PERMISSION',
    actions: [
      { action: SystemAction.VIEW, localizedKey: 'ACTIONS.VIEW' },
      { action: SystemAction.ADD, localizedKey: 'ACTIONS.ADD' },
      { action: SystemAction.EDIT, localizedKey: 'ACTIONS.EDIT' },
      { action: SystemAction.DELETE, localizedKey: 'ACTIONS.DELETE' },
    ],
  },
];
