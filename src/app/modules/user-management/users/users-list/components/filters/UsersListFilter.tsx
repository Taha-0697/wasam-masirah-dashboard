import { UsersListSearchComponent } from './UsersListSearchComponent';
import { UsersListPageSize } from './UsersListPageSize';

const UsersListFilter = () => {
  return (
    <div className='row mb-3'>
      {/* begin::Page size */}
      <div className='col-md-2 mb-2'>
        <UsersListPageSize />
      </div>
      {/* begin::Page size */}

      {/* begin::Search */}
      <div className='col-xxl-4 col-lg-6 mb-2'>
        <UsersListSearchComponent />
      </div>
      {/* end::Search */}
    </div>
  );
};

export { UsersListFilter };
