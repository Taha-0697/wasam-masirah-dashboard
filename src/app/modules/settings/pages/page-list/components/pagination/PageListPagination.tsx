import { useEffect } from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import clsx from 'clsx';
import {
  useQueryResponseLoading,
  useQueryResponsePagination,
} from '../../../core/QueryResponseProvider';
import { useQueryRequest } from '../../../core/QueryRequestProvider';
import {
  getPages,
  getPagesCount,
  getRowInformation,
  initialQueryState,
} from '../../../../../../../_metronic/helpers';

const PageListPagination = () => {
  const pagination = useQueryResponsePagination();
  const isLoading = useQueryResponseLoading();

  const {
    state: { pageNumber, pageSize, searchText },
    updateState,
  } = useQueryRequest();

  const updatePage = (page: number | undefined | null) => {
    if (!page || isLoading || pageNumber === page) {
      return;
    }

    updateState({ pageNumber: page });
  };

  const pageCount = getPagesCount(pagination.totalCount, pageSize);

  const pages = getPages(pageNumber, pageCount, initialQueryState.pageSize);

  const { start, end, total } = getRowInformation(
    pageNumber,
    pageCount,
    pageSize,
    pagination.totalCount
  );

  const onNextPageClick = () => {
    if (pageNumber < pageCount) updatePage(pageNumber + 1);
  };

  const onPreviousPageClick = () => {
    if (pageNumber > 1) updatePage(pageNumber - 1);
  };

  useEffect(() => {
    if (pageNumber > pageCount) updatePage(pageCount);
  }, [pageSize, searchText]);

  return (
    <div className='d-flex justify-content-between align-items-center flex-wrap p-2'>
      <div className='d-flex align-items-center'>
        {isLoading && (
          <div className='d-flex align-items-center'>
            <div className='me-2 text-dark'>
              <FormattedMessage id='MESSAGES.LOADING' />
              ...
            </div>
            <div className='spinner-border h-20px w-20px text-primary me-3' />
          </div>
        )}
        <div className='text-dark'>
          <FormattedMessage id='MESSAGES.SHOWINGROWS' values={{ start, end, total }} />
        </div>
      </div>

      {pageCount > 1 && (
        <div className='d-flex flex-wrap justify-content-end'>
          <ul className='pagination pagination-outline'>
            <li className='page-item'>
              <button
                className='btn btn-sm btn-icon btn-secondary'
                disabled={pageNumber === 1}
                onClick={() => updatePage(1)}
              >
                <i className='fa-solid fa-angles-left text-dark fs-7'></i>
              </button>
            </li>
            <li className='page-item'>
              <button
                className='btn btn-sm btn-icon btn-secondary'
                disabled={pageNumber === 1}
                onClick={onPreviousPageClick}
              >
                <i className='fa-solid fa-angle-left text-dark fs-7'></i>
              </button>
            </li>

            {pages[0] !== 1 && (
              <li className='page-item'>
                <button className='btn btn-sm btn-icon btn-transparent'>...</button>
              </li>
            )}

            {pages.map((page) => (
              <li key={page} className='page-item'>
                <button
                  className={clsx('btn btn-sm btn-icon', {
                    'btn-secondary text-dark': pageNumber !== page,
                    'btn-primary': pageNumber === page,
                  })}
                  onClick={() => updatePage(page)}
                >
                  <FormattedNumber value={page} />
                </button>
              </li>
            ))}

            {pages[pages.length - 1] !== pageCount && (
              <li className='page-item'>
                <button className='btn btn-sm btn-icon btn-transparent'>...</button>
              </li>
            )}

            <li className='page-item'>
              <button
                className='btn btn-sm btn-icon btn-secondary'
                disabled={pageNumber === pageCount}
                onClick={onNextPageClick}
              >
                <i className='fa-solid fa-angle-right text-dark fs-7'></i>
              </button>
            </li>
            <li className='page-item'>
              <button
                className='btn btn-sm btn-icon btn-secondary'
                disabled={pageNumber === pageCount}
                onClick={() => updatePage(pageCount)}
              >
                <i className='fa-solid fa-angles-right text-dark fs-7'></i>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export { PageListPagination };
