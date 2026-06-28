import { FC } from 'react';
import { FormattedNumber } from 'react-intl';
import { useQueryRequest } from '../../../../core/QueryRequestProvider';

type Props = {
  rowIndex: number;
};

const PageSerialNumberCell: FC<Props> = ({ rowIndex }) => {
  const {
    state: { pageNumber, pageSize },
  } = useQueryRequest();

  const serialNumber = rowIndex + 1 + pageSize * (pageNumber - 1);

  return <FormattedNumber value={serialNumber} />;
};

export { PageSerialNumberCell };
