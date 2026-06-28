/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  QUERIES,
  stringifyRequestQuery,
  WithChildren,
} from '../../../../../_metronic/helpers';
import { useQueryRequest } from './QueryRequestProvider';
import { Page } from './_models';
import { getFilteredPages } from './_requests';

const QueryResponseContext = createResponseContext<Page>(initialQueryResponse);

const QueryResponseProvider: FC<WithChildren> = ({ children }) => {
  const { state } = useQueryRequest();
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state));
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state]);

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
    }
  }, [updatedQuery]);

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    [QUERIES.PAGES, query],
    () => {
      return getFilteredPages(query);
    },
    { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
  );

  return (
    <QueryResponseContext.Provider value={{ isLoading: isFetching, refetch, response, query }}>
      {children}
    </QueryResponseContext.Provider>
  );
};

const useQueryResponse = () => useContext(QueryResponseContext);

const useQueryResponseData = () => {
  const { response } = useQueryResponse();

  if (!response) {
    return [];
  }

  return response?.entities || [];
};

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = { ...initialQueryState };

  const { response } = useQueryResponse();

  if (!response) {
    return defaultPaginationState;
  }

  return response.pagination;
};

const useQueryResponseLoading = (): boolean => {
  const { isLoading } = useQueryResponse();

  return isLoading;
};

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
};
