import { FC, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { defaultOptionForReactSelectBox, InfoToolTip, KTSVG, QUERIES, showToast } from '../../../../../_metronic/helpers';
import { User, UserRequest } from '../core/_models';
import { updateUser } from '../core/_requests';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ReactSelect from 'react-select'
import { useQueryResponse } from '../core/QueryResponseProvider';


type Props = {
  user: User;
};

const editUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First Name is required'),
  isActive: Yup.bool()
});

const UserEditForm: FC<Props> = ({ user }) => {


  const [editUser] = useState<UserRequest >({
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    isActive: user.isActive,
    email: user.email,
    picture: user.picture,
    phone: user.phone,
    picturePath: user.icon
  });

  const navigate = useNavigate();

  const backToUsersList = () => {
    navigate('/user-management/users');
  };

  const [uploadedIcon, setUploadedIcon] = useState('');
  const [iconRemoved, setIconRemoved] = useState(false);

  const getIconImage = () => {
    let image = `/media/svg/avatars/blank.svg`;
    if (uploadedIcon) {
      image = uploadedIcon;
    } else if (user.picture && !iconRemoved) {
      image = `${process.env.REACT_APP_PUBLIC_URL}/Pictures/${user.picture}`;
    }

    return `url("${image}")`;
  };


  const onIconImageUpload = (event: any) => {
    setUploadedIcon(URL.createObjectURL(event.target.files[0]));
    formik.setFieldValue('picture', event.currentTarget.files[0]);
  };

  const onIconImageRemove = () => {
    setUploadedIcon('');
    setIconRemoved(true);
    formik.setFieldValue('picture', null);
  };

  const queryClient = useQueryClient();
  const { query } = useQueryResponse();

  const formik = useFormik({
    initialValues: editUser,
    validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        values = {
          ...values,
          picturePath: iconRemoved ? '' : values.picture?.toString(),
        };


        const formData = new FormData();
        // formData.append('password', 'Admin@123')

        values.userId && formData.append('userId', values.userId)
        values.firstName && formData.append('firstName', values.firstName);
        values.lastName && formData.append('lastName', values.lastName);
        values.email && formData.append('email', values.email);
        values.picture && formData.append('picture', values.picture);
        values.picturePath && formData.append('picturePath', values.picturePath);
        values.phone && formData.append('phoneNumber', values.phone);
     

        await updateUser(user.id, formData);
        queryClient.invalidateQueries({ queryKey: [QUERIES.USERS, query] });
        queryClient.invalidateQueries({ queryKey: [QUERIES.USERS] });

        showToast('success', 'User Updated Successfully');
        backToUsersList();
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



  return (
    <>
      <form className='form' onSubmit={formik.handleSubmit} noValidate>
        <div className='card-header'>
          <div className='card-title'>
            <h2>Edit User</h2>
          </div>
          <div className='card-toolbar'>
            <div className='d-flex justify-content-end'>
              <button
                type='button'
                className='btn btn-sm btn-secondary btn-flex text-dark fw-bold me-2'
                disabled={formik.isSubmitting}
                onClick={backToUsersList}
              >
                <KTSVG
                  path='/media/icons/duotune/arrows/arr002.svg'
                  className='svg-icon-3 svg-icon-dark me-1'
                />
                Back
              </button>

              <button
                type='submit'
                className='btn btn-primary btn-sm'
                disabled={formik.isSubmitting}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className='card-body'>
          <div className='row'>
            <div className='col-lg-6 mb-3'>
              <label className='form-label'>
                User ID
                <InfoToolTip tooltipContent='User ID of the User' />
              </label>
              <input
                {...formik.getFieldProps('userId')}
                type='text'
                name='userId'
                readOnly={true}
                placeholder='User ID'
                className={clsx(
                  'form-control',
                  { 'is-invalid': formik.touched.userId && formik.errors.userId },
                  {
                    'is-valid': formik.touched.userId && !formik.errors.userId,
                  }
                )}
              />
              {formik.touched.userId && formik.errors.userId && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.userId}</span>
                  </div>
                </div>
              )}
            </div>

            <div className='col-lg-6 mb-3'>
              <label className='form-label'>
                Email
                <InfoToolTip tooltipContent='Email of the User' />
              </label>
              <input
                {...formik.getFieldProps('email')}
                type='text'
                name='email'
                placeholder='Email'
                readOnly={true}
                className={clsx(
                  'form-control',
                  { 'is-invalid': formik.touched.email && formik.errors.email },
                  {
                    'is-valid': formik.touched.email && !formik.errors.email,
                  }
                )}
              />
              {formik.touched.email && formik.errors.email && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.email}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-6 mb-3'>
              <label className='form-label'>
                First Name
                <span className='required'></span>
                <InfoToolTip tooltipContent='First Name of the User' />
              </label>
              <input
                {...formik.getFieldProps('firstName')}
                type='text'
                name='firstName'
                placeholder='First Name'
                className={clsx(
                  'form-control',
                  { 'is-invalid': formik.touched.firstName && formik.errors.firstName },
                  {
                    'is-valid': formik.touched.firstName && !formik.errors.firstName,
                  }
                )}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.firstName}</span>
                  </div>
                </div>
              )}
            </div>

            <div className='col-lg-6 mb-3'>
              <label className='form-label'>
                Last Name
                <span className='required'></span>
                <InfoToolTip tooltipContent='Last Name of the User' />
              </label>
              <input
                {...formik.getFieldProps('lastName')}
                type='text'
                name='lastName'
                placeholder='Last Name'
                className={clsx(
                  'form-control',
                  { 'is-invalid': formik.touched.lastName && formik.errors.lastName },
                  {
                    'is-valid': formik.touched.lastName && !formik.errors.lastName,
                  }
                )}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.lastName}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

      
          <div className='row'>
            <div className='col-lg-12 mb-3'>
              <label className='d-block form-label fw-bold'>Picture</label>
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
                  data-tooltip-id='my-tooltip'
                  data-tooltip-place='right'
                  data-tooltip-content='Change Icon'
                >
                  <i className='fa-solid fa-pencil text-primary fs-7 p-0'></i>

                  <input
                    type='file'
                    name='avatar'
                    accept='.png, .jpg, .jpeg'
                    onChange={(e) => {
                      if (e.currentTarget && e.currentTarget.files) {
                        onIconImageUpload(e);
                      }
                    }}
                  />
                </label>
                {/* end::Label */}

                {/* begin::Remove */}
                {!iconRemoved && (
                  <span
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-tooltip-id='my-tooltip'
                    data-tooltip-place='right'
                    data-tooltip-content='Remove Icon'
                    onClick={() => {
                      onIconImageRemove();
                    }}
                  >
                    <i className='fa-solid fa-xmark text-danger fs-6 p-0'></i>
                  </span>
                )}
                {/* end::Remove */}

                {/* begin::Redo */}
                {iconRemoved && (
                  <span
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='cancel'
                    data-tooltip-id='my-tooltip'
                    data-tooltip-place='right'
                    data-tooltip-content='Redo Uploaded Icon'
                    onClick={() => setIconRemoved(false)}
                  >
                    <i className='fa-solid fa-arrow-rotate-left text-dark fs-6 p-0'></i>
                  </span>
                )}
                {/* end::Redo */}
              </div>
            </div>
          </div>



          <div className='fv-row'>
            <label className='form-label fw-bold text-dark'>Active</label>

            <label className='form-check form-switch form-check-custom form-check-solid'>
              <input
                {...formik.getFieldProps('isAllowLogin')}
                type='checkbox'
                name='isAllowLogin'
                className='form-check-input h-25px w-45px'
                checked={formik.values.isActive}
              />
            </label>
          </div>
        </div>
      </form >
    </>
  );
};

export { UserEditForm };
