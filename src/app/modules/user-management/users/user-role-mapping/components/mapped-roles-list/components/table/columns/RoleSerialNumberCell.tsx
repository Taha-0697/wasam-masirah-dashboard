import { FC } from 'react';
import { FormattedNumber } from 'react-intl';

type Props = {
  rowIndex: number;
};

const RoleSerialNumberCell: FC<Props> = ({ rowIndex }) => {
  var pageNumber = 1;
  var pageSize = 100;

  const serialNumber = rowIndex + 1 + pageSize * (pageNumber - 1);

  return <FormattedNumber value={serialNumber} />;
};

export { RoleSerialNumberCell };
