import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';

type Props = {
  isActive: boolean;
};

const PageIsActiveCell: FC<Props> = ({ isActive }) => {
  const statusText = <FormattedMessage id={`GENERAL.${isActive ? 'YES' : 'NO'}`} />;

  return (
    <div
      className={clsx('badge badge-lg', {
        'badge-light-success text-success': isActive,
        'badge-light-danger text-danger': !isActive,
      })}
    >
      {statusText}
    </div>
  );
};

export { PageIsActiveCell };
