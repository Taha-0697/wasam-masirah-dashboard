import { FC, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FormattedMessage } from 'react-intl';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import {
  KTCardBody,
  QUERIES,
  showToast,
  SYSTEM_PERMISSIONS,
  SystemAction,
  SystemPage,
  SystemPermission,
} from '../../../../../_metronic/helpers';
import { Role, PermissionRequest, PermissionAction } from '../core/_models';
import { createRolePermissions } from '../core/_requests';

type NewPermissionRequest = {
  permissions: PermissionRequest[];
};

type Props = {
  role: Role;
};

const newPermissionSchema = Yup.object().shape({
  permissions: Yup.array().min(1, 'Permission is required').required('Permission is required'),
});

const NewPermissionForm: FC<Props> = ({ role }) => {
  const [newPermission] = useState<NewPermissionRequest>({
    permissions: [],
  });
  const newPermissionsToAdd: SystemPermission[] = [];

  const queryClient = useQueryClient();

  //filter only those permissions which are not added yet.
  for (const systemPermission of SYSTEM_PERMISSIONS) {
    const clonedPermission = { ...systemPermission };
    const permission = role.permissions.find((p) => {
      let pages = SystemPage[p.page as keyof typeof SystemPage]
      return pages === clonedPermission.page
    });

    if (!permission) {
      newPermissionsToAdd.push(clonedPermission);
    } else {
      clonedPermission.actions = clonedPermission.actions.filter(
        (action) =>
          !(permission.actions as PermissionAction[]).find((a: any) => {
            let actions = SystemAction[a.action as keyof typeof SystemAction];
            return actions === action.action
          })
      );

      if (clonedPermission.actions.length > 0) {
        newPermissionsToAdd.push(clonedPermission);
      }
    }
  }

  const formik = useFormik({
    initialValues: newPermission,
    validationSchema: newPermissionSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await createRolePermissions(role.id, values.permissions);
        queryClient.invalidateQueries({ queryKey: [QUERIES.ROLES, role.id] });
        formik.resetForm();

        showToast('success', 'Permission Added Successfully');
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

  const handleActionChange = (page: SystemPage, action: SystemAction, isActionChecked: boolean) => {
    let checkedPermissions = [...formik.values.permissions];
    const permissionIndex = checkedPermissions.findIndex((permission) => permission.page === page);

    if (permissionIndex !== -1) {
      const permission = { ...checkedPermissions[permissionIndex] };

      if (isActionChecked) {
        permission.actions = [...permission.actions, action];
      } else {
        permission.actions = permission.actions.filter((a) => a !== action);
      }

      if (permission.actions.length === 0) {
        // if there are no actions checked for the respective page then it removes the page object from array.
        checkedPermissions = checkedPermissions.filter((permission) => permission.page !== page);
      } else {
        checkedPermissions[permissionIndex] = permission;
      }
    } else {
      const permission: PermissionRequest = {
        page,
        actions: [],
      };

      // if newPermssionsToAdd contains View permission only than we can automatically add it in our array with other actions.
      let hasViewPermission = false;
      const newPermission = newPermissionsToAdd.find((p) => p.page === page);
      if (newPermission) {
        if (newPermission?.actions.find((a) => a.action === SystemAction.VIEW)) {
          hasViewPermission = true;
        }
      }

      if (hasViewPermission && action !== SystemAction.VIEW) {
        permission.actions = [SystemAction.VIEW, action];
      } else {
        permission.actions = [action];
      }

      checkedPermissions.push(permission);
    }

    formik.setFieldValue('permissions', checkedPermissions);
  };

  const handleIsActionChecked = (page: SystemPage, action: SystemAction): boolean => {
    const permission = formik.values.permissions.find((permission) => permission.page === page);
    if (!permission) return false;

    return permission.actions.includes(action);
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate autoComplete='off'>
      {/*begin::Card header*/}
      <div className='card-header'>
        {/*begin::Card title*/}
        <div className='card-title'>
          <h3>
            <FormattedMessage id='ACTIONS.ADD' /> <FormattedMessage id='ACTIONS.NEW' />{' '}
            <FormattedMessage id='FIELDS.PERMISSION' />
          </h3>
        </div>
        {/*end::Card title*/}
        {/*end::Card toolbar*/}
        <div className='card-toolbar'>
          {newPermissionsToAdd.length > 0 && (
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
          )}
        </div>
        {/*end::Card toolbar*/}
      </div>
      {/*end::Card header*/}
      {/*begin::Card body*/}
      <KTCardBody>
        {!newPermissionsToAdd.length ? (
          <div className='text-center fs-6 fw-bold'>
            <FormattedMessage id='MESSAGES.NORECORDSFOUND' />
          </div>
        ) : (
          <>
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
                  {newPermissionsToAdd.map((permission) => (
                    <tr key={permission.page}>
                      <td>
                        <FormattedMessage id={permission.localizedKey ? permission.localizedKey : permission.title} />
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
                                <FormattedMessage id={action.localizedKey ? action.localizedKey : action.title} />
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
          </>
        )}
      </KTCardBody>
    </form>
  );
};

export { NewPermissionForm };
