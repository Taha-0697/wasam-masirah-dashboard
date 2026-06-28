import clsx from 'clsx';
import { KTIcon, toAbsoluteUrl } from '../../../helpers';
import {
  HeaderNotificationsMenu,
  HeaderUserMenu,
  Search,
  ThemeModeSwitcher,
} from '../../../partials';
import { useLayout } from '../../core';
import { useAuth } from '../../../../app/modules/auth';

const itemClass = 'ms-1 ms-lg-3';
const userAvatarClass = 'symbol-35px symbol-md-40px';
const btnIconClass = 'svg-icon-1';

const Navbar = () => {
  const { config } = useLayout();
  const { currentUser } = useAuth();

  const Avatar = currentUser?.picture && process.env.REACT_APP_PUBLIC_URL + '/Pictures/' + currentUser?.picture

  return (
    <div className='app-navbar flex-shrink-0'>

      <div className={clsx('app-navbar-item', itemClass)}>
        <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-primary btn-custom')} />
      </div>

      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <img className='me-3' alt='Avatar' src={`${toAbsoluteUrl(Avatar ? Avatar : '/media/svg/avatars/blank.svg')}`} />
          <p className='d-inline'>
            <span className='fw-bold'>{currentUser?.firstName} {currentUser?.lastName}</span>
          </p>
        </div>
        <HeaderUserMenu />
      </div>

    </div>
  );
};

export { Navbar };
