import axios, { AxiosResponse } from 'axios';
import { Language, LanguageRequest, LanguagesQueryResponse } from './_models';

const API_URL = process.env.REACT_APP_API_URL;
const LANGUAGES_URL = `${API_URL}/languages`;

const getLanguages = (): Promise<Array<Language>> => {
  return axios.get(LANGUAGES_URL).then((d: AxiosResponse<Array<Language>>) => d.data);
};

const getFilteredLanguages = (query: string): Promise<LanguagesQueryResponse> => {
  return axios
    .get(`${LANGUAGES_URL}/find?${query}`)
    .then((d: AxiosResponse<LanguagesQueryResponse>) => d.data);
};

const getLanguageById = (id: number): Promise<Language> => {
  return axios
    .get(`${LANGUAGES_URL}/${id}`)
    .then((response: AxiosResponse<Language>) => response.data);
};

const createLanguage = (language: LanguageRequest): Promise<Language> => {
  const formData = new FormData();

  formData.append('name', language.name);
  formData.append('abbreviation', language.abbreviation || '');
  formData.append('direction', language.direction);
  formData.append('iconFile', language.uploadedIconFile || '');
  formData.append('isDefault', language.isDefault.toString());
  formData.append('isActive', language.isActive.toString());
  formData.append('localizedMessages', JSON.stringify(language.localizedMessages));

  return axios
    .post(LANGUAGES_URL, formData)
    .then((response: AxiosResponse<Language>) => response.data);
};

const updateLanguage = (id: number, language: LanguageRequest): Promise<void> => {
  const formData = new FormData();

  formData.append('name', language.name);
  formData.append('abbreviation', language.abbreviation || '');
  formData.append('direction', language.direction);
  formData.append('iconPath', language.iconPath || '');
  formData.append('iconFile', language.uploadedIconFile || '');
  formData.append('isDefault', language.isDefault.toString());
  formData.append('isActive', language.isActive.toString());
  formData.append('localizedMessages', JSON.stringify(language.localizedMessages));

  return axios.put(`${LANGUAGES_URL}/${id}`, formData).then(() => {});
};

const deleteLanguage = (id: number): Promise<void> => {
  return axios.delete(`${LANGUAGES_URL}/${id}`).then(() => {});
};

export {
  getLanguages,
  getFilteredLanguages,
  getLanguageById,
  createLanguage,
  updateLanguage,
  deleteLanguage,
};
