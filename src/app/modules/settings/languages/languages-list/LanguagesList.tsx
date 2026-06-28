import { LanguagesListHeader } from './components/header/LanguagesListHeader';
import { LanguagesListFilter } from './components/filters/LanguagesListFilter';
import { LanguagesTable } from './components/table/LanguagesTable';
import { LanguageDelete } from '../language-delete/LanguageDelete';
import { KTCard, KTCardBody } from '../../../../../_metronic/helpers';
import { usePermission } from '../core/PermissionProvider';
import { useListView } from '../core/ListViewProvider';

const LanguagesList = () => {
  const { canDelete } = usePermission();
  const { selectedItemId } = useListView();

  return (
    <>
      <KTCard>
        <LanguagesListHeader />
        <KTCardBody>
          <LanguagesListFilter />
          <LanguagesTable />
        </KTCardBody>
      </KTCard>

      {canDelete && selectedItemId !== undefined && <LanguageDelete />}
    </>
  );
};

export { LanguagesList };
