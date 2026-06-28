/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { QUERIES } from '../../../helpers';
import { useLang, setLanguage } from '../../../i18n/Metronici18n';
import { getLanguages } from '../../../../app/modules/settings/languages/core/_requests';

const Languages: FC = () => {
  const lang = useLang();

  const {
    isLoading,
    data: languages,
    error,
  } = useQuery(
    [QUERIES.LANGUAGES],
    () => {
      return getLanguages();
    },
    {
      cacheTime: 1000,
      refetchOnWindowFocus: false,
      onError: (err) => {
        console.error(err);
      },
    }
  );

  const currentLanguage = languages?.find((language) => language.abbreviation === lang);

  const getIconImage = (imagePath?: string) => {
    let image = `/media/svg/avatars/blank.svg`;
    if (imagePath) {
      image = `${process.env.REACT_APP_PUBLIC_URL}/images/${imagePath}`;
    }

    return image;
  };

  return (
    <div
      className='menu-item px-5'
      data-kt-menu-trigger='hover'
      data-kt-menu-placement='left-start'
      data-kt-menu-flip='bottom'
    >
      <a href='#' className='menu-link px-5'>
        <span className='menu-title position-relative'>
          Language
          <span className='fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0'>
            {currentLanguage?.name}{' '}
            <img
              className='w-15px h-15px rounded-1 ms-2'
              src={getIconImage(currentLanguage?.icon)}
              alt='language image'
            />
          </span>
        </span>
      </a>

      <div className='menu-sub menu-sub-dropdown w-175px py-4'>
        {languages?.map((language) => (
          <div
            key={language.id}
            className='menu-item px-3'
            onClick={() => {
              setLanguage(language.abbreviation, language.direction);
            }}
          >
            <a
              className={clsx('menu-link d-flex px-5', {
                active: language.abbreviation === currentLanguage?.abbreviation,
              })}
            >
              <span className='symbol symbol-20px me-4'>
                <img className='rounded-1' src={getIconImage(language.icon)} alt='language image' />
              </span>
              {language.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Languages };
