import { FC, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import { useQueryRequest } from '../../../../core/QueryRequestProvider';
import { initialQueryState } from '../../../../../../../../_metronic/helpers';

type Props = {
  className?: string;
  title?: string;
  localizedKey?: string;
  tableProps: any;
};

const UserCustomHeader: FC<Props> = ({ className, title, localizedKey, tableProps }) => {
  const id = tableProps.column.id;
  const canSort = tableProps.column.getCanSort();
  const { state, updateState } = useQueryRequest();

  const isSelectedForSorting = useMemo(() => {
    return state.sortField && state.sortField === id;
  }, [state, id]);

  const order = useMemo(() => state.sortOrder, [state]);

  const sortColumn = () => {
    // avoid sorting
    if (!canSort) {
      return;
    }

    if (!isSelectedForSorting) {
      // enable sort asc
      updateState({
        ...state,
        sortField: id,
        sortOrder: 'asc',
        pageNumber: initialQueryState.pageNumber,
      });
      return;
    }

    if (isSelectedForSorting) {
      updateState({
        ...state,
        sortField: id,
        sortOrder: order === 'asc' ? 'desc' : 'asc',
        pageNumber: initialQueryState.pageNumber,
      });

      return;
    }
  };

  return (
    <th
      colSpan={tableProps.header.colSpan}
      className={clsx(
        className,
        isSelectedForSorting && order !== undefined && `table-sort-${order}`,
        { 'cursor-pointer': canSort }
      )}
      onClick={sortColumn}
    >
      {title || <FormattedMessage id={localizedKey} />}
    </th>
  );
};

export { UserCustomHeader };
