import { FC, useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { FormattedMessage } from 'react-intl';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { KTCardBody, QUERIES, showToast } from '../../../../../../../_metronic/helpers';
import { Role } from '../../../../roles/core/_models';
import { UserRoleMappingRequest } from '../../../core/_models';
import { createUserRoles } from '../../../core/_requests';
import { useQueryResponse } from '../../../core/QueryResponseProvider';

type Props = {
  userRole: UserRoleMappingRequest;
  roles: Role[];
};

const newRoleMappingSchema = Yup.object().shape({
  roleIds: Yup.array().min(1, 'Select atleast 1 role').required('Select atleast 1 role'),
});

const NewRoleMappingForm: FC<Props> = ({ userRole, roles }) => {
  const { query } = useQueryResponse();

  const [newUserRole] = useState<UserRoleMappingRequest>({
    roleIds: userRole.roleIds,
  });

  const { id } = useParams();
  const userId = Number(id);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: newUserRole,
    validationSchema: newRoleMappingSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await createUserRoles(userId, values);
        queryClient.invalidateQueries({ queryKey: [QUERIES.USERS, userId, QUERIES.ROLES] });
        queryClient.invalidateQueries({ queryKey: [QUERIES.USERS, query] });
        formik.resetForm();

        showToast('success', 'Role Mapped Successfully');
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

  const backToUsersList = () => {
    navigate('/user-management/users');
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate autoComplete='off'>
      <div className='card-header'>
        <div className='card-title'>
          <h3>
            <FormattedMessage id='GENERAL.ASSIGN' /> <FormattedMessage id='PAGES.ROLE' />
          </h3>
        </div>
        <div className='card-toolbar'>
          <button
            type='button'
            className='btn btn-sm btn-secondary me-2'
            disabled={formik.isSubmitting}
            onClick={backToUsersList}
          >
            <FormattedMessage id='ACTIONS.BACK' />
          </button>

          <button
            type='submit'
            className='btn btn-sm btn-primary'
            disabled={formik.isSubmitting || roles.length === 0}
          >
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
          {formik.touched.roleIds && formik.errors.roleIds && (
            <div className='fv-plugins-message-container mt-0'>
              <div className='fv-help-block text-center'>
                <span className='fs-6' role='alert'>
                  {formik.errors.roleIds}
                </span>
              </div>
            </div>
          )}

          {roles.length === 0 && (
            <div className='text-center fs-6 fw-bold'>
              <FormattedMessage id='MESSAGES.NORECORDSFOUND' />
            </div>
          )}

          {roles.map((role, index) => {
            return (
              <Fragment key={role.id}>
                <div className='col-md-12'>
                  <div className='form-check form-check-custom form-check-solid'>
                    {/* begin::Input Field */}
                    <input
                      {...formik.getFieldProps('roleIds')}
                      id={`role-${role.id}`}
                      type='checkbox'
                      value={role.id}
                      className='form-check-input me-3'
                    />
                    {/* end::Input Field */}

                    {/* begin::Label */}
                    <label className='form-check-label' htmlFor={`role-${role.id}`}>
                      <div className='fw-bold'>{role.name}</div>
                      <div>{role.description}</div>
                    </label>
                    {/* end::Label */}
                  </div>
                </div>

                {index !== roles.length - 1 && (
                  <div className='separator separator-dashed my-5'></div>
                )}
              </Fragment>
            );
          })}
        </div>
      </KTCardBody>
    </form>
  );
};

export { NewRoleMappingForm };
