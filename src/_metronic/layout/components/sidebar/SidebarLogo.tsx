import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { toAbsoluteUrl } from '../../../helpers';
import { useLayout } from '../../core';
import { MutableRefObject, useEffect, useRef } from 'react';
import { ToggleComponent } from '../../../assets/ts/components';

type PropsType = {
  sidebarRef: MutableRefObject<HTMLDivElement | null>;
};

const SidebarLogo = (props: PropsType) => {
  const { config } = useLayout();
  const toggleRef = useRef<HTMLDivElement>(null);

  const appSidebarDefaultMinimizeDesktopEnabled =
    config?.app?.sidebar?.default?.minimize?.desktop?.enabled;
  const appSidebarDefaultCollapseDesktopEnabled =
    config?.app?.sidebar?.default?.collapse?.desktop?.enabled;
  
  const toggleType = appSidebarDefaultCollapseDesktopEnabled
    ? 'collapse'
    : appSidebarDefaultMinimizeDesktopEnabled
    ? 'minimize'
    : '';
  
  const toggleState = appSidebarDefaultMinimizeDesktopEnabled ? 'active' : '';
  const appSidebarDefaultMinimizeDefault = config.app?.sidebar?.default?.minimize?.desktop?.default;

  useEffect(() => {
    setTimeout(() => {
      const toggleObj = ToggleComponent.getInstance(toggleRef.current!) as ToggleComponent | null;

      if (toggleObj === null) {
        return;
      }

      // Keep the native click and animation transitions for the toggle arrow completely undisturbed
      toggleObj.on('kt.toggle.change', function () {
        if (props.sidebarRef.current) {
          props.sidebarRef.current.classList.add('animating');
        }

        setTimeout(function () {
          if (props.sidebarRef.current) {
            props.sidebarRef.current.classList.remove('animating');
          }
        }, 300);
      });
    }, 600);
  }, [toggleRef, props.sidebarRef]);

  // Determine standard color schema based on layout context
  const isDarkSidebar = config.layoutType === 'dark-sidebar';

  return (
    <div 
      className='app-sidebar-logo d-flex align-items-center justify-content-between position-relative px-6' 
      id='kt_app_sidebar_logo'
    >
      <Link 
        to='/dashboard' 
        className='d-flex align-items-center justify-content-start w-100 h-100 text-decoration-none'
      >
        <div className='d-flex align-items-center app-sidebar-logo-default gap-3 animate-fade-in'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/logos/default-small.png')}
            className='h-30px w-auto object-fit-contain'
          />
          <span 
            className={clsx(
              'fs-5 fw-bolder text-nowrap letter-spacing-1 transition-all',
              isDarkSidebar ? 'text-white' : 'text-gray-800'
            )}
          >
            Wasam Masirah
          </span>
        </div>

      
      </Link>

      {/* 3. NATIVE TOGGLE TRIGGER BUTTON (UNDISTURBED) */}
      {(appSidebarDefaultMinimizeDesktopEnabled || appSidebarDefaultCollapseDesktopEnabled) && (
        <div
          ref={toggleRef}
          id='kt_app_sidebar_toggle'
          className={clsx(
            'app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary h-30px w-30px position-absolute top-50 start-100 translate-middle rotate',
            { active: appSidebarDefaultMinimizeDefault }
          )}
          data-kt-toggle='true'
          data-kt-toggle-state={toggleState}
          data-kt-toggle-target='body'
          data-kt-toggle-name={`app-sidebar-${toggleType}`}
        >
          <i className='fa-solid fa-arrow-left-long text-dark rotate-180'></i>
        </div>
      )}
    </div>
  );
};

export { SidebarLogo };