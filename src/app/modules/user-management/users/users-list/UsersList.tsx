import { UsersListHeader } from './components/header/UsersListHeader';
import { UsersListFilter } from './components/filters/UsersListFilter';
import { UsersTable } from './components/table/UsersTable';
import { KTCard, KTCardBody } from '../../../../../_metronic/helpers';
import { usePermission } from '../core/PermissionProvider';
import { useListView } from '../core/ListViewProvider';
import { UserDelete } from '../user-delete/UserDelete';

const UsersList = () => {
  const { canDelete } = usePermission();
  const { selectedItemId } = useListView();

  return (
    <>
      <KTCard>
        <UsersListHeader />
        <KTCardBody>
          <UsersListFilter />
          <UsersTable />
        </KTCardBody>
      </KTCard>
      {canDelete && selectedItemId !== undefined && < UserDelete />}

    </>
  );
};

export { UsersList };
