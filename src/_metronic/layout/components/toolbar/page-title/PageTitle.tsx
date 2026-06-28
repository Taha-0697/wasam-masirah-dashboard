import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { usePageData } from '../../../core/PageData';

const PageTitle = () => {
  const { pageTitle, pageBreadcrumbs } = usePageData();

  return (
    <div
      id='kt_page_title'
      data-kt-swapper='true'
      data-kt-swapper-mode='prepend'
      data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
      className='page-title d-flex align-items-center flex-wrap me-3 mb-lg-0'
    >
      {/* begin::Title */}
      {pageTitle && (
        <h1 className='page-heading d-flex text-dark fw-bold fs-3 align-items-center my-0'>
          {pageTitle}
        </h1>
      )}
      {/* end::Title */}

      {pageBreadcrumbs && pageBreadcrumbs.length > 0 && (
        <>
          <span className='h-20px border-gray-300 border-start mx-4'></span>

          <ul className='breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0'>
            {Array.from(pageBreadcrumbs).map((item, index) => (
              <li key={`${item.title}${index}`} className='breadcrumb-item'>
                {item.path ? (
                  <Link className='text-hover-primary text-dark' to={item.path}>
                    {item.title}
                  </Link>
                ) : (
                  <span
                    className={clsx('text-hover-primary', {
                      'text-dark': item.isActive,
                      'text-muted': !item.isActive,
                    })}
                  >
                    {item.title}
                  </span>
                )}
                {item.isSeparator && <span className='bullet bg-gray-400 w-5px h-2x mx-2'></span>}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export { PageTitle };
