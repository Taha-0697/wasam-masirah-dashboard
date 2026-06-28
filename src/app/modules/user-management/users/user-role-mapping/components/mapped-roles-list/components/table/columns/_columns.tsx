import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { Role } from '../../../../../../../roles/core/_models';
import { RoleCustomHeader } from './RoleCustomHeader';
import { RoleSerialNumberCell } from './RoleSerialNumberCell';
import { RoleCreationCell } from './RoleCreationCell';
import { RoleActionsCell } from './RoleActionsCell';
import RoleBusinessEntityName from './RoleBusinessEntityName';

const columnHelper = createColumnHelper<Role>();

const rolesColumns = [
  columnHelper.display({
    id: 'serial number',
    header: (props) => <RoleCustomHeader tableProps={props} title='#' />,
    cell: (props) => <RoleSerialNumberCell rowIndex={props.row.index} />,
  }),
  columnHelper.accessor('name', {
    header: (props) => (
      <RoleCustomHeader tableProps={props} localizedKey='FIELDS.NAME' className='min-w-200px' />
    ),
  }),

  columnHelper.accessor((row) => ({ createdBy: row.createdBy, createdAt: row.createdAt }), {
    id: 'createdAt',
    header: (props) => (
      <RoleCustomHeader tableProps={props} localizedKey='FIELDS.CREATION' className='min-w-200px' />
    ),
    cell: (props) => {
      const value = props.getValue();

      return <RoleCreationCell createdBy={value.createdBy} createdAt={value.createdAt} />;
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: (props) => (
      <RoleCustomHeader
        tableProps={props}
        localizedKey='GENERAL.ACTION'
        className='min-w-150px text-end'
      />
    ),
    cell: ({ ...props }) => <RoleActionsCell roleId={props.row.original.id} />,
  }),
];

export { rolesColumns };
