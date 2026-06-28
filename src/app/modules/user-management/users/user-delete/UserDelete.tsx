import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQueryResponse } from '../core/QueryResponseProvider';
import { useListView } from '../core/ListViewProvider';
import { DeleteModal } from '../../../../../_metronic/partials/modals/DeleteModal';
import { QUERIES, showToast } from '../../../../../_metronic/helpers';
import { deleteUser } from '../core/_requests';

const UserDelete = () => {
  const queryClient = useQueryClient();
  const { query } = useQueryResponse();
  const { selectedItemId, setSelectedItemId } = useListView();

  const closeDeleteModal = () => {
    setSelectedItemId(undefined);
  };

  const { isLoading, mutateAsync } = useMutation(() => deleteUser(Number(selectedItemId)), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries({ queryKey: [QUERIES.USERS, query] });

      closeDeleteModal();
      showToast('success', 'User Deleted Successfully');
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

export { UserDelete };
