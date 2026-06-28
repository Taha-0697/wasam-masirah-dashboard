/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { useAuth } from '../../../../app/modules/auth';
import { Languages } from './Languages';
import { toAbsoluteUrl } from '../../../helpers';

const HeaderUserMenu: FC = () => {
  const { currentUser, logout } = useAuth();
  
  // Cleanly resolve dynamic picture path from API environment variables
  const Avatar = currentUser?.picture 
    ? (process.env.REACT_APP_PUBLIC_URL || '') + '/Pictures/' + currentUser?.picture 
    : undefined;

  const resolvedAvatarUrl = Avatar ? Avatar : toAbsoluteUrl('/media/svg/avatars/blank.svg');

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      {}
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-start px-3 py-3 min-w-0'>
          
          {/* Professional Avatar Symbol Block */}
          <div className='symbol symbol-50px symbol-circle me-4 flex-shrink-0'>
            <img 
              alt='Avatar' 
              src={resolvedAvatarUrl} 
              className='align-self-center object-fit-cover w-50px h-50px border border-secondary border-opacity-50' 
            />
          </div>

          {/* User Details Stack - Optimized to break words dynamically if width overflows standard 275px container */}
          <div className='d-flex flex-column min-w-0 flex-grow-1 gap-2'>
            
            {/* Name Meta Block */}
            <div className='d-flex flex-column min-w-0'>
              <span className='fw-bold text-gray-400 fs-8 text-uppercase mb-0.5 leading-none'>Name</span>
              <span className='text-gray-800 text-hover-primary fs-6 fw-bolder text-break lh-sm'>
                {currentUser?.firstName} {currentUser?.lastName}
              </span>
            </div>

            {/* Email Meta Block */}
            <div className='d-flex flex-column min-w-0'>
              <span className='fw-bold text-gray-400 fs-8 text-uppercase mb-0.5 leading-none'>Email</span>
              <span className='text-muted fs-7 text-break fw-semibold lh-sm'>
                {currentUser?.email}
              </span>
            </div>

            {}
            {/* Roles Meta Block */}
            <div className='d-flex flex-column min-w-0'>
              <span className='fw-bold text-gray-400 fs-8 text-uppercase mb-1 leading-none'>Roles</span>
              <div className='d-flex flex-wrap gap-1 min-w-0'>
                {currentUser?.roles && currentUser.roles.length > 0 ? (
                  currentUser.roles.map((role: any, index: number) => (
                    <span 
                      key={index} 
                      className='badge badge-light-primary fw-bold fs-9 px-2 py-0.5 text-wrap text-break'
                    >
                      {role.name}
                    </span>
                  ))
                ) : (
                  <span className='text-muted fs-7 fw-semibold'>No roles assigned</span>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>

      {}
      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        {/* Optional: Language Translation Switcher Row if configured */}
        <Languages />
      </div>

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5 text-hover-danger transition-all'>
          Sign Out
        </a>
      </div>
    </div>
  );
};

export { HeaderUserMenu };