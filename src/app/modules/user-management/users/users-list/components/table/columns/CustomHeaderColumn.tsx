// @ts-nocheck
import { FC } from 'react';
import { ColumnInstance, flexRender } from '@tanstack/react-table';
import { User } from '../../../../core/_models';

type Props = {
  column: ColumnInstance<User>;
};

const CustomHeaderColumn: FC<Props> = ({ column }) => (
  <>
    {column.isPlaceholder ? null : flexRender(column.column.columnDef.header, column.getContext())}
  </>
);

export { CustomHeaderColumn };
