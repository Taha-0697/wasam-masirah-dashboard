import { FC } from 'react';

type Props = {
  name: string;
  description?: string;
};

const PageNameCell: FC<Props> = ({ name, description }) => {
  
  return (
    <div className='d-flex align-items-center'>
 
      <div className='d-flex flex-column'>
        <div>{name}</div>
        <div className='fw-bold'>{description}</div>
      </div>
    </div>
  );
};

export { PageNameCell };
