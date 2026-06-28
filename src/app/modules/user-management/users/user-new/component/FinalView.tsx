import React, { useEffect, useState } from 'react';
import { StepProps } from './_steps';
import { Form, Formik } from 'formik';
import { formatDateTime, QUERIES } from '../../../../../../_metronic/helpers';
import { useQuery } from '@tanstack/react-query';

const FinalView = ({ data, APIData, updateData, btnRef, setData }: StepProps) => {
    const [imageURL, setImageURL] = useState<string | undefined>();
   
    useEffect(() => {
        if (data.picture) {
            const url = URL.createObjectURL(data.picture);
            setImageURL(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [data.picture]);

   
    const getRoleNames = (roleIds: number[]) => {
        const roles = APIData?.roles || [];
        return roles.filter(role => roleIds.includes(role.id))?.map(role => role.name).join(', ');
    };


    return (
        <div className="container mt-4">
            <h2 className="mb-4">User Profile</h2>

            {/* User Information Card */}
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <div className="d-flex flex-fill align-items-center justify-content-start">
                        <div className="w-150px">
                            <div className="me-3" style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden' }}>
                                <img
                                    src={imageURL || '/media/svg/avatars/blank.svg'}
                                    alt="Profile"
                                    className="img-fluid"
                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                />
                            </div>
                        </div>

                        <div className="w-100 d-flex align-items-center gap-8">
                            <div className="me-3">
                                <p className="card-text mb-1"><strong>Name:</strong> {`${data.firstName} ${data.lastName}`}</p>
                                <p className="card-text mb-1"><strong>User ID:</strong> {data.userId}</p>
                                <p className="card-text mb-1"><strong>Email:</strong> {data.email}</p>
                                <p className="card-text mb-1"><strong>Phone:</strong> {data.phone ? data.phone : 'N/A'}</p>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export { FinalView };
