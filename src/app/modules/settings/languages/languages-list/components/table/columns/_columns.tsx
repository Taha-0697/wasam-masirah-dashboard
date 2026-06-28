import { createColumnHelper } from '@tanstack/react-table';
import { Language } from '../../../../core/_models';
import { LanguageCustomHeader } from './LanguageCustomHeader';
import { LanguageSerialNumberCell } from './LanguageSerialNumberCell';
import { LanguageNameCell } from './LanguageNameCell';
import { LanguageIsActiveCell } from './LanguageIsActiveCell';
import { LanguageIsDefaultCell } from './LanguageIsDefaultCell';
import { LanguageCreationCell } from './LanguageCreationCell';
import { LanguageActionsCell } from './LanguageActionsCell';

const columnHelper = createColumnHelper<Language>();

const languagesColumns = [
  columnHelper.display({
    id: 'serial number',
    header: (props) => <LanguageCustomHeader tableProps={props} title='#' />,
    cell: (props) => <LanguageSerialNumberCell rowIndex={props.row.index} />,
  }),
  columnHelper.accessor(
    (row) => ({ name: row.name, abbreviation: row.abbreviation, icon: row.icon }),
    {
      id: 'name',
      header: (props) => (
        <LanguageCustomHeader
          tableProps={props}
          localizedKey='FIELDS.NAME'
          className='min-w-200px'
        />
      ),
      cell: (props) => {
        const value = props.getValue();

        return (
          <LanguageNameCell name={value.name} abbreviation={value.abbreviation} icon={value.icon} />
        );
      },
    }
  ),
  columnHelper.accessor('direction', {
    header: (props) => <LanguageCustomHeader tableProps={props} localizedKey='FIELDS.DIRECTION' />,
  }),
  columnHelper.accessor('isDefault', {
    header: (props) => <LanguageCustomHeader tableProps={props} localizedKey='FIELDS.DEFAULT' />,
    cell: (props) => <LanguageIsDefaultCell isDefault={props.getValue()} />,
  }),
  columnHelper.accessor('isActive', {
    header: (props) => <LanguageCustomHeader tableProps={props} localizedKey='FIELDS.ACTIVE' />,
    cell: (props) => <LanguageIsActiveCell isActive={props.getValue()} />,
  }),
  columnHelper.accessor((row) => ({ createdBy: row.createdBy, createdAt: row.createdAt }), {
    id: 'createdAt',
    header: (props) => (
      <LanguageCustomHeader
        tableProps={props}
        localizedKey='FIELDS.CREATION'
        className='min-w-200px'
      />
    ),
    cell: (props) => {
      const value = props.getValue();

      return <LanguageCreationCell createdBy={value.createdBy} createdAt={value.createdAt} />;
    },
  }),
  // columnHelper.display({
  //   id: 'actions',
  //   header: (props) => (
  //     <LanguageCustomHeader
  //       tableProps={props}
  //       localizedKey='GENERAL.ACTION'
  //       className='min-w-150px text-end'
  //     />
  //   ),
  //   cell: (props) => <LanguageActionsCell id={props.row.original.id} />,
  // }),
];

export { languagesColumns };
