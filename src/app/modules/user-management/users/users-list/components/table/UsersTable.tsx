import { useMemo } from 'react';
import { Row, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { FormattedMessage } from 'react-intl';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { usersColumns } from './columns/_columns';
import { User } from '../../../core/_models';
import { UsersListLoading } from '../loading/UsersListLoading';
import { UsersListPagination } from '../pagination/UsersListPagination';
import { useQueryResponseData, useQueryResponseLoading } from '../../../core/QueryResponseProvider';
import { usePermission } from '../../../core/PermissionProvider';
import { UserCustomHeader } from './columns/UserCustomHeader';
import { UserActionsCell } from './columns/UserActionsCell';

const UsersTable = () => {
  const users = useQueryResponseData();
  const isLoading = useQueryResponseLoading();
  const data = useMemo(() => users, [users]);
  const { canEdit, canDelete, canAssignRole } = usePermission()
  const columns = useMemo(() => {
    // Clone the columns array
    const clonedColumns = [...usersColumns];

    // Conditionally add the "actions" column based on permissions
    if (canEdit || canDelete || canAssignRole) {
      clonedColumns.push({
        id: 'actions',
        header: (props) => (
          <UserCustomHeader
            tableProps={props}
            localizedKey='GENERAL.ACTION'
            className='min-w-150px text-end'
          />
        ),
        cell: (props) => <UserActionsCell id={props.row.original.id} />,
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
              <tr key={headerGroup.id} className='text-start fw-bold text-uppercase'>
                {headerGroup.headers.map((header) => (
                  <CustomHeaderColumn key={header.id} column={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {data.length > 0 ? (
              getRowModel().rows.map((row: Row<User>) => <CustomRow row={row} key={row.id} />)
            ) : (
              <tr>
                <td colSpan={5}>
                  <div className='text-center fs-6 fw-bold'>
                    <FormattedMessage id='MESSAGES.NORECORDSFOUND' />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isLoading && <UsersListLoading />}
      <UsersListPagination />
    </>
  );
};

export { UsersTable };
