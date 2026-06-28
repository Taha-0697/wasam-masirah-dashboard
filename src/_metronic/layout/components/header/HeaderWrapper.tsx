/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import { KTIcon, toAbsoluteUrl } from '../../../helpers';
import { useLayout } from '../../core';
import { Header } from './Header';
import { Navbar } from './Navbar';

export function HeaderWrapper() {
  const { config } = useLayout();
  if (!config.app?.header?.display) {
    return null;
  }

  return (
    <div id='kt_app_header' className='app-header'>
      <div
        id='kt_app_header_container'
        className='app-container flex-lg-grow-1 d-flex align-items-stretch justify-content-between w-100'
      >
        {config.app.sidebar?.display && (
          <div className='d-flex align-items-center d-lg-none ms-n2 me-2' title='Show sidebar menu'>
            <div className='btn btn-icon w-35px h-35px' id='kt_app_sidebar_mobile_toggle'>
              <KTIcon iconName='abstract-14' className='text-white fs-1' />
            </div>
            <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0 mh-100 mw-100'>
              <Link to='/dashboard' className='d-lg-none h-60px'>
                <img
                  alt='Logo'
                  src={toAbsoluteUrl('/media/logos/default-small.png')}
                  className='h-100 w-100'
                />
              </Link>
            </div>
          </div>
        )}

        {!(config.layoutType === 'dark-sidebar' || config.layoutType === 'light-sidebar') && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15'>
            <Link to='/dashboard'>
              {config.layoutType !== 'dark-header' ? (
                <img
                  alt='Logo'
                  src={toAbsoluteUrl('/media/logos/default-small.png')}
                  className='h-50px h-lg-30px app-sidebar-logo-default'
                />
              ) : (
                <>
                  <img
                    alt='Logo'
                    src={toAbsoluteUrl('/media/logos/default-small.png')}
                    className='h-50px h-lg-30px app-sidebar-logo-default theme-light-show'
                  />
                  <img
                    alt='Logo'
                    src={toAbsoluteUrl('/media/logos/default-small.png')}
                    className='h-50px h-lg-30px app-sidebar-logo-default theme-dark-show'
                  />
                </>
              )}
            </Link>
          </div>
        )}

        <div
          id='kt_app_header_wrapper'
          className='d-flex align-items-stretch justify-content-between flex-lg-grow-1 '
        >
          {config.app.header.default?.content === 'menu' &&
            config.app.header.default.menu?.display && (
              <div
                className='app-header-menu app-header-mobile-drawer align-items-stretch'
                data-kt-drawer='true'
                data-kt-drawer-name='app-header-menu'
                data-kt-drawer-activate='{default: true, lg: false}'
                data-kt-drawer-overlay='true'
                data-kt-drawer-width='225px'
                data-kt-drawer-direction='end'
                data-kt-drawer-toggle='#kt_app_header_menu_toggle'
                data-kt-swapper='true'
                data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
                data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
              >
                {/* <Header /> */}
              </div>
            )}
          <Navbar />
        </div>
      </div>
    </div>
  );
}
