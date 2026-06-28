import { LanguagesListSearchComponent } from './LanguagesListSearchComponent';
import { LanguagesListPageSize } from './LanguagesListPageSize';

const LanguagesListFilter = () => {
  return (
    <div className='row mb-3'>
      {/* begin::Page size */}
      <div className='col-md-2 mb-2'>
        <LanguagesListPageSize />
      </div>
      {/* begin::Page size */}

      {/* begin::Search */}
      <div className='col-xxl-4 col-lg-6 mb-2'>
        <LanguagesListSearchComponent />
      </div>
      {/* end::Search */}
    </div>
  );
};

export { LanguagesListFilter };
