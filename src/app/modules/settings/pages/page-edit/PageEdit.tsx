import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { InfinitySpin } from 'react-loader-spinner';
import { PageEditForm } from './PageEditForm';
import { KTCard, QUERIES, isNotEmpty } from '../../../../../_metronic/helpers';
import { getPageById } from '../core/_requests';

const PageEdit = () => {
  const { id } = useParams();
  const PageId = Number(id);

  const enabledQuery: boolean = isNotEmpty(PageId);

  const {
    isLoading,
    data: page,
    error,
  } = useQuery(
    [QUERIES.PAGES, PageId],
    () => {
      return getPageById(PageId);
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      refetchOnWindowFocus: false,
      onError: (err) => {
        console.error(err);
      },
    }
  );

  return (
    <KTCard>
      {isLoading && (
        <div className='d-flex justify-content-center'>
          <InfinitySpin width='200' color='#0a3761' />
        </div>
      )}

      {page && <PageEditForm pageData={page} />}
    </KTCard>
  );
};

export { PageEdit };
