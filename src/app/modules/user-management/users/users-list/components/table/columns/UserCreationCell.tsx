import { FC } from 'react';
import { formatDateTime } from '../../../../../../../../_metronic/helpers/DatetimeHelpers';

type Props = {
  createdBy: string;
  createdAt: string;
};

const UserCreationCell: FC<Props> = ({ createdBy, createdAt }) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <span>{createdBy}</span>
      <span>{formatDateTime(createdAt)}</span>
    </div>
  </div>
);

export { UserCreationCell };
