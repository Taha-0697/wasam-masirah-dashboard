import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import qs from 'qs';
import { ID, QueryResponseContextProps, QueryState } from './models';

function createResponseContext<T>(initialState: QueryResponseContextProps<T>) {
  return createContext(initialState);
}

function isNotEmpty(obj: unknown) {
  return obj !== undefined && obj !== null && obj !== '';
}

// Example: page=1&items_per_page=10&sort=id&order=desc&search=a&filter_name=a&filter_online=false
function stringifyRequestQuery(state: QueryState): string {
  const pagination = qs.stringify(state, {
    filter: ['pageNumber', 'pageSize'],
    skipNulls: true,
  });
  const sort = qs.stringify(state, { filter: ['sortOrder', 'sortField'], skipNulls: true });
  const search = isNotEmpty(state.searchText)
    ? qs.stringify(state, { filter: ['searchText'], skipNulls: true })
    : '';

  const filter = state.filter
    ? Object.entries(state.filter as Object)
      .filter((obj) => isNotEmpty(obj[1]))
      .map((obj) => {
        return `filter_${obj[0]}=${obj[1]}`;
      })
      .join('&')
    : '';

  return [pagination, sort, search, filter]
    .filter((f) => f)
    .join('&')
    .toLowerCase();
}

function parseRequestQuery(query: string): QueryState {
  const cache: unknown = qs.parse(query);
  return cache as QueryState;
}

function calculatedGroupingIsDisabled<T>(isLoading: boolean, data: T[] | undefined): boolean {
  if (isLoading) {
    return true;
  }

  return !data || !data.length;
}

function calculateIsAllDataSelected<T>(data: T[] | undefined, selected: ID[]): boolean {
  if (!data) {
    return false;
  }

  return data.length > 0 && data.length === selected.length;
}

function groupingOnSelect(id: ID, selected: ID[], setSelected: Dispatch<SetStateAction<ID[]>>) {
  if (!id) {
    return;
  }

  if (selected.includes(id)) {
    setSelected(selected.filter((itemId) => itemId !== id));
  } else {
    const updatedSelected = [...selected];
    updatedSelected.push(id);
    setSelected(updatedSelected);
  }
}

function groupingOnSelectAll<T>(
  isAllSelected: boolean,
  setSelected: Dispatch<SetStateAction<ID[]>>,
  data?: T & { id?: ID }[]
) {
  if (isAllSelected) {
    setSelected([]);
    return;
  }

  if (!data || !data.length) {
    return;
  }

  setSelected(data.filter((item) => item.id).map((item) => item.id));
}

// Hook
function useDebounce(value: string | undefined, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

//Pagination
const getPagesCount = (totalSize: number, sizePerPage: number) => {
  return Math.ceil(totalSize / sizePerPage);
};

const getPages = (page: number, pagesCount: number, paginationSize: number) => {
  const result: number[] = [];

  if (!page) {
    return result;
  }

  if (pagesCount === 1) {
    result.push(1);
    return result;
  }

  if (pagesCount < page) {
    return result;
  }

  if (pagesCount < paginationSize + 1) {
    for (let i = 1; i < pagesCount + 1; i++) {
      result.push(i);
    }
    return result;
  }

  if (page === 1) {
    for (let i = 1; i < paginationSize + 1; i++) {
      if (i < pagesCount) {
        result.push(i);
      }
    }
    return result;
  }

  if (page === pagesCount) {
    for (let i = pagesCount - paginationSize + 1; i <= pagesCount; i++) {
      if (i <= pagesCount) {
        result.push(i);
      }
    }
    return result;
  }

  const shiftCount = Math.floor(paginationSize / 2);
  if (shiftCount < 1) {
    result.push(page);
    return result;
  }

  //
  if (page < shiftCount + 2) {
    for (let i = 1; i < paginationSize + 1; i++) {
      result.push(i);
    }
    return result;
  }

  if (pagesCount - page < shiftCount + 2) {
    for (let i = pagesCount - paginationSize; i < pagesCount + 1; i++) {
      result.push(i);
    }
    return result;
  }

  for (let i = page - shiftCount; i < page; i++) {
    if (i > 0) {
      result.push(i);
    }
  }
  result.push(page);
  for (let i = page + 1; i < page + shiftCount + 1; i++) {
    if (i <= pagesCount) {
      result.push(i);
    }
  }

  return result;
};

const getRowInformation = (
  currentPageNo: number,
  totalPages: number,
  pageSize: number,
  noOfRecords: number
) => {
  const start = currentPageNo === 1 ? 1 : (currentPageNo - 1) * pageSize;

  const end =
    noOfRecords <= pageSize || currentPageNo === totalPages
      ? noOfRecords
      : pageSize * currentPageNo;

  const total = noOfRecords;

  if (!noOfRecords) return { start: 0, end: 0, total: 0 };

  return { start, end, total };
};


const prependDefaultOption = (options: any[], defaultOption: any) => {
  if (options && options.length && options[0].value !== defaultOption.value) {
    return [defaultOption, ...options];
  }
  return options;
};

const defaultOptionForReactSelectBox = { id: '', name: 'Select ...', isDisabled: true };

const createAcronym = (name: any) => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

const handleFileUpload = (event, callback) => {
  const { files } = event.target;
  if (files.length > 0) {
    const fileArray = Array.from(files); // Converts FileList to an array
    callback(fileArray); // Pass the array of files to the callback
  } else {
    callback([]); // No files selected
  }
};

const truncateText = (text: string | undefined, limit: number): string => {
  if (!text) return '';
  return text.length > limit ? text.slice(0, limit) + '...' : text;
};


export {
  createResponseContext,
  stringifyRequestQuery,
  parseRequestQuery,
  calculatedGroupingIsDisabled,
  calculateIsAllDataSelected,
  groupingOnSelect,
  groupingOnSelectAll,
  useDebounce,
  isNotEmpty,
  getPagesCount,
  getRowInformation,
  getPages,
  prependDefaultOption,
  defaultOptionForReactSelectBox,
  createAcronym,
  handleFileUpload,
  truncateText
};
