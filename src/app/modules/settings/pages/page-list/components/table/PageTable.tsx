import { useMemo } from 'react';
import { Row, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { FormattedMessage } from 'react-intl';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { useQueryResponseData, useQueryResponseLoading } from '../../../core/QueryResponseProvider';
import { PageColumns } from './columns/_columns';
import { Page } from '../../../core/_models';
import { PageListLoading } from '../loading/PageListLoading';
import { PageListPagination } from '../pagination/PageListPagination';
import { usePermission } from '../../../core/PermissionProvider';
import { PageCustomHeader } from './columns/PageCustomHeader';
import { PageActionsCell } from './columns/PageActionsCell';


const PageTable = () => {
  const Page = useQueryResponseData();
  const isLoading = useQueryResponseLoading();
  const data = useMemo(() => Page, [Page]);
  const { canEdit, canDelete } = usePermission()
  const columns = useMemo(() => {
    // Clone the columns array
    const clonedColumns = [...PageColumns];

    // Conditionally add the "actions" column based on permissions
    if (canEdit || canDelete) {
      clonedColumns.push({
        id: 'actions',
        header: (props) => (
          <PageCustomHeader
            tableProps={props}
            localizedKey='GENERAL.ACTION'
            className='min-w-150px text-end'
          />
        ),
        cell: (props) => <PageActionsCell id={props.row.original.id} />,
      })
    }
    return clonedColumns;
  }, [])

  const { getHeaderGroups, getRowModel } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className='table-responsive'>
        <table className='table table-bordered align-middle text-dark'>
          <thead className='bg-light'>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className='text-start'>
                {headerGroup.headers.map((header) => (
                  <CustomHeaderColumn key={header.id} column={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {data.length > 0 ? (
              getRowModel().rows.map((row: Row<Page>) => <CustomRow row={row} key={row.id} />)
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='text-center fs-6 fw-bold'>
                    <FormattedMessage id='MESSAGES.NORECORDSFOUND' />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isLoading && <PageListLoading />}
      <PageListPagination />
    </>
  );
};

export { PageTable };
