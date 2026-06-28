/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import { ThemeModeType, useThemeMode } from './ThemeModeProvider';

type Props = {
  toggleBtnClass?: string;
  toggleBtnIconClass?: string;
  menuPlacement?: string;
  menuTrigger?: string;
};

const ThemeModeSwitcher = ({
  toggleBtnClass = '',
  toggleBtnIconClass = 'fs-1',
  menuPlacement = 'bottom-end',
  menuTrigger = "{default: 'click', lg: 'hover'}",
}: Props) => {

  const { mode, menuMode, updateMode, updateMenuMode } = useThemeMode();
  // const calculatedMode = mode === 'system' ? systemMode : mode
  const calculatedMode = mode 
  const switchMode = (_mode: ThemeModeType) => {
    updateMenuMode(_mode);
    updateMode(_mode);
  };

  return (
    <>
      {/* begin::Menu toggle */}
      <a
        href='#'
        className={clsx('btn btn-icon ', toggleBtnClass)}
        data-kt-menu-trigger={menuTrigger}
        data-kt-menu-attach='parent'
        data-kt-menu-placement={menuPlacement}
      >
        {calculatedMode === 'dark' && <i className='fa-solid fa-moon'></i>}

        {calculatedMode === 'light' && <i className='fa-solid fa-sun'></i>}

        {calculatedMode === 'system' && <i className='fa-solid fa-desktop'></i>}
      </a>
      {/* begin::Menu toggle */}

      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        <div className='menu-item px-3 my-0'>
          <a
            className={clsx('menu-link px-3 py-2', { active: menuMode === 'light' })}
            onClick={() => switchMode('light')}
          >
            <span className='menu-icon' data-kt-element='icon'>
              <i className='fa-solid fa-sun'></i>
            </span>
            <span className='menu-title'>
              <FormattedMessage id='GENERAL.LIGHT' />
            </span>
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3 my-0'>
          <a
            className={clsx('menu-link px-3 py-2', { active: menuMode === 'dark' })}
            onClick={() => switchMode('dark')}
          >
            <span className='menu-icon' data-kt-element='icon'>
              <i className='fa-solid fa-moon'></i>
            </span>
            <span className='menu-title'>
              <FormattedMessage id='GENERAL.DARK' />
            </span>
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3 my-0'>
          <a
            className={clsx('menu-link px-3 py-2', { active: menuMode === 'system' })}
            onClick={() => switchMode('system')}
          >
            <span className='menu-icon' data-kt-element='icon'>
              <i className='fa-solid fa-desktop'></i>
            </span>
            <span className='menu-title'>
              <FormattedMessage id='GENERAL.CUSTOM' />
            </span>
          </a>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  );
};

export { ThemeModeSwitcher };
