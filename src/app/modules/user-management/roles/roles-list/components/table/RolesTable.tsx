import { useMemo } from 'react';
import { Row, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { FormattedMessage } from 'react-intl';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { rolesColumns } from './columns/_columns';
import { Role } from '../../../core/_models';
import { RolesListLoading } from '../loading/RolesListLoading';
import { RolesListPagination } from '../pagination/RolesListPagination';
import { useQueryResponseData, useQueryResponseLoading } from '../../../core/QueryResponseProvider';
import { RoleActionsCell } from './columns/RoleActionsCell';
import { RoleCustomHeader } from './columns/RoleCustomHeader';
import { usePermission } from '../../../core/PermissionProvider';

const RolesTable = () => {
  const roles = useQueryResponseData();
  const isLoading = useQueryResponseLoading();
  const data = useMemo(() => roles, [roles]);
  const { canEdit, canDelete } = usePermission()
  const columns = useMemo(() => {
    // Clone the columns array
    const clonedColumns = [...rolesColumns];

    // Conditionally add the "actions" column based on permissions
    if (canEdit || canDelete) {
      clonedColumns.push({
        id: 'actions',
        header: (props) => (
          <RoleCustomHeader
            tableProps={props}
            localizedKey='GENERAL.ACTION'
            className='min-w-150px text-end'
          />
        ),
        cell: (props) => <RoleActionsCell id={props.row.original.id} />,
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
              getRowModel().rows.map((row: Row<Role>) => <CustomRow row={row} key={row.id} />)
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
      {isLoading && <RolesListLoading />}
      <RolesListPagination />
    </>
  );
};

export { RolesTable };
