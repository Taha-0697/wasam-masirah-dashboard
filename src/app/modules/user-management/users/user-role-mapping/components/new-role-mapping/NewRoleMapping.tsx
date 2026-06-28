import { FC } from 'react';
import { NewRoleMappingForm } from './NewRoleMappingForm';
import { KTCard } from '../../../../../../../_metronic/helpers';
import { Role } from '../../../../roles/core/_models';
import { initialUserRoleMappingRequest } from '../../../core/_models';

type Props = {
  roles: Role[];
};

const NewRoleMapping: FC<Props> = ({ roles }) => {
  const rolesToMap = roles.filter((role) => !role.isMapped);

  return (
    <KTCard>
      <NewRoleMappingForm userRole={initialUserRoleMappingRequest} roles={rolesToMap} />
    </KTCard>
  );
};

export { NewRoleMapping };
