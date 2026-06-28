import React from 'react';
import { StepProps } from '../_steps';
import { Form, Formik } from 'formik';
import clsx from 'clsx';
import ReactSelect from 'react-select';
import { InfoToolTip } from '../../../../../../../_metronic/helpers';
import * as Yup from 'yup';

const Roles = ({ data, updateData, btnRef, APIData, setData }: StepProps) => {
  const validationSchema = Yup.object().shape({
    roles: Yup.array()
      .of(
        Yup.object({
          roleId: Yup.array()
            .of(Yup.number().required('Role ID is required'))
            .min(1, 'At least one role is required'),
        })
      )
      .min(1, 'At least one row is required')
      .required('At least one roles is required'),
  });

  return (
    <Formik
      initialValues={data}
      // validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          // console.log(values);
          updateData(values);
        } catch (error) {
          console.error(error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, touched, errors, handleSubmit, setFieldValue }) => {
        console.log(values);
        return (
          <Form onSubmit={handleSubmit} noValidate autoComplete='off'>
            <div className='list-group'>
              <ReactSelect
                isMulti
                options={APIData?.roles}
                getOptionLabel={(option) => option?.name || ''}
                getOptionValue={(option) => option?.id?.toString() || ''}
              />

            </div>
            <div className='col-12 mt-4'>
              <button type='submit' className='d-none' ref={btnRef}></button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export { Roles };
