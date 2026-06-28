import axios, { AxiosResponse } from 'axios';
import { Page, PageRequest, PagesQueryResponse, SystemPage } from './_models';

const API_URL = process.env.REACT_APP_API_URL;
const Page_URL = `${API_URL}/Page`;


const getPages = (): Promise<Array<Page>> => {
  return axios.get(Page_URL).then((d: AxiosResponse<Array<Page>>) => d.data);
};

const getSystemPages = (): Promise<Array<SystemPage>> => {
  return axios.get(`${Page_URL}/System_Pages`).then((d: AxiosResponse<Array<SystemPage>>) => d.data);
};

const getFilteredPages = (query: string): Promise<PagesQueryResponse> => {
  return axios
    .get(`${Page_URL}/find?${query}`)
    .then((d: AxiosResponse<PagesQueryResponse>) => d.data);
};


const getPageById = (id: number): Promise<Page> => {
  return axios
    .get(`${Page_URL}/${id}`)
    .then((response: AxiosResponse<Page>) => response.data);
};

const createPage = (Page: PageRequest): Promise<Page> => {
  return axios
    .post(Page_URL, Page)
    .then((response: AxiosResponse<Page>) => response.data);
};

const updatePage = (id: number, Page: PageRequest): Promise<void> => {

  return axios.put(`${Page_URL}/${id}`, Page).then(() => { });
};

const deletePage = (id: number): Promise<void> => {
  return axios.delete(`${Page_URL}/${id}`).then(() => { });
};

export {
  getPages,
  getFilteredPages,
  getPageById,
  createPage,
  updatePage,
  deletePage,
  getSystemPages
};
