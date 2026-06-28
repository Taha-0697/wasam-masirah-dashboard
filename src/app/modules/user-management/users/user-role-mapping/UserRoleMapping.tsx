import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { NewRoleMapping } from './components/new-role-mapping/NewRoleMapping';
import { MappedRolesList } from './components/mapped-roles-list/MappedRolesList';
import { QUERIES, isNotEmpty } from '../../../../../_metronic/helpers';
import { getUserRoles } from '../core/_requests';

const UserRoleMapping = () => {
  const { id } = useParams();
  const userId = Number(id);

  const enabledQuery: boolean = isNotEmpty(userId);

  let {
    isLoading,
    data: roles,
    error,
  } = useQuery(
    [QUERIES.USERS, userId, QUERIES.ROLES],
    () => {
      return getUserRoles(userId);
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      refetchOnWindowFocus: false,
      onError: (err) => {
        console.error(err);
      },
    }
  );

  if (!roles) return null;

  roles = roles.filter((role)=> role.lastSelectedEntity === role.businessEntityId)

  return (
    <div className='row'>
      <div className='col-lg-4'>
        <NewRoleMapping roles={roles} />
      </div>
      <div className='col-lg-8'>
        <MappedRolesList roles={roles} />
      </div>
    </div>
  );
};

export { UserRoleMapping };
