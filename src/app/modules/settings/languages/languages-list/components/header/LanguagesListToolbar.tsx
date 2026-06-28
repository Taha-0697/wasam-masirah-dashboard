import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { usePermission } from '../../../core/PermissionProvider';

const LanguagesListToolbar = () => {
  const { canAdd } = usePermission();

  return (
    <div className='d-flex justify-content-end text-dark'>
      {/* begin::Add language */}
      {canAdd && (
        <Link to='new' className='btn btn-sm btn-primary'>
          <FormattedMessage id='ACTIONS.ADD' /> <FormattedMessage id='ACTIONS.NEW' />
        </Link>
      )}
      {/* end::Add language */}
    </div>
  );
};

export { LanguagesListToolbar };
