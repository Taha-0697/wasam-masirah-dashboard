import { createColumnHelper } from '@tanstack/react-table';
import { Page } from '../../../../core/_models';
import { PageCustomHeader } from './PageCustomHeader';
import { PageSerialNumberCell } from './PageSerialNumberCell';
import { PageNameCell } from './PageNameCell';
import { PageIsActiveCell } from './PageIsActiveCell';
import { PageCreationCell } from './PageCreationCell';
import { PageActionsCell } from './PageActionsCell';


const columnHelper = createColumnHelper<Page>();

const PageColumns = [
  columnHelper.display({
    id: 'serial number',
    header: (props) => <PageCustomHeader tableProps={props} title='#' />,
    cell: (props) => <PageSerialNumberCell rowIndex={props.row.index} />,
  }),

  columnHelper.accessor(
    (row) => ({ name: row.name, description: row.description, parentId: row.parentId }),
    {
      id: 'name',
      header: (props) => (
        <PageCustomHeader
          tableProps={props}
          localizedKey='FIELDS.NAME'
          className='min-w-200px'
        />
      ),
      cell: (props) => {
        const value = props.getValue();

        // Render as a regular Page
        return (
          <PageNameCell name={value.name} description={value.description} />
        );
      },
    }),



  columnHelper.accessor('parentId', {
    header: (props) => <PageCustomHeader tableProps={props} localizedKey='FIELDS.PARENT' />,
    cell: (props) => <div>{props.getValue()}</div>,
  }),


  columnHelper.accessor('isActive', {
    header: (props) => <PageCustomHeader tableProps={props} localizedKey='FIELDS.ACTIVE' />,
    cell: (props) => <PageIsActiveCell isActive={props.getValue()} />,
  }),

  columnHelper.accessor((row) => ({ createdBy: row.createdBy, createdAt: row.createdAt }), {
    id: 'createdAt',
    header: (props) => (
      <PageCustomHeader
        tableProps={props}
        localizedKey='FIELDS.CREATION'
        className='min-w-200px'
      />
    ),
    cell: (props) => {
      const value = props.getValue();

      return <PageCreationCell createdBy={value.createdBy} createdAt={value.createdAt} />;
    },
  }),

  // columnHelper.display({
  //   id: 'actions',
  //   header: (props) => (
  //     <PageCustomHeader
  //       tableProps={props}
  //       localizedKey='GENERAL.ACTION'
  //       className='min-w-150px text-end'
  //     />
  //   ),
  //   cell: (props) => <PageActionsCell id={props.row.original.id} />,
  // }),
];

export { PageColumns };
