import { useParams } from 'react-router-dom';
import { isNotEmpty, QUERIES } from '../../../../../_metronic/helpers';
import { getUserById } from '../core/_requests';
import { useQuery } from '@tanstack/react-query';
import { UserEditForm } from './UserEditForm';

const UserEdit = () => {
    const { id } = useParams();
    const enabledQuery: boolean = isNotEmpty(id);
    const {
        isLoading,
        data: user,
        error,
    } = useQuery(
        [QUERIES.USERS, id],
        () => {
            return getUserById(Number(id));
        },
        {
            cacheTime: 0,
            enabled: enabledQuery,
            refetchOnWindowFocus: false,
            onError: (err) => {
                console.error(err);
            },
        }
    );

    if (!user) return null;

    return (
        <div className='card'>
            <UserEditForm user={user} />
        </div>
    );
};

export { UserEdit };
