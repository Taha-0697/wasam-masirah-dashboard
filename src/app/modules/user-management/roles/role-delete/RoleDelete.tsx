import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQueryResponse } from '../core/QueryResponseProvider';
import { useListView } from '../core/ListViewProvider';
import { deleteRole } from '../core/_requests';
import { DeleteModal } from '../../../../../_metronic/partials/modals/DeleteModal';
import { QUERIES, showToast } from '../../../../../_metronic/helpers';

const RoleDelete = () => {
  const queryClient = useQueryClient();
  const { query } = useQueryResponse();
  const { selectedItemId, setSelectedItemId } = useListView();

  const closeDeleteModal = () => {
    setSelectedItemId(undefined);
  };

  const { isLoading, mutateAsync } = useMutation(() => deleteRole(Number(selectedItemId)), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries({ queryKey: [QUERIES.ROLES, query] });

      closeDeleteModal();
      showToast('success', 'Role Deleted Successfully');
    },
    onError: () => {
      showToast('error', 'Some Error Occured');
    },
  });

  return (
    <DeleteModal
      isLoading={isLoading}
      onClose={closeDeleteModal}
      onDelete={async () => await mutateAsync()}
    />
  );
};

export { RoleDelete };
