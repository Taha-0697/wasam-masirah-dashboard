import { FC } from 'react';

type Props = {
  firstName: string;
  lastName: string;
  image?: string;
};

const UserFullNameCell: FC<Props> = ({ firstName, lastName, image }) => {
  let imageURL = '/media/svg/avatars/blank.svg'; // placeholder image url
  if (image) imageURL = `${process.env.REACT_APP_PUBLIC_URL}/Pictures/${image}`;

  return (
    <div className='d-flex align-items-center'>
      {/* begin::Image */}
      <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
        <div className='symbol-label'>
          <img src={imageURL} alt='user' className='w-100' />
        </div>
      </div>
      {/* end::Image */}

      {/* begin::Name */}
      <div className='d-flex flex-column'>
        <div className='text-dark'>
          {firstName} {lastName}
        </div>
      </div>
      {/* end::Name */}
    </div>
  );
};

export { UserFullNameCell };
