import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { FormattedMessage } from 'react-intl';
import { useFormik } from 'formik';
import axios from 'axios';
import clsx from 'clsx';
import * as Yup from 'yup';
import { KTCardBody, QUERIES, InfoToolTip, showToast } from '../../../../../_metronic/helpers';
import { useQueryResponse } from '../core/QueryResponseProvider';
import { LanguageRequest } from '../core/_models';
import { createLanguage } from '../core/_requests';

type Props = {
  language: LanguageRequest;
};

const newLanguageSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
  abbreviation: Yup.string()
    .min(1, 'Minimum 1 symbol')
    .max(10, 'Maximum 10 symbols')
    .required('Abbreviation is required'),
  direction: Yup.string().required('Abbreviation is required'),
  isDefault: Yup.bool(),
  isActive: Yup.bool(),
  localizedMessages: Yup.string().required('Localized Messages is required'),
});

const LanguageNewForm: FC<Props> = ({ language }) => {
  const [newLanguage] = useState<LanguageRequest>({
    name: language.name,
    abbreviation: language.abbreviation,
    direction: language.direction,
    uploadedIconFile: language.uploadedIconFile,
    localizedMessages: language.localizedMessages,
    isDefault: language.isDefault,
    isActive: language.isActive,
  });
  const [uploadedIcon, setUploadedIcon] = useState('');

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { query } = useQueryResponse();

  const formik = useFormik({
    initialValues: newLanguage,
    validationSchema: newLanguageSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await createLanguage(values);
        queryClient.invalidateQueries({ queryKey: [QUERIES.LANGUAGES, query] });
        queryClient.invalidateQueries({ queryKey: [QUERIES.LANGUAGES] });

        backToLanguagesList();
        showToast('success', 'Language Added Successfully');
      } catch (error) {
        if (axios.isAxiosError(error)) {
        }
        console.error(error);
        showToast('error', 'Some Error Occured');
      } finally {
        setSubmitting(true);
      }
    },
  });

  const backToLanguagesList = () => {
    navigate('/settings/languages');
  };

  const getIconImage = () => {
    let image = `/media/svg/avatars/blank.svg`;
    if (uploadedIcon) {
      image = uploadedIcon;
    }

    return `url("${image}")`;
  };

  const onIconImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedIcon(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onIconImageRemove = () => {
    setUploadedIcon('');
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate autoComplete='off'>
      <div className='card-header'>
        <div className='card-title'>
          <h3>
            <FormattedMessage id='ACTIONS.NEW' /> <FormattedMessage id='PAGES.LANGUAGE' />
          </h3>
        </div>
        <div className='card-toolbar'>
          <button
            type='button'
            className='btn btn-sm btn-secondary me-2'
            disabled={formik.isSubmitting}
            onClick={backToLanguagesList}
          >
            <FormattedMessage id='ACTIONS.BACK' />
          </button>

          <button type='submit' className='btn btn-sm btn-primary' disabled={formik.isSubmitting}>
            <FormattedMessage id='ACTIONS.SUBMIT' />
            {formik.isSubmitting && (
              <span
                className='spinner-border spinner-border-sm ms-1'
                role='status'
                aria-hidden='true'
              ></span>
            )}
          </button>
        </div>
      </div>
      <KTCardBody>
        <div className='row g-2'>
          {/* begin::Input group::Name */}
          <div className='col-md-4'>
            {/* begin::Label */}
            <label className='form-label'>
              <FormattedMessage id='FIELDS.NAME' />
              <span className='required'></span>
              <InfoToolTip tooltipContent='Name of the Language' />
            </label>
            {/* end::Label */}
            {/* begin::Input Field */}
            <input
              {...formik.getFieldProps('name')}
              className={clsx(
                'form-control form-control-sm',
                { 'is-invalid': formik.touched.name && formik.errors.name },
                {
                  'is-valid': formik.touched.name && !formik.errors.name,
                }
              )}
            />
            {formik.touched.name && formik.errors.name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.name}</span>
                </div>
              </div>
            )}
            {/* end::Input Field */}
          </div>
          {/* end::Input group::Name */}

          {/* begin::Input group::Abbreviation */}
          <div className='col-md-4'>
            {/* begin::Label */}
            <label className='form-label'>
              <FormattedMessage id='FIELDS.ABBREVIATION' />
              <span className='required'></span>
              <InfoToolTip tooltipContent='Abbreviation of the Language' />
            </label>
            {/* end::Label */}
            {/* begin::Input Field */}
            <input
              {...formik.getFieldProps('abbreviation')}
              className={clsx(
                'form-control form-control-sm',
                { 'is-invalid': formik.touched.abbreviation && formik.errors.abbreviation },
                {
                  'is-valid': formik.touched.abbreviation && !formik.errors.abbreviation,
                }
              )}
            />
            {formik.touched.abbreviation && formik.errors.abbreviation && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.abbreviation}</span>
                </div>
              </div>
            )}
            {/* end::Input Field */}
          </div>
          {/* end::Input group::Abbreviation */}

          {/* begin::Input group::Direction */}
          <div className='col-md-4'>
            {/* begin::Label */}
            <label className='form-label'>
              <FormattedMessage id='FIELDS.DIRECTION' />
              <span className='required'></span>
              <InfoToolTip tooltipContent='Direction of the Language' />
            </label>
            {/* end::Label */}
            {/* begin::Input Field */}
            <select
              {...formik.getFieldProps('direction')}
              className={clsx(
                'form-select form-select-sm',
                { 'is-invalid': formik.touched.direction && formik.errors.direction },
                {
                  'is-valid': formik.touched.direction && !formik.errors.direction,
                }
              )}
            >
              <option value='ltr'>Left To Right (LTR)</option>
              <option value='rtl'>Right To Left (RTL)</option>
            </select>
            {formik.touched.direction && formik.errors.direction && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.direction}</span>
                </div>
              </div>
            )}
            {/* end::Input Field */}
          </div>
          {/* end::Input group::Direction */}

          {/* begin::Input group::Icon */}
          <div className='col-md-12'>
            {/* begin::Label */}
            <label className='d-block form-label'>
              <FormattedMessage id='FIELDS.ICON' />
              <InfoToolTip tooltipContent='Icon of the Language' />
            </label>
            {/* end::Label */}

            {/* begin::Image input */}
            <div className='image-input image-input-outline' data-kt-image-input='true'>
              {/* begin::Preview existing icon */}
              <div
                className='image-input-wrapper w-125px h-125px'
                style={{ backgroundImage: getIconImage() }}
              ></div>
              {/* end::Preview existing icon */}

              {/* begin::Label */}
              <label
                className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='change'
                data-bs-toggle='tooltip'
                title='Change avatar'
              >
                <i className='fa-solid fa-pencil text-primary fs-7 p-0'></i>

                <input
                  type='file'
                  name='avatar'
                  accept='.png, .jpg, .jpeg'
                  onChange={(e) => {
                    if (e.currentTarget && e.currentTarget.files) {
                      onIconImageUpload(e);
                      formik.setFieldValue('uploadedIconFile', e.currentTarget.files[0]);
                    }
                  }}
                />
              </label>
              {/* end::Label */}

              {/* begin::Remove */}
              <span
                className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='remove'
                data-bs-toggle='tooltip'
                title='Remove avatar'
                onClick={() => {
                  onIconImageRemove();
                  formik.setFieldValue('uploadedIconFile', null);
                }}
              >
                <i className='fa-solid fa-xmark text-danger fs-6 p-0'></i>
              </span>
              {/* end::Remove */}
            </div>
            {/* end::Image input */}

            {/* begin::Hint */}
            <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
            {/* end::Hint */}
          </div>
          {/* end::Input group::Icon */}

          {/* begin::Input group::IsDefault */}
          <div className='col-md-1'>
            {/* begin::Label */}
            <label className='form-label'>
              <FormattedMessage id='FIELDS.DEFAULT' />
            </label>
            {/* end::Label */}
            {/* begin::Input Field */}
            <div className='form-check form-switch form-check-custom form-check-solid'>
              <input
                {...formik.getFieldProps('isDefault')}
                type='checkbox'
                className='form-check-input h-25px 2-25px'
                checked={formik.values.isDefault}
              />
            </div>
            {/* end::Input Field */}
          </div>
          {/* end::Input group::IsDefault */}

          {/* begin::Input group::IsActive */}
          <div className='col-md-1'>
            {/* begin::Label */}
            <label className='form-label'>
              <FormattedMessage id='FIELDS.ACTIVE' />
            </label>
            {/* end::Label */}
            {/* begin::Input Field */}
            <div className='form-check form-switch form-check-custom form-check-solid'>
              <input
                {...formik.getFieldProps('isActive')}
                type='checkbox'
                className='form-check-input h-25px 2-25px'
                checked={formik.values.isActive}
              />
            </div>
            {/* end::Input Field */}
          </div>
          {/* end::Input group::IsActive */}

          {/* begin::Input group::Localized Messages */}
          <div className='col-md-12'>
            {/* begin::Label */}
            <label className='form-label'>
              <FormattedMessage id='FIELDS.LOCALIZEDMESSAGES' />
              <InfoToolTip tooltipContent='Localized of the Language' />
            </label>
            {/* end::Label */}
            {/* begin::Input Field */}
            <textarea
              {...formik.getFieldProps('localizedMessages')}
              rows={20}
              className={clsx(
                'form-control form-control-sm',
                {
                  'is-invalid': formik.touched.localizedMessages && formik.errors.localizedMessages,
                },
                {
                  'is-valid': formik.touched.localizedMessages && !formik.errors.localizedMessages,
                }
              )}
            />
            {formik.touched.localizedMessages && formik.errors.localizedMessages && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.localizedMessages}</span>
                </div>
              </div>
            )}
            {/* end::Input Field */}
          </div>
          {/* end::Input group::Localized Messages */}
        </div>
      </KTCardBody>
    </form>
  );
};

export { LanguageNewForm };
