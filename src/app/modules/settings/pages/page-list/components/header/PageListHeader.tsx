import { FormattedMessage } from 'react-intl';
import { PageListToolbar } from './PageListToolbar';

const PageListHeader = () => {
  return (
    <div className='card-header'>
      {/* begin::Card title */}
      <div className='card-title'>
        <h3>
          {/* Page */}
          <FormattedMessage id='PAGES.PAGE' />
        </h3>
      </div>
      {/* end::Card title */}
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <PageListToolbar />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

export { PageListHeader };
