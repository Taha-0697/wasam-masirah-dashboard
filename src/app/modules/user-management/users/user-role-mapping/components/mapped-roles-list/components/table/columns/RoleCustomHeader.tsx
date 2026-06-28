import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

type Props = {
  className?: string;
  title?: string;
  localizedKey?: string;
  tableProps: any;
};

const RoleCustomHeader: FC<Props> = ({ className, title, localizedKey, tableProps }) => {
  return (
    <th colSpan={tableProps.header.colSpan} className={className}>
      {title || <FormattedMessage id={localizedKey} />}
    </th>
  );
};

export { RoleCustomHeader };
