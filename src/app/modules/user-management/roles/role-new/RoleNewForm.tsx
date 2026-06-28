import { FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { FormattedMessage } from 'react-intl';
import { useFormik } from 'formik';
import axios from 'axios';
import clsx from 'clsx';
import * as Yup from 'yup';
import {
  KTCardBody,
  QUERIES,
  InfoToolTip,
  showToast,
  SYSTEM_PERMISSIONS,
  SystemAction,
  SystemPage,
} from '../../../../../_metronic/helpers';
import { useQueryResponse } from '../core/QueryResponseProvider';
import { RoleRequest, PermissionRequest } from '../core/_models';
import { createRole } from '../core/_requests';

type Props = {
  role: RoleRequest;
};

const newRoleSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
  description: Yup.string().min(3, 'Minimum 3 symbols').max(500, 'Maximum 500 symbols'),
  permissions: Yup.array().min(1, 'Permission is required').required('Permission is required'),
  isActive: Yup.bool(),
});

const RoleNewForm: FC<Props> = ({ role }) => {
  const [newRole] = useState<RoleRequest>({
    name: role.name,
    description: role.description,
    isActive: role.isActive,
    permissions: role.permissions,
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { query } = useQueryResponse();

  const formik = useFormik({
    initialValues: newRole,
    validationSchema: newRoleSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await createRole(values);
        queryClient.invalidateQueries({ queryKey: [QUERIES.ROLES, query] });

        backToRolesList();
        showToast('success', 'Role Added Successfully');
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

  // const handleActionChange = (page: SystemPage, action: SystemAction, isActionChecked: boolean) => {
  //   let checkedPermissions = [...formik.values.permissions];
  //   const permissionIndex = checkedPermissions.findIndex((permission) => permission.page === page);
  //   if (permissionIndex !== -1) {
  //     const permission = { ...checkedPermissions[permissionIndex] };

  //     if (isActionChecked) {
  //       permission.actions = [...permission.actions, action];
  //     } else {
  //       permission.actions = permission.actions.filter((a) => a !== action);
  //     }

  //     if (permission.actions.length === 0) {
  //       // if there are no actions checked for the respective page then it removes the page object from array.
  //       checkedPermissions = checkedPermissions.filter((permission) => permission.page !== page);
  //     } else {
  //       checkedPermissions[permissionIndex] = permission;
  //     }
  //   } else {
  //     const permission: PermissionRequest = {
  //       page,
  //       actions: [],
  //     };

  //     if (action !== SystemAction.VIEW) {
  //       //if action other than View is checked, it always add the View action first than the checked action
  //       //because to perform any action on a page you should have to display it first.
  //       permission.actions = [SystemAction.VIEW, action];
  //     } else {
  //       permission.actions = [action];
  //     }

  //     checkedPermissions.push(permission);
  //   }

  //   formik.setFieldValue('permissions', checkedPermissions);
  // };
  const handleActionChange = (page: SystemPage, action: SystemAction, isActionChecked: boolean) => {
    let checkedPermissions = [...formik.values.permissions];

    const permissionIndex = checkedPermissions.findIndex((permission) => permission.page === page);

    const existingPermission = permissionIndex !== -1 ? checkedPermissions[permissionIndex] : null;

    const existingActions = existingPermission?.actions || [];

    // ❗ RULE 1: Prevent unchecking VIEW if other actions exist
    if (
      action === SystemAction.VIEW &&
      !isActionChecked &&
      existingActions.some((a) => a !== SystemAction.VIEW)
    ) {
      return; // block unchecking VIEW
    }

    if (permissionIndex !== -1) {
      const permission = { ...checkedPermissions[permissionIndex] };

      if (isActionChecked) {
        // add action
        permission.actions = [...permission.actions, action];

        // ensure VIEW is auto-added if any other action is selected
        if (action !== SystemAction.VIEW && !permission.actions.includes(SystemAction.VIEW)) {
          permission.actions = [SystemAction.VIEW, ...permission.actions];
        }
      } else {
        // remove action
        permission.actions = permission.actions.filter((a) => a !== action);

        // if VIEW is removed OR only VIEW left → handle cleanup
        if (permission.actions.length === 0) {
          checkedPermissions = checkedPermissions.filter((p) => p.page !== page);
        }
      }

      checkedPermissions[permissionIndex] = permission;
    } else {
      // create new permission
      const permission: PermissionRequest = {
        page,
        actions: action !== SystemAction.VIEW ? [SystemAction.VIEW, action] : [SystemAction.VIEW],
      };

      checkedPermissions.push(permission);
    }

    formik.setFieldValue('permissions', checkedPermissions);
  };

  const handleIsActionChecked = (page: SystemPage, action: SystemAction): boolean => {
    const permission = formik.values.permissions.find((permission) => permission.page === page);

    if (!permission) return false;

    return permission.actions.includes(action);
  };

  const handleSelectAllActions = (isActionChecked: boolean) => {
    let allPermissions: PermissionRequest[] = [];
    if (isActionChecked) {
      allPermissions = SYSTEM_PERMISSIONS.map((permission) => ({
        page: permission.page,
        actions: permission.actions.map((action) => action.action),
      }));
    }

    formik.setFieldValue('permissions', allPermissions);
  };

  const backToRolesList = () => {
    navigate('/user-management/roles');
  };

  const isAllSelected = useMemo(() => {
    const all = SYSTEM_PERMISSIONS.flatMap((p) => p.actions.map((a) => `${p.page}-${a.action}`));

    const selected = formik.values.permissions.flatMap((p) =>
      p.actions.map((a) => `${p.page}-${a}`)
    );

    return all.length > 0 && all.every((x) => selected.includes(x));
  }, [formik.values.permissions]);

  return (
    <form onSubmit={formik.handleSubmit} noValidate autoComplete='off'>
      <div className='card-header'>
        <div className='card-title'>
          <h3>
            <FormattedMessage id='ACTIONS.NEW' /> <FormattedMessage id='PAGES.ROLE' />
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

          {/* begin::Input group::Permissions */}
          <div className='col-md-12'>
            {/* begin::Label */}
            <label className='form-label'>
              <FormattedMessage id='FIELDS.PERMISSION' />
              <span className='required'></span>
              <InfoToolTip tooltipContent='Permissions of the Role' />
            </label>
            {/* end::Label */}

            {formik.touched.permissions && (formik.errors.permissions as string) && (
              <div className='fv-plugins-message-container mt-0'>
                <div className='fv-help-block'>
                  <span role='alert'> {formik.errors.permissions as string}</span>
                </div>
              </div>
            )}

            <div className='table-responsive'>
              <table className='table table-row-bordered table-row-gray-300 align-middle text-dark fs-6 gy-5 m-0'>
                <tbody>
                  <tr>
                    <td>
                      <FormattedMessage id='GENERAL.ADMINISTRATOR' />{' '}
                      <FormattedMessage id='GENERAL.ACCESS' />
                      <InfoToolTip tooltipContent='Allow a full access to the system' />
                    </td>
                    <td>
                      <div className='d-flex'>
                        <label className='form-check form-check-sm form-check-custom form-check-solid'>
                          <input
                            type='checkbox'
                            className='form-check-input'
                            checked={isAllSelected}
                            onChange={(e) => handleSelectAllActions(e.currentTarget.checked)}
                          />
                          <span className='form-check-label'>Select all</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                  {SYSTEM_PERMISSIONS.map((permission) => (
                    <tr key={permission.page}>
                      <td>
                        <FormattedMessage
                          id={permission.localizedKey ? permission.localizedKey : permission.title}
                        />
                      </td>
                      <td>
                        <div className='d-flex'>
                          {permission.actions.map((action) => (
                            <label
                              key={`${permission.page}-${action.action}`}
                              className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'
                            >
                              <input
                                type='checkbox'
                                checked={handleIsActionChecked(permission.page, action.action)}
                                className='form-check-input'
                                onChange={(e) => {
                                  handleActionChange(
                                    permission.page,
                                    action.action,
                                    e.currentTarget.checked
                                  );
                                }}
                              />
                              <span className='form-check-label'>
                                <FormattedMessage
                                  id={action.localizedKey ? action.localizedKey : action.title}
                                />
                              </span>
                            </label>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* end::Input group::Permissions */}
        </div>
      </KTCardBody>
    </form>
  );
};

export { RoleNewForm };
