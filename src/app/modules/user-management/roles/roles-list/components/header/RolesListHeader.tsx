import { FormattedMessage } from 'react-intl';
import { RolesListToolbar } from './RolesListToolbar';

const RolesListHeader = () => {
  return (
    <div className='card-header'>
      {/* begin::Card title */}
      <div className='card-title'>
        <h3>
          <FormattedMessage id='PAGES.ROLE' />
        </h3>
      </div>
      {/* end::Card title */}
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <RolesListToolbar />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

export { RolesListHeader };
