import { RoleNewForm } from './RoleNewForm';
import { KTCard } from '../../../../../_metronic/helpers';
import { initialRoleRequest } from '../core/_models';

const RoleNew = () => {
  return (
    <KTCard>
      <RoleNewForm role={initialRoleRequest} />
    </KTCard>
  );
};

export { RoleNew };
