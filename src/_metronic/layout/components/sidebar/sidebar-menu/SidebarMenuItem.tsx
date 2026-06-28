import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import { checkIsActive, WithChildren } from '../../../../helpers';

type Props = {
  to: string;
  title?: string;
  localizedKey?: string;
  icon?: string;
  hasBullet?: boolean;
};

const SidebarMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  localizedKey,
  icon,
  hasBullet = false,
}) => {
  const { pathname } = useLocation();
  const isActive = checkIsActive(pathname, to);
  // console.log(isActive ? `Active ${to}` : `Not Active ${to}`);


  return (
    <div className='menu-item'>
      <Link className={clsx('menu-link without-sub', { active: isActive })} to={to}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}

        {icon && <i className={clsx(icon, `${isActive ? 'text-dark' : 'text-white'} fs-3 me-3`)}></i>}

        <span className='menu-title'>{title || <FormattedMessage id={localizedKey} />}</span>
      </Link>
      {children}
    </div>
  );
};

export { SidebarMenuItem };
