import React, { useEffect, useState } from 'react'
import { StepProps } from '../_steps'
import { Field, Form, Formik, useFormik } from 'formik'
import { defaultOptionForReactSelectBox, InfoToolTip, KTCard, KTCardBody, prependDefaultOption, QUERIES, showToast } from '../../../../../../../_metronic/helpers'
import clsx from 'clsx'
import * as Yup from 'yup'
import { useQuery } from '@tanstack/react-query'
import { User } from '../../../core/_models'
import { PhoneInput } from 'react-international-phone'
import ReactSelect from 'react-select'
import { FormattedMessage } from 'react-intl'



const Basic = ({ data, updateData, btnRef, APIData, setData }: StepProps) => {
  const userList = APIData.users;
  const basicSchema = Yup.object().shape({
    userId: Yup.string() // Validate userId
      .required('User ID is required')
      .nullable()
      .test('userId-exists', 'User ID already exists', function (value) {
        const userIdExists = userList && userList.some(user => user.userId === value);
        return value === undefined || !userIdExists; // Return true for valid userId
      }),

    firstName: Yup.string()
      .min(3, 'Minimum 3 characters required')
      .required('First Name is required'),

    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required')
      .test('email-exists', 'Email already exists', function (value) {
        const emailExists = userList && userList.some(user => user.email?.toLowerCase() === value?.toLowerCase());
        return !emailExists; // Return true for valid email
      })
      .test('email-domain', function (value) {
        const { type, contractIds } = this.parent; // Access type and contractIds from the form data
        if (type === 'external' && value) {
          const emailDomain = value.split('@')[1]?.toLowerCase(); // Extract domain from email
          if (contractIds && contractIds.length > 0) {
            const mismatchedDomains = contractIds
              .filter(
                (contract: any) =>
                  contract.companyDomainAddress
                    ?.replace(/^https?:\/\//, '') // Remove protocol (http/https) for comparison
                    .toLowerCase() !== emailDomain
              )
              .map((contract: any) => contract.companyDomainAddress?.replace(/^https?:\/\//, ''));

            if (mismatchedDomains.length === contractIds.length) {
              // If all domains mismatch, return false and show an error with the allowed domains
              return this.createError({
                message: `Email domain must match one of the contractor domains: ${mismatchedDomains.join(', ')}`,
              });
            }
          }
        }
        return true; // Skip validation if type is not 'external' or no email provided
      }),

    isActive: Yup.boolean().required('Status is required'),
    phone: Yup.string()
      .matches(/^\+?[0-9]{6,14}$/, 'Invalid phone number format') // Regular expression to match phone number format
  });

  const [uploadedIcon, setUploadedIcon] = useState('');

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
    <Formik
      initialValues={data}
      // validationSchema={basicSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          updateData(values)
        } catch (error) {

        }
      }}
    >
      {({ values, touched, errors, isSubmitting, handleSubmit, setFieldValue }) => {

        return (
          <Form onSubmit={handleSubmit} noValidate autoComplete='off'>
            <div className='row g-2'>

              <div className='col-lg-4'>
                <label className='form-label'>
                  User ID / Employee ID
                  <span className='required'></span>
                  <InfoToolTip tooltipContent='User / Employee ID of the User' />
                </label>
                <Field
                  name='userId'
                  className={clsx(
                    'form-control form-control-sm',
                    { 'is-invalid': touched.userId && errors.userId },
                    {
                      'is-valid': touched.userId && !errors.userId,
                    }
                  )}
                // onChange={(e) => handleUserIdChange(e, setFieldValue)}
                />
                {touched.userId && errors.userId && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{errors.userId}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className='col-lg-4'>
                <label className='form-label'>
                  First Name
                  <span className='required'></span>
                  <InfoToolTip tooltipContent='First Name of the User' />
                </label>
                <Field
                  name='firstName'
                  className={clsx(
                    'form-control form-control-sm',
                    { 'is-invalid': touched.firstName && errors.firstName },
                    {
                      'is-valid': touched.firstName && !errors.firstName,
                    }
                  )}
                />
                {touched.firstName && errors.firstName && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{errors.firstName}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className='col-lg-4'>
                <label className='form-label'>
                  Last Name
                  <InfoToolTip tooltipContent='last Name of the User' />
                </label>
                <Field
                  name='lastName'
                  className={clsx(
                    'form-control form-control-sm',
                    { 'is-invalid': touched.lastName && errors.lastName },
                    {
                      'is-valid': touched.lastName && !errors.lastName,
                    }
                  )}
                />
                {touched.lastName && errors.lastName && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{errors.lastName}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className='col-lg-6'>
                <label className='form-label'>
                  Email
                  <span className='required'></span>
                  <InfoToolTip tooltipContent='Email of the User' />
                </label>
                <Field
                  name='email'
                  className={clsx(
                    'form-control form-control-sm',
                    { 'is-invalid': touched.email && errors.email },
                    {
                      'is-valid': touched.email && !errors.email,
                    }
                  )}
                //   onChange={(e) => handleUserIdChange(e, setFieldValue)}
                />
                {touched.email && errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{errors.email}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className='col-lg-6'>
                <label className='form-label'>
                  Contact Number
                  <span className='required'></span>
                  <InfoToolTip tooltipContent='Contact Number of the User' />
                </label>
                <div
                  className={clsx('form-control p-0 m-0 form-control-sm', {
                    'is-invalid': touched.phone && errors.phone,
                    'is-valid': touched.phone && !errors.phone,
                  })}>
                  <PhoneInput
                    defaultCountry="om"
                    name='phone'
                    value={values.phone}
                    onChange={(phone) => {
                      setFieldValue('phone', phone); // Update phone number directly in formik state
                    }}
                    className='d-flex form-control m-0 p-0 form-control-sm border-0'
                    inputStyle={{
                      border: 'none',
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}

                    inputProps={{
                      className: clsx('form-control p-0 m-0 form-control-sm border-0', {
                        'is-invalid': touched.phone && errors.phone,
                        'is-valid': touched.phone && !errors.phone,
                      }),
                    }}
                  />
                </div>

                {touched.phone && errors.phone && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{errors.phone}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className='col-md-12'>
                <label className='d-block form-label'>
                  Upload Picture
                  <InfoToolTip tooltipContent='Profile Picture of the User' />
                </label>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div
                    className='image-input-wrapper w-125px h-125px'
                    style={{ backgroundImage: getIconImage(), marginLeft: '10px' }}
                  ></div>
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
                      accept='.png, .jpg, .jpeg, .svg'
                      onChange={(e) => {
                        if (e.currentTarget && e.currentTarget.files) {
                          onIconImageUpload(e);
                          setFieldValue('picture', e.currentTarget.files[0]);
                        }
                      }}
                    />
                  </label>
                  <span
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    onClick={() => {
                      onIconImageRemove();
                      setFieldValue('picture', null);
                    }}
                  >
                    <i className='fa-solid fa-xmark text-danger fs-6 p-0'></i>
                  </span>
                </div>

                <div className='form-text'>Allowed file types: png, jpg, jpeg, svg.</div>
              </div>

              <div className='col-md-1'>
                <label className='form-label'>
                  <FormattedMessage id='FIELDS.ACTIVE' />
                </label>
                <div className='form-check form-switch form-check-custom form-check-solid'>
                  <input
                    name='Active'
                    type='checkbox'
                    className='form-check-input h-25px 2-25px'
                    onChange={() => setFieldValue('isActive', !values.isActive)}  // Toggle the value on change
                    checked={values.isActive}
                  />
                </div>
              </div>

              <div className='col-12'>
                <button type='submit' className='d-none' ref={btnRef}></button>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export { Basic }