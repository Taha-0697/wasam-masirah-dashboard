import { FC } from 'react';
import { useLocation } from 'react-router-dom';
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

const SidebarMenuItemWithSub: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  localizedKey,
  icon,
  hasBullet,
}) => {
  const { pathname } = useLocation();
  const isActive = checkIsActive(pathname, to);

  return (
    <div
      className={clsx('menu-item', { 'here show': isActive }, 'menu-accordion')}
      data-kt-menu-trigger='click'
    >
      <span className='menu-link'>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}

        {icon && <i className={clsx(icon, 'text-white fs-3 me-3')}></i>}

        <span className='menu-title'>{title || <FormattedMessage id={localizedKey} />}</span>
        <span className='menu-arrow'></span>
      </span>
      <div className={clsx('menu-sub menu-sub-accordion', { 'menu-active-bg': isActive })}>
        {children}
      </div>
    </div>
  );
};

export { SidebarMenuItemWithSub };
