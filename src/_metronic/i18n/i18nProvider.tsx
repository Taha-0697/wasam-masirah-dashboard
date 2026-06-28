import { FC } from 'react';
import { useLang } from './Metronici18n';
import { IntlProvider } from 'react-intl';
import { WithChildren } from '../helpers';

import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/es';
import '@formatjs/intl-relativetimeformat/locale-data/ar';

import enMessages from './messages/en.json';
import esMessages from './messages/es.json';
import arMessages from './messages/ar.json';

const allMessages = {
  en: enMessages,
  es: esMessages,
  ar: arMessages,
};

const I18nProvider: FC<WithChildren> = ({ children }) => {
  const locale = useLang();
  const messages = allMessages[locale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export { I18nProvider };
