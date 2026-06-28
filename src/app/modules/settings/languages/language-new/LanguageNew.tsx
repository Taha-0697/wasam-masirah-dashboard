import { LanguageNewForm } from './LanguageNewForm';
import { KTCard } from '../../../../../_metronic/helpers';
import { initialLanguageRequest } from '../core/_models';

const LanguageNew = () => {
  return (
    <KTCard>
      <LanguageNewForm language={initialLanguageRequest} />
    </KTCard>
  );
};

export { LanguageNew };
