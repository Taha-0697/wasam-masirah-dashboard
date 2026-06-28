import React from 'react';
import clsx from 'clsx';

type Props = {
  iconClass?: string;
  tooltipId?: any;
  tooltipPlacement?:
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';
  extraClasses?: string;
  tooltipContent?: string;
};

const InfoToolTip: React.FC<Props> = ({
  iconClass = 'fa-regular fa-circle-question',
  tooltipId = 'my-tooltip',
  tooltipPlacement = 'top',
  tooltipContent = '',
  extraClasses = '',
}) => (
  <i
    data-tooltip-id={tooltipId}
    data-tooltip-place={tooltipPlacement}
    data-tooltip-content={tooltipContent}
    className={clsx(`${iconClass} align-middle fs-5 ms-2 text-dark ${extraClasses}`)}
  />
);

export { InfoToolTip };
