import { FC, useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { FormattedMessage } from 'react-intl';
import {
  KTCard,
  KTCardBody,
  QUERIES,
  showToast,
  SYSTEM_PERMISSIONS,
  formatDateTime,
  SystemPage,
  SystemAction,
} from '../../../../../_metronic/helpers';
import { DeleteModal } from '../../../../../_metronic/partials/modals/DeleteModal';
import { PermissionAction, PermissionRequest, Role } from '../core/_models';
import { deleteRolePageActions } from '../core/_requests';

type Props = {
  role: Role;
};

const AddedPermissionsList: FC<Props> = ({ role }) => {
  const [permissionToDelete, setPermissionToDelete] = useState<PermissionRequest | null>(null);

  const queryClient = useQueryClient();

  const handleToggleDeleteModal = (permission: PermissionRequest | null) => {
    setPermissionToDelete(permission);
  };

  const { isLoading, mutateAsync } = useMutation(
    () => deleteRolePageActions(role.id, permissionToDelete?.page, permissionToDelete?.actions),
    {
      // 💡 response of the mutation is passed to onSuccess
      onSuccess: () => {
        // ✅ update detail view directly
        queryClient.invalidateQueries({ queryKey: [QUERIES.ROLES, role.id] });

        handleToggleDeleteModal(null);
        showToast('success', 'Role Deleted Successfully');
      },
      onError: () => {
        showToast('error', 'Some Error Occured');
      },
    }
  );

  return (
    <>
      {role.permissions.map((permission) => {
        const addedActions = permission.actions as PermissionAction[];
        const systemPermission = SYSTEM_PERMISSIONS.find((p) => p.page === SystemPage[permission.page as keyof typeof SystemPage]);
        // console.log(systemPermission);
        return (
          <div key={permission.page} className='col-6 mb-4'>
            <KTCard>
              <div className='card-header'>
                <div className='card-title'>
                  <h3 className='mb-0'>
                    <FormattedMessage id={systemPermission?.localizedKey ? systemPermission?.localizedKey : systemPermission?.title} />
                  </h3>
                </div>
                <div className='card-toolbar'>
                  <button
                    type='submit'
                    className='btn btn-sm btn-danger'
                    disabled={isLoading}
                    onClick={() => {
                      const permissionObj = {
                        page: SystemPage[permission.page as keyof typeof SystemPage],
                        actions: addedActions.map((a: any) => SystemAction[a.action as keyof typeof SystemAction])
                      };
                      handleToggleDeleteModal(permissionObj);
                    }}
                  >
                    <FormattedMessage id='ACTIONS.DELETE' /> <FormattedMessage id='GENERAL.ALL' />
                    {isLoading && (
                      <span
                        className='spinner-border spinner-border-sm ms-1'
                        role='status'
                        aria-hidden='true'
                      ></span>
                    )}
                  </button>
                </div>
              </div>
              <KTCardBody className='p-0'>
                <div className='table-responsive'>
                  <table className='table table-row-bordered table-row-gray-300 align-middle text-dark fs-6 gy-3 m-0'>
                    <thead className='bg-light'>
                      <tr>
                        <th>
                          <FormattedMessage id='FIELDS.ACTION' />
                        </th>
                        <th>
                          <FormattedMessage id='FIELDS.CREATION' />
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {addedActions.map((action: any) => {
                        const systemAction = systemPermission?.actions.find(
                          (a) => {
                            const permissions = SystemAction[action.action as keyof typeof SystemAction];
                            return a.action === permissions
                          }
                        );

                        return (
                          <tr key={action.action}>
                            <td>
                              <FormattedMessage id={systemAction?.localizedKey ? systemAction?.localizedKey : systemAction?.title} />
                            </td>
                            <td>
                              <div className='d-flex align-items-center'>
                                <div className='d-flex flex-column'>
                                  <span>{action.createdBy}</span>
                                  <span>{formatDateTime(action.createdAt)}</span>
                                </div>
                              </div>
                            </td>
                            <td className='text-end'>
                              <button
                                className='btn btn-sm btn-icon btn-light-danger'
                                disabled={isLoading}
                                onClick={() => {
                                  const permissionObj = {
                                    page: SystemPage[permission.page as keyof typeof SystemPage],
                                    actions: [SystemAction[action.action as keyof typeof SystemAction]],
                                  };
                                  // console.log(permissionObj);
                                  handleToggleDeleteModal(permissionObj);
                                }}
                              >
                                <i className='fa-solid fa-trash'></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </KTCardBody>
            </KTCard>
          </div>
        );
      })}

      {/*begin::Action Delete Dialog*/}
      {permissionToDelete && (
        <DeleteModal
          isLoading={isLoading}
          onClose={() => handleToggleDeleteModal(null)}
          onDelete={async () => await mutateAsync()}
        />
      )}
      {/*end::Action Delete Dialog*/}
    </>
  );
};

export { AddedPermissionsList };
