import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { InfinitySpin } from 'react-loader-spinner';
import { RoleEditForm } from './RoleEditForm';
import { NewPermissionForm } from './NewPermissionForm';
import { AddedPermissionsList } from './AddedPermissionsList';
import { KTCard, QUERIES, isNotEmpty } from '../../../../../_metronic/helpers';
import { getRoleById } from '../core/_requests';

const RoleEdit = () => {
  const { id } = useParams();
  const roleId = Number(id);

  const enabledQuery: boolean = isNotEmpty(roleId);

  const {
    isLoading,
    data: role,
    error,
  } = useQuery(
    [QUERIES.ROLES, roleId],
    () => {
      return getRoleById(roleId);
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

  return (
    <>
      <KTCard>
        {isLoading && (
          <div className='d-flex justify-content-center'>
            <InfinitySpin width='200' color='#0a3761' />
          </div>
        )}

        {role && <RoleEditForm role={role} />}
      </KTCard>

      {role && (
        <>
          <div className='bg-white rounded my-5'>
            <h1 className='text-center p-3 mb-0'>Permissions</h1>
          </div>

          <div className='row mb-5'>
            <div className='col-md-12'>
              <KTCard>
                <NewPermissionForm role={role} />
              </KTCard>
            </div>
          </div>

          <div className='row'>
            <AddedPermissionsList role={role} />
          </div>
        </>
      )}
    </>
  );
};

export { RoleEdit };
