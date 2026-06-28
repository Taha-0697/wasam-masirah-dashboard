import { FormattedMessage } from 'react-intl';
import { LanguagesListToolbar } from './LanguagesListToolbar';

const LanguagesListHeader = () => {
  return (
    <div className='card-header'>
      {/* begin::Card title */}
      <div className='card-title'>
        <h3>
          <FormattedMessage id='PAGES.LANGUAGE' />
        </h3>
      </div>
      {/* end::Card title */}
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <LanguagesListToolbar />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  );
};

export { LanguagesListHeader };
