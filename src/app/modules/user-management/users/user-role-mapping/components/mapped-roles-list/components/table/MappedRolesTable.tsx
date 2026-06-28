import { FC, useMemo } from 'react';
import { Row, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { FormattedMessage } from 'react-intl';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { rolesColumns } from './columns/_columns';
import { Role } from '../../../../../../roles/core/_models';

type Props = {
  roles: Role[];
};

const MappedRolesTable: FC<Props> = ({ roles }) => {
  const data = useMemo(() => roles, [roles]);
  const columns = useMemo(() => rolesColumns, []);
  const { getHeaderGroups, getRowModel } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
            getRowModel().rows.map((row: Row<any>) => <CustomRow row={row} key={row.id} />)
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
  );
};

export { MappedRolesTable };
