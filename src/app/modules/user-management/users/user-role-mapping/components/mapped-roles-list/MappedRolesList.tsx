import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { MappedRolesTable } from './components/table/MappedRolesTable';
import { KTCard, KTCardBody } from '../../../../../../../_metronic/helpers';
import { Role } from '../../../../roles/core/_models';

type Props = {
  roles: Role[];
};

const MappedRolesList: FC<Props> = ({ roles }) => {
  const mappedRoles = roles.filter((role) => role.isMapped);

  return (
    <KTCard>
      <div className='card-header'>
        <div className='card-title'>
          <h3>
            <FormattedMessage id='PAGES.ROLE' />
          </h3>
        </div>
      </div>
      <KTCardBody>
        <MappedRolesTable roles={mappedRoles} />
      </KTCardBody>
    </KTCard>
  );
};

export { MappedRolesList };
