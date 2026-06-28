/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { usePermission } from '../../../../core/PermissionProvider';
import { useListView } from '../../../../core/ListViewProvider';

type Props = {
  id: number;
};

const PageActionsCell: FC<Props> = ({ id }) => {
  const { canEdit, canDelete } = usePermission();
  const { setSelectedItemId } = useListView();

  if (!canEdit && !canDelete) return null;

  const openDeleteModal = () => {
    setSelectedItemId(id);
  };

  return (
    <div>
      {canEdit && (
        <Link
          to={`${id}/edit`}
          className='btn btn-sm btn-icon btn-primary w-30px h-30px me-1'
          data-tooltip-id='my-tooltip'
          data-tooltip-place='top'
          data-tooltip-content='Edit'
        >
          <i className='fa-solid fa-pencil'></i>
        </Link>
      )}

      {canDelete && (
        <button
          className='btn btn-sm btn-icon btn-danger w-30px h-30px'
          data-tooltip-id='my-tooltip'
          data-tooltip-place='top'
          data-tooltip-content='Delete'
          onClick={openDeleteModal}
        >
          <i className='fa-solid fa-trash'></i>
        </button>
      )}
    </div>
  );
};

export { PageActionsCell };
