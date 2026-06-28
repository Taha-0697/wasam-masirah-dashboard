
import { KTCard, KTCardBody } from '../../../../../_metronic/helpers';
import { usePermission } from '../core/PermissionProvider';
import { useListView } from '../core/ListViewProvider';
import { PageDelete } from '../page-delete/PageDelete';
import { PageListHeader } from './components/header/PageListHeader';
import { PageListFilter } from './components/filters/PageListFilter';
import { PageTable } from './components/table/PageTable';

const PageList = () => {
    const { canDelete } = usePermission();
    const { selectedItemId } = useListView();

    return (
        <>
            <KTCard>
                <PageListHeader />
                <KTCardBody>
                    <PageListFilter />
                    <PageTable />
                </KTCardBody>
            </KTCard>

            {canDelete && selectedItemId !== undefined && <PageDelete />}
        </>
    );
};

export { PageList };
