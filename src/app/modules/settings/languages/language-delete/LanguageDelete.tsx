import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQueryResponse } from '../core/QueryResponseProvider';
import { useListView } from '../core/ListViewProvider';
import { deleteLanguage } from '../core/_requests';
import { DeleteModal } from '../../../../../_metronic/partials/modals/DeleteModal';
import { QUERIES, showToast } from '../../../../../_metronic/helpers';

const LanguageDelete = () => {
  const queryClient = useQueryClient();
  const { query } = useQueryResponse();
  const { selectedItemId, setSelectedItemId } = useListView();

  const closeDeleteModal = () => {
    setSelectedItemId(undefined);
  };

  const { isLoading, mutateAsync } = useMutation(() => deleteLanguage(Number(selectedItemId)), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries({ queryKey: [QUERIES.LANGUAGES, query] });

      closeDeleteModal();
      showToast('success', 'Language Deleted Successfully');
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

export { LanguageDelete };
