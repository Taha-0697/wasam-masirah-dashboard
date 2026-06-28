import React, { useEffect, useRef, useState } from 'react'
import { APIData, initialUser, User, UserRequest } from '../core/_models';
import { useNavigate } from 'react-router-dom';
import { KTCardBody, QUERIES, showToast } from '../../../../../_metronic/helpers';
import clsx from 'clsx';
import { StepperItem, stepperItems } from './component/_steps';
import { FormattedMessage } from 'react-intl';
import { Basic } from './component/forms/Basic';
import { Roles } from './component/forms/Roles';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { createUser, getUsers } from '../core/_requests';
import { useAuth } from '../../../auth';
import { getRoles, getRolesAssociatedByUserTypeAndId } from '../../roles/core/_requests';
import { FinalView } from './component/FinalView';
import { useQueryResponse } from '../core/QueryResponseProvider';

const UserNewForm = () => {
    const [data, setData] = useState<UserRequest>({
        ...initialUser
    });

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { query } = useQueryResponse();

    const backToUsersList = () => {
        navigate('/user-management/users');
    };

    /*-------------------------------------
         Functionality for APi Calls 
    -------------------------------------*/
    const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
    const [stepperItemsState, setStepperItemsState] = useState<StepperItem[]>(stepperItems);
    // Track whether the "Contract Mapping" step has been added
    const [contractMappingAdded, setContractMappingAdded] = useState(false);

    const [APIData, setAPIData] = useState<APIData | {}>({});
    const [activeAPICalls, setActiveAPICalls] = useState<number>(0);
    const { currentUser } = useAuth();

    const results = useQueries({
        queries: [
            {
                queryKey: [QUERIES.USERS],
                queryFn: getUsers,
                // staleTime: Infinity,
                keepPreviousData: true,
                refetchOnWindowFocus: false,
                onSuccess: (data) => {
                    setAPIData((prev) => ({ ...prev, users: data }));
                },
                onError: (error) => {
                    setActiveAPICalls((prev) => (prev < 0 ? prev : prev - 1));
                    showToast('error', 'Failed to load Users');
                },
            },
          
            {
                queryKey: [QUERIES.ROLES], // Provide a unique query key with user ID,
                queryFn: getRoles,
                // staleTime: Infinity,
                keepPreviousData: true,
                refetchOnWindowFocus: false,
                onSuccess: (data) => {
                    setAPIData((prev) => ({ ...prev, roles: data }));
                },
                onError: (error) => {
                    setActiveAPICalls((prev) => (prev < 0 ? prev : prev - 1));
                    showToast('error', 'Failed to load Roles');
                },
            },

        ]
    })

    const isAnyQueryFetching = results.some((result) => result.isFetching);
    const anyQueryError = results.some((result) => result.isError);

 

    const btnRef = useRef<HTMLButtonElement>(null);

    const saveContinueBtnClick = () => {
        if (btnRef && btnRef.current) {
            btnRef.current.click();
        }
    };

    const nextStep = () => {
        setActiveStepIndex((prev) => Math.min(prev + 1, stepperItemsState.length - 1));
    };

    const prevStep = () => {
        setActiveStepIndex((prev) => Math.max(prev - 1, 0));
    };


    const updateData = (fieldsToUpdate: Partial<UserRequest>) => {
        const updatedData = { ...data, ...fieldsToUpdate };
        setData(updatedData);
        if (activeStepIndex < stepperItemsState.length - 1) nextStep();
    };


    /*------------------------------------------------
            End of Functionality for making Steps 
    -------------------------------------------------*/
    const handleSubmitData = async () => {
        try {
            
            const finalData = {
                ...data,
            };

            const finalDatatoformBase = new FormData();

            finalDatatoformBase.append('password', 'Admin@123');
            finalData.userId && finalDatatoformBase.append('userId', finalData.userId);
            finalData.firstName && finalDatatoformBase.append('firstName', finalData.firstName);
            finalData.lastName && finalDatatoformBase.append('lastName', finalData.lastName);
            finalData.email && finalDatatoformBase.append('email', finalData.email);
            finalData.phone && finalDatatoformBase.append('phoneNumber', finalData.phone);
            data.picture && finalDatatoformBase.append('picture', data.picture);
            finalData.isActive && finalDatatoformBase.append('isActive', finalData.isActive.toString());

        
            // Simulate successful submission
            await createUser(finalDatatoformBase)
            queryClient.invalidateQueries({ queryKey: [QUERIES.USERS, query] });
            queryClient.invalidateQueries({ queryKey: [QUERIES.USERS] });

            backToUsersList();
            showToast('success', 'User Added Successfully');
        } catch (error) {
            showToast('error', 'Failed to submit data');
        }
    };



    return (
        <>
            <div>
                <div className='card-header'>
                    <div className='card-title'>
                        <h3>
                            <FormattedMessage id='ACTIONS.NEW' />  <FormattedMessage id='PAGES.USER' />
                        </h3>
                    </div>
                    {(activeStepIndex === 0) &&
                        <div className='card-toolbar'>
                            <button
                                type='button'
                                className='btn btn-sm btn-secondary me-2'
                                // disabled={formik.isSubmitting}
                                onClick={backToUsersList}
                            >
                                <FormattedMessage id='ACTIONS.BACK' />
                            </button>

                        </div>
                    }
                </div>

                <div className='d-flex flex-column flex-lg-row'>
                    <KTCardBody>
                        <div className='stepper stepper-pills'>

                            {/* ------------------------------------------------
                            UI Code for Making Stepper Navigation
                     ------------------------------------------------- */}

                            <div className='stepper-nav flex-center flex-wrap'>
                                {stepperItemsState.map((item, index) => (
                                    <div
                                        className={clsx('stepper-item mx-8 my-4', {
                                            current: activeStepIndex === index,
                                            completed: activeStepIndex > index,
                                        })}
                                        key={index}
                                    >
                                        <div className='stepper-wrapper d-flex align-items-center'>
                                            <div className='stepper-icon w-40px h-40px'>
                                                <i className='stepper-check fas fa-check' />
                                                <span className='stepper-number'>{index + 1}</span>
                                            </div>
                                            <div className='stepper-label'>
                                                <h3 className='stepper-title'>{item.title}</h3>
                                                <div className='stepper-desc'>{item.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ------------------------------------------------
                           End of UI Code for Making Stepper Navigation
                     ------------------------------------------------- */}

                            {/* ------------------------------------------------
                            Logic for making Stepper Data
                     ------------------------------------------------- */}
                            <KTCardBody>
                                {activeStepIndex === 0 && (
                                    <Basic
                                        data={data}
                                        APIData={APIData}
                                        setData={setData}
                                        btnRef={btnRef}
                                        updateData={updateData}
                                    />
                                )}

                                {activeStepIndex === 1 && (
                                    <Roles
                                        data={data}
                                        updateData={updateData}
                                        btnRef={btnRef}
                                        setData={setData}
                                        APIData={APIData}
                                    />
                                )}

                                {activeStepIndex === 2 && (
                                    <FinalView
                                        data={data}
                                        updateData={updateData}
                                        btnRef={btnRef}
                                        setData={setData}
                                        APIData={APIData}
                                    />
                                )}
                            </KTCardBody>

                            {/* ------------------------------------------------
                            End of Logic for making Stepper Data
                     ------------------------------------------------- */}


                            {/* ------------------------------------------------
                            Dynamic Buttons According to Steps
                     ------------------------------------------------- */}
                            <div className='d-flex flex-stack mt-2'>
                                <div className='me-2'>
                                    {activeStepIndex !== 0 && (
                                        <button type='button' className='btn btn-sm btn-secondary' onClick={prevStep}>
                                            Back
                                        </button>
                                    )}
                                </div>
                                <div>
                                    {(activeStepIndex === 3) ? (
                                        <>

                                            <button
                                                type='button'
                                                className='btn btn-sm btn-primary'
                                                onClick={handleSubmitData}
                                            >
                                                Submit
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            type='button'
                                            className='btn btn-sm btn-primary'
                                            onClick={saveContinueBtnClick}
                                        >
                                            Continue
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </KTCardBody>
                </div>
            </div >
        </>
    )
}

export { UserNewForm }