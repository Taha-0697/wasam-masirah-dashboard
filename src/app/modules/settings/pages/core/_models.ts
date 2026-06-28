import { ID, Response } from '../../../../../_metronic/helpers';

export type Page = {
    id: number;
    name: string;
    description?: string;
    parentId?: ID;   
    isActive: boolean;
    createdAt: string;
    createdBy: string;
    modifiedAt?: string;
    modifiedBy?: string;
};

export type SystemPage = {
    id: number;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    createdBy: string;
    modifiedAt?: string;
    modifiedBy?: string;
};


export type PageRequest = {
    name: string;
    description?: string;
    parentId?: ID;  
    isActive: boolean;
};

export type PagesQueryResponse = Response<Array<Page>>;

export const initialPageRequest: PageRequest = {
    name: '',
    description: '',
    parentId: '',   
    isActive: true,
};

