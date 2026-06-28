import { PageListPageSize } from "./PageListPageSize";
import { PageListSearchComponent } from "./PageListSearchComponent";

const PageListFilter = () => {
  return (
    <div className='row mb-3'>
      {/* begin::Page size */}
      <div className='col-md-2 mb-2'>
        <PageListPageSize />
      </div>
      {/* begin::Page size */}

      {/* begin::Search */}
      <div className='col-xxl-4 col-lg-6 mb-2'>
        <PageListSearchComponent />
      </div>
      {/* end::Search */}
    </div>
  );
};

export { PageListFilter };
