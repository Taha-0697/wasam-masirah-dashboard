/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDebounce } from '../../../../../../../_metronic/helpers';
import { useQueryRequest } from '../../../core/QueryRequestProvider';

const RolesListSearchComponent = () => {
  const intl = useIntl();

  const { state, updateState } = useQueryRequest();
  const [searchTerm, setSearchTerm] = useState<string>('');
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 150);
  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
        updateState({ ...state, searchText: debouncedSearchTerm });
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
    // More details about useDebounce: https://usehooks.com/useDebounce/
  );

  return (
    <div className='d-flex align-items-center'>
      <i className='fa-solid fa-magnifying-glass position-absolute fs-6 ms-4'></i>
      <input
        type='text'
        name='search'
        className='form-control form-control-sm ps-12'
        placeholder={intl.formatMessage({ id: 'ACTIONS.SEARCH' })}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export { RolesListSearchComponent };
