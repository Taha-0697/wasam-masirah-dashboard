/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { MenuComponent } from '../../../../../../../../_metronic/assets/ts/components';
import { usePermission } from '../../../../core/PermissionProvider';
import { useListView } from '../../../../core/ListViewProvider';

type Props = {
  id: number;
};

const UserActionsCell: FC<Props> = ({ id }) => {
  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);
  const { setSelectedItemId } = useListView();
  const { canEdit, canDelete, canAssignRole, canView } = usePermission();
  if (!canEdit && !canDelete && !canAssignRole && !canView) return null;

  const openDeleteModal = () => {
    setSelectedItemId(id);
  };
  return (
    <>
      {/* {canView && (
        <Link
          to={`${id}`}
          className='btn btn-sm btn-icon btn-warning w-30px h-30px me-1'
          data-tooltip-id='my-tooltip'
          data-tooltip-place='top'
          data-tooltip-content='View'
          // onClick={openDeleteModal}
        >
          <i className='fa-solid fa-eye'></i>
        </Link>
      )} */}

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

      {canAssignRole && (
        <Link
          to={`${id}/roles/mapping`}
          className='btn btn-sm btn-icon btn-success w-30px h-30px me-1'
          data-tooltip-id='my-tooltip'
          data-tooltip-place='top'
          data-tooltip-content='Change Role'
        >
          <i className='fa-solid fa-sync'></i>
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

    </>
  );
};

export { UserActionsCell };
