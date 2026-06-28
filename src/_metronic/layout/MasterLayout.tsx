import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import { HeaderWrapper } from './components/header';
import { Sidebar } from './components/sidebar';
import { Toolbar } from './components/toolbar/Toolbar';
import { Content } from './components/content';
import { Footer } from './components/footer/Footer';
import { ScrollTop } from './components/scroll-top';
import { PageDataProvider } from './core';
import { reInitMenu } from '../helpers';

const MasterLayout = () => {
  const location = useLocation();

  useEffect(() => {
    reInitMenu();
  }, [location.key]);

  return (
    <PageDataProvider>
      <div className='d-flex flex-column flex-root app-root' id='kt_app_root'>
        <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
          <HeaderWrapper />
          <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
            <Sidebar />
            <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
              <div className='d-flex flex-column flex-column-fluid' id='dash2'>
                <Toolbar />
                <Content>
                  <Outlet />
                </Content>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>

      {/* begin:: Drawers */}
      {/* <ActivityDrawer /> */}
      {/* <RightToolbar /> */}
      {/* <DrawerMessenger /> */}
      {/* end:: Drawers */}

      {/* begin:: Modals */}
      {/* <InviteUsers /> */}
      {/* <UpgradePlan /> */}
      {/* end:: Modals */}
      <ScrollTop />
      <Tooltip id='my-tooltip' />
      <ToastContainer position='top-right' autoClose={3000} closeOnClick theme='colored' />
    </PageDataProvider>
  );
};

export { MasterLayout };
