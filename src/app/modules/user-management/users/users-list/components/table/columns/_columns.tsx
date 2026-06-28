import { createColumnHelper } from '@tanstack/react-table';
import { User } from '../../../../core/_models';
import { UserCustomHeader } from './UserCustomHeader';
import { UserSerialNumberCell } from './UserSerialNumberCell';
import { UserFullNameCell } from './UserFullNameCell';
import { UserActionsCell } from './UserActionsCell';
import { UserIsActiveCell } from './UserIsActiveCell';
import { UserCreationCell } from './UserCreationCell';
import { UserRolesCell } from './UserRolesCell';

const columnHelper = createColumnHelper<User>();

const usersColumns = [
  columnHelper.display({
    id: 'serial number',
    header: (props) => <UserCustomHeader tableProps={props} title='#' />,
    cell: (props) => <UserSerialNumberCell rowIndex={props.row.index} />,
  }),

  columnHelper.accessor(
    (row) => ({ firstName: row.firstName, lastName: row.lastName, picture: row.picture }),
    {
      id: 'firstName',
      header: (props) => (
        <UserCustomHeader tableProps={props} localizedKey='FIELDS.NAME' className='min-w-200px' />
      ),
      cell: (props) => {
        const value = props.getValue();

        return (
          <UserFullNameCell
            firstName={value.firstName}
            lastName={value.lastName}
            image={value.picture}
          />
        );
      },
    }
  ),

  columnHelper.accessor((row) => ({ email: row.email }), {
    id: 'email',
    header: (props) => <UserCustomHeader tableProps={props} title='EMAIL' className='min-w-15px' />,
    cell: (props) => {
      const value = props.getValue();
      return value.email;
    },
  }),

  columnHelper.accessor('roles', {
    id: 'roles',
    enableSorting: false,
    header: (props) => <UserCustomHeader tableProps={props} title='Role(s)' className='min-w-250px' />,
    cell: (props) => <UserRolesCell roles={props.getValue()} />,
  }),

  columnHelper.accessor('isActive', {
    header: (props) => <UserCustomHeader tableProps={props} localizedKey='FIELDS.ACTIVE' />,
    cell: (props) => <UserIsActiveCell isActive={props.getValue()} />,
  }),

  columnHelper.accessor((row) => ({ createdBy: row.createdBy, createdAt: row.createdAt }), {
    id: 'createdAt',
    header: (props) => (
      <UserCustomHeader tableProps={props} localizedKey='FIELDS.CREATION' className='min-w-200px' />
    ),
    cell: (props) => {
      const value = props.getValue();
      return <UserCreationCell createdBy={value.createdBy} createdAt={value.createdAt} />;
    },
  }),

  // columnHelper.display({
  //     id: 'actions',
  //     header: (props) => (
  //       <UserCustomHeader
  //         tableProps={props}
  //         localizedKey='GENERAL.ACTION'
  //         className='min-w-150px text-end'
  //       />
  //     ),
  //     cell: (props) => <UserActionsCell id={props.row.original.id} />,
  //   }),
];

export { usersColumns };
