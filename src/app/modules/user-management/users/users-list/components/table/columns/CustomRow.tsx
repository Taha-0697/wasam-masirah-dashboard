import { FC } from 'react';
import { Row, flexRender } from '@tanstack/react-table';
import clsx from 'clsx';
import { User } from '../../../../core/_models';

type Props = {
  row: Row<User>;
};

const CustomRow: FC<Props> = ({ row }) => (
  <tr>
    {row.getVisibleCells().map((cell) => (
      <td
        key={cell.id}
        className={clsx({
          'text-end min-w-150px': cell.column.id === 'actions',
        })}
      >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </td>
    ))}
  </tr>
);

export { CustomRow };
