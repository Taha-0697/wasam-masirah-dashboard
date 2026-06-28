import { FC } from 'react';

type Props = {
  name: string;
  abbreviation: string;
  icon?: string;
};

const LanguageNameCell: FC<Props> = ({ name, abbreviation, icon }) => {
  let iconURL = '/media/svg/avatars/blank.svg'; // placeholder image url
  if (icon) iconURL = `${process.env.REACT_APP_PUBLIC_URL}/images/${icon}`;

  return (
    <div className='d-flex align-items-center'>
      {/* begin::Icon */}
      <div className='symbol symbol-35px overflow-hidden me-3'>
        <div className='symbol-label'>
          <img src={iconURL} alt='langauge icon' className='w-100' />
        </div>
      </div>
      {/* end::Icon */}

      {/* begin::Name */}
      <div className='d-flex flex-column'>
        <div>{name}</div>
        <div className='fw-bold'>{abbreviation}</div>
      </div>
      {/* end::Name */}
    </div>
  );
};

export { LanguageNameCell };
