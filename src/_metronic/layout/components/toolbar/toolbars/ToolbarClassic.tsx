import { FormattedMessage, FormattedDate } from 'react-intl';

const ToolbarClassic = () => {
  // const currentDate = moment().format('ddd, Do MMM YY');

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex align-items-center'>
        <div className='btn btn-secondary btn-sm fw-bold cursor-default'>
          <span className='text-dark me-2'>
            <FormattedMessage id='GENERAL.TODAY' />:
          </span>
          <span className='text-primary'>
            <FormattedDate
              value={new Date()}
              weekday='short'
              year='numeric'
              month='short'
              day='2-digit'
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export { ToolbarClassic };
