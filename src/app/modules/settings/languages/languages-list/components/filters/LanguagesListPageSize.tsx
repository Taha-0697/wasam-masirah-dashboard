import { FormattedNumber } from 'react-intl';
import { PAGE_SIZES } from '../../../../../../../_metronic/helpers';
import { useQueryRequest } from '../../../core/QueryRequestProvider';

const LanguagesListPageSize = () => {
  const {
    state: { pageSize },
    updateState,
  } = useQueryRequest();

  const updateSize = (size: number) => {
    if (!size) {
      return;
    }

    updateState({ pageSize: +size });
  };

  return (
    <select
      name='pageSize'
      className='form-select form-select-sm'
      value={pageSize}
      onChange={(event) => updateSize(Number(event.target.value))}
    >
      {PAGE_SIZES.map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          Show <FormattedNumber value={pageSize} /> Records
        </option>
      ))}
    </select>
  );
};

export { LanguagesListPageSize };
