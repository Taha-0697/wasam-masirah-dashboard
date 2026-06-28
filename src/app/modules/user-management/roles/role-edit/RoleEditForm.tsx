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
import { Role, RoleRequest } from '../core/_models';
import { updateRole } from '../core/_requests';

type Props = {
  role: Role;
};

const editRoleSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
  description: Yup.string().min(3, 'Minimum 3 symbols').max(500, 'Maximum 500 symbols'),
  isActive: Yup.bool(),
});

const RoleEditForm: FC<Props> = ({ role }) => {
  const [editRole] = useState<RoleRequest>({
    name: role.name,
    description: role.description || '',
    isActive: role.isActive,
    permissions: [],
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { query } = useQueryResponse();

  const formik = useFormik({
    initialValues: editRole,
    validationSchema: editRoleSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await updateRole(role.id, values);
        queryClient.invalidateQueries({ queryKey: [QUERIES.ROLES, query] });

        backToRolesList();
        showToast('success', 'Role Updated Successfully');
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

  const backToRolesList = () => {
    navigate('/user-management/roles');
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate autoComplete='off'>
      <div className='card-header'>
        <div className='card-title'>
          <h3>
            <FormattedMessage id='ACTIONS.EDIT' /> <FormattedMessage id='PAGES.ROLE' />
          </h3>
        </div>
        <div className='card-toolbar'>
          <button
            type='button'
            className='btn btn-sm btn-secondary me-2'
            disabled={formik.isSubmitting}
            onClick={backToRolesList}
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
          <div className='col-md-12'>
            {/* begin::Label */}
            <label className='form-label'>
              <FormattedMessage id='FIELDS.NAME' />
              <span className='required'></span>
              <InfoToolTip tooltipContent='Name of the Role' />
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

          {/* begin::Input group::Description */}
          <div className='col-md-12'>
            {/* begin::Label */}
            <label className='form-label'>
              <FormattedMessage id='FIELDS.DESCRIPTION' />
              <InfoToolTip tooltipContent='Description of the Role' />
            </label>
            {/* end::Label */}
            {/* begin::Input Field */}
            <textarea
              {...formik.getFieldProps('description')}
              className={clsx(
                'form-control form-control-sm',
                { 'is-invalid': formik.touched.description && formik.errors.description },
                {
                  'is-valid': formik.touched.description && !formik.errors.description,
                }
              )}
            />
            {formik.touched.description && formik.errors.description && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.description}</span>
                </div>
              </div>
            )}
            {/* end::Input Field */}
          </div>
          {/* end::Input group::Description */}

          {/* begin::Input group::IsActive */}
          <div className='col-md-12'>
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
        </div>
      </KTCardBody>
    </form>
  );
};

export { RoleEditForm };
