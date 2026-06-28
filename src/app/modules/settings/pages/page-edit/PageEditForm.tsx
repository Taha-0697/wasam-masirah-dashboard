import React, { FC, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useQueryResponse } from '../core/QueryResponseProvider';
import { useFormik } from 'formik';
import { InfoToolTip, KTCardBody, QUERIES, showToast } from '../../../../../_metronic/helpers';
import axios from 'axios';
import clsx from 'clsx';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { Page, PageRequest } from '../core/_models';
import { getSystemPages, updatePage } from '../core/_requests';

type Props = {
    pageData: Page;
};

const editPageSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Name is required'),
    // description: Yup.string()
    //     .min(5, 'Minimum 5 symbols')
    //     .max(500, 'Maximum 500 symbols')
    //     .required('Description is required'),

    isActive: Yup.bool(),
});

const PageEditForm: FC<Props> = ({ pageData }) => {

    const [editPage] = useState<PageRequest>({
        name: pageData.name,
        description: pageData.description,
        parentId: pageData.parentId,
        isActive: pageData.isActive,
    });

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { query } = useQueryResponse();

    const backtoPageList = () => {
        navigate('/settings/pages');
    };

    const formik = useFormik({
        initialValues: editPage,
        validationSchema: editPageSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {

                await updatePage(pageData.id, values);

                queryClient.invalidateQueries({ queryKey: [QUERIES.PAGES, query] });
                queryClient.invalidateQueries({ queryKey: [QUERIES.PAGES] });

                backtoPageList();
                showToast('success', 'Page Updated Successfully');
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

    const PageQuery = useQuery(
        [QUERIES.SYSTEMPAGES],  // <- Provide a valid array as the queryKey
        () => {
            return getSystemPages();
        },
        {
            cacheTime: 0,
            refetchOnWindowFocus: false,
            onError: (err) => {
                console.error(err);
            },
        }
    );

    return (
        <form onSubmit={formik.handleSubmit} noValidate autoComplete='off'>
            <div className='card-header'>
                <div className='card-title'>
                    <h3>
                        <FormattedMessage id='ACTIONS.EDIT' /> <FormattedMessage id='PAGES.PAGE' />
                    </h3>
                </div>
                <div className='card-toolbar'>
                    <button
                        type='button'
                        className='btn btn-sm btn-secondary me-2'
                        disabled={formik.isSubmitting}
                        onClick={backtoPageList}
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
                    <div className='col-md-6'>
                        <label className='form-label'>
                            <FormattedMessage id='FIELDS.NAME' />
                            <span className='required'></span>
                            <InfoToolTip tooltipContent='Name of the Page' />
                        </label>
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
                    </div>

                    <div className='col-md-6'>
                        <label className='form-label'>
                            <FormattedMessage id='FIELDS.PARENT' />
                            <InfoToolTip tooltipContent='Parent of the Page' />
                        </label>
                        <select
                            {...formik.getFieldProps('parentId')}
                            className={clsx(
                                'form-select form-select-sm',
                                { 'is-invalid': formik.touched.parentId && formik.errors.parentId },
                                {
                                    'is-valid': formik.touched.parentId && !formik.errors.parentId,
                                }
                            )}
                        >
                            <option value=''>Please Select Parent</option>
                            {PageQuery?.data?.map((d) => (
                                <option key={d.id} value={d.id?.toString()}>
                                    {d.name}
                                </option>
                            ))}
                        </select>

                        {formik.touched.parentId && formik.errors.parentId && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.parentId}</span>
                                </div>
                            </div>
                        )}
                    </div>


                    <div className='col-md-12'>
                        <label className='form-label'>
                            <FormattedMessage id='FIELDS.DESCRIPTION' />
                            <span className='required'></span>
                            <InfoToolTip tooltipContent='Description of the Module' />
                        </label>
                        <textarea
                            {...formik.getFieldProps('description')}
                            className={clsx(
                                'form-control form-control-sm',
                                { 'is-invalid': formik.touched.description && formik.errors.description },
                                {
                                    'is-valid': formik.touched.description && !formik.errors.description,
                                }
                            )}
                            rows={5}
                        >
                        </textarea>
                        {formik.touched.description && formik.errors.description && (
                            <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.description}</span>
                                </div>
                            </div>
                        )}
                    </div>


                    <div className='col-md-1'>
                        <label className='form-label'>
                            <FormattedMessage id='FIELDS.ACTIVE' />
                        </label>
                        <div className='form-check form-switch form-check-custom form-check-solid'>
                            <input
                                {...formik.getFieldProps('isActive')}
                                type='checkbox'
                                className='form-check-input h-25px 2-25px'
                                checked={formik.values.isActive}
                            />
                        </div>
                    </div>

                </div>
            </KTCardBody>
        </form>
    )
}

export { PageEditForm }