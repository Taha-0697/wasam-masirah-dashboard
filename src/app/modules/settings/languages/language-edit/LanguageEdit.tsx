import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { InfinitySpin } from 'react-loader-spinner';
import { LanguageEditForm } from './LanguageEditForm';
import { KTCard, QUERIES, isNotEmpty } from '../../../../../_metronic/helpers';
import { getLanguageById } from '../core/_requests';

const LanguageEdit = () => {
  const { id } = useParams();
  const languageId = Number(id);

  const enabledQuery: boolean = isNotEmpty(languageId);

  const {
    isLoading,
    data: language,
    error,
  } = useQuery(
    [QUERIES.LANGUAGES, languageId],
    () => {
      return getLanguageById(languageId);
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

      {language && <LanguageEditForm language={language} />}
    </KTCard>
  );
};

export { LanguageEdit };
