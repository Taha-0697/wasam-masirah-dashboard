import { Response } from '../../../../../_metronic/helpers';
import * as localizedMessagesTemplate from '../../../../../_metronic/i18n/messages/template.json';

export type Language = {
  id: number;
  name: string;
  abbreviation: string;
  direction: string;
  icon?: string;
  localizedMessages: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  modifiedAt?: string;
  modifiedBy?: string;
};

export type LanguageRequest = {
  name: string;
  abbreviation: string;
  direction: string;
  iconPath?: string;
  uploadedIconFile: File | null;
  localizedMessages: string;
  isDefault: boolean;
  isActive: boolean;
};

export type LanguagesQueryResponse = Response<Array<Language>>;

export const initialLanguageRequest: LanguageRequest = {
  name: '',
  abbreviation: '',
  direction: 'ltr',
  iconPath: '',
  uploadedIconFile: null,
  localizedMessages: JSON.stringify(localizedMessagesTemplate),
  isDefault: false,
  isActive: true,
};
