import { RolesListHeader } from './components/header/RolesListHeader';
import { RolesListFilter } from './components/filters/RolesListFilter';
import { RolesTable } from './components/table/RolesTable';
import { RoleDelete } from '../role-delete/RoleDelete';
import { KTCard, KTCardBody } from '../../../../../_metronic/helpers';
import { usePermission } from '../core/PermissionProvider';
import { useListView } from '../core/ListViewProvider';

const RolesList = () => {
  const { canDelete } = usePermission();
  const { selectedItemId } = useListView();

  return (
    <>
      <KTCard>
        <RolesListHeader />
        <KTCardBody>
          <RolesListFilter />
          <RolesTable />
        </KTCardBody>
      </KTCard>

      {canDelete && selectedItemId !== undefined && <RoleDelete />}
    </>
  );
};

export { RolesList };
