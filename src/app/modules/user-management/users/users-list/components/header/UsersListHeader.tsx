import { FormattedMessage } from 'react-intl';
import { UsersListToolbar } from './UsersListToolbar';

const UsersListHeader = () => {
  return (
    <div className='card-header'>
      {/* begin::Card title */}
      <div className='card-title'>
        <h3>
          <FormattedMessage id='PAGES.USER' />
        </h3>
      </div>
      {/* end::Card title */}
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <UsersListToolbar />

        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

export { UsersListHeader };
