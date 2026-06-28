/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { QUERIES, showToast } from '../../../../../../../../../../_metronic/helpers';
import { DeleteModal } from '../../../../../../../../../../_metronic/partials/modals/DeleteModal';
import { usePermission } from '../../../../../../core/PermissionProvider';
import { deleteUserRole } from '../../../../../../core/_requests';

type Props = {
  roleId: number;
};

const RoleActionsCell: FC<Props> = ({ roleId }) => {
  const [isDisplayDeleteModal, setIsDisplayDeleteModal] = useState(false);
  const { canEdit, canDelete } = usePermission();
  const { id } = useParams();
  const userId = Number(id);

  // if (!canEdit && !canDelete) return null;
  const queryClient = useQueryClient();

  const handleToggleDeleteModal = (isDisplayModal: boolean) => {
    setIsDisplayDeleteModal(isDisplayModal);
  };

  const { isLoading, mutateAsync } = useMutation(() => deleteUserRole(userId, roleId), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries({ queryKey: [QUERIES.USERS, userId, QUERIES.ROLES] });

      handleToggleDeleteModal(false);
      showToast('success', 'Role Deleted Successfully');
    },
    onError: () => {
      showToast('error', 'Some Error Occured');
    },
  });

  return (
    <>
      {/* begin::delete action */}
      <button
        className='btn btn-sm btn-icon btn-danger w-30px h-30px'
        data-tooltip-id='my-tooltip'
        data-tooltip-place='top'
        data-tooltip-content='Delete'
        onClick={() => handleToggleDeleteModal(true)}
      >
        <i className='fa-solid fa-trash'></i>
      </button>

      {/* end::delete action */}

      {/*begin::User Role Delete Dialog*/}
      {isDisplayDeleteModal && (
        <DeleteModal
          isLoading={isLoading}
          onClose={() => handleToggleDeleteModal(false)}
          onDelete={async () => await mutateAsync()}
        />
      )}
      {/*end::User Role Delete Dialog*/}
    </>
  );
};

export { RoleActionsCell };
