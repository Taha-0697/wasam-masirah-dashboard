import { RolesListSearchComponent } from './RolesListSearchComponent';
import { RolesListPageSize } from './RolesListPageSize';

const RolesListFilter = () => {
  return (
    <div className='row mb-3'>
      {/* begin::Page size */}
      <div className='col-md-2 mb-2'>
        <RolesListPageSize />
      </div>
      {/* begin::Page size */}

      {/* begin::Search */}
      <div className='col-xxl-4 col-lg-6 mb-2'>
        <RolesListSearchComponent />
      </div>
      {/* end::Search */}
    </div>
  );
};

export { RolesListFilter };
