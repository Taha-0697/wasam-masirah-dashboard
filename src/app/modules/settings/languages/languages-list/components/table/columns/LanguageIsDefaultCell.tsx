import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';

type Props = {
  isDefault: boolean;
};

const LanguageIsDefaultCell: FC<Props> = ({ isDefault }) => {
  const statusText = <FormattedMessage id={`GENERAL.${isDefault ? 'YES' : 'NO'}`} />;

  return (
    <div
      className={clsx('badge badge-lg', {
        'badge-light-success text-success': isDefault,
        'badge-light-danger text-danger': !isDefault,
      })}
    >
      {statusText}
    </div>
  );
};

export { LanguageIsDefaultCell };
