import { useContext, createContext } from 'react';
import { PermissionContextProps, initialPermission } from '../../../../../_metronic/helpers';

export const PermissionContext = createContext<PermissionContextProps>(initialPermission);

const usePermission = () => useContext(PermissionContext);

export { usePermission };
