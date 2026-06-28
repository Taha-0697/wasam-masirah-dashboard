import { FormattedMessage } from 'react-intl';

const styles = {
  backgroundColor: '#fff',
  color: '#7e8299',
  fontWeight: '500',
  padding: '1rem 2rem',
  borderRadius: '0.475rem',
  boxShadow: '0 0 50px 0 rgb(82 63 105 / 15%)',
  top: 'calc(50% - 2rem)',
  left: 'calc(50% - 4rem)',
  width: 'auto',
  margin: '0',
};

const UsersListLoading = () => {
  return (
    <div className='position-absolute text-center' style={styles}>
      <FormattedMessage id='MESSAGES.LOADING' />
      ...
    </div>
  );
};

export { UsersListLoading };
