import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';

type Props = {
  isDisplay?: boolean;
  isLoading: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteModal: FC<Props> = ({ isDisplay = true, isLoading = false, onClose, onDelete }) => {
  return (
    <>
      <div
        className={clsx('modal fade', { 'show d-block': isDisplay })}
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        {/* begin::Modal dialog */}
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            {/* begin::Modal header */}
            <div className='modal-header'>
              {/* begin::Modal title */}
              <h2 className='fw-bold'>
                <FormattedMessage id='MESSAGES.DELETECONFIRMATION' />
              </h2>
              {/* end::Modal title */}

              {/* begin::Close */}
              <div
                className='btn btn-icon btn-sm btn-active-icon-primary cursor-pointer'
                data-kt-modal-action='close'
                onClick={onClose}
              >
                <i className='fa-solid fa-xmark text-dark fs-1'></i>
              </div>
              {/* end::Close */}
            </div>
            {/* end::Modal header */}

            {/* begin::Modal body */}
            <div className='modal-body'>
              <h5 className='text-start mb-0'>
                <FormattedMessage id='MESSAGES.DELETECONFIRMATIONMESSAGE' />
              </h5>
            </div>
            {/* end::Modal body */}

            {/* begin::Modal footer */}
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-sm btn-secondary me-2'
                data-kt-modal-action='cancel'
                onClick={onClose}
              >
                <FormattedMessage id='ACTIONS.CLOSE' />
              </button>

              <button
                type='button'
                className='btn btn-sm btn-danger'
                data-kt-modal-action='submit'
                disabled={isLoading}
                onClick={onDelete}
              >
                <FormattedMessage id='ACTIONS.DELETE' />
                {isLoading && (
                  <span
                    className='spinner-border spinner-border-sm ms-1'
                    role='status'
                    aria-hidden='true'
                  ></span>
                )}
              </button>
            </div>
            {/* end::Modal footer */}
          </div>
          {/* end::Modal content */}
        </div>
        {/* end::Modal dialog */}
      </div>
      {/* begin::Modal Backdrop */}
      <div className='modal-backdrop fade show'></div>
      {/* end::Modal Backdrop */}
    </>
  );
};

export { DeleteModal };
