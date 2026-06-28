import moment from 'moment';

export function formatDateTime(
  dateString: string | Date | undefined,
  format: string = 'DD-MMM-YY, hh:mm A',
  isUTC: boolean = true
) {
  // Handle the case when dateString is undefined or null
  if (!dateString) return null;

  // If the date is in UTC, format it based on UTC time
  if (isUTC) {
    // Parse the date as UTC but do not convert it to local
    const utcDate = moment.utc(dateString);

    // Return the formatted date, but without converting it to local time
    return utcDate.format(format);
  }

  // If the date is not in UTC, format it using the local timezone
  return moment(dateString).format(format);
}

export function getDurationFromNow(dateString?: string, isUTC: boolean = true) {
  if (isUTC) {
    const utcDate = moment.utc(dateString);

    return moment.utc(utcDate).local().fromNow();
  }

  return moment(dateString).fromNow();
}

export function getDateDifference(
  dateString1?: string,
  dateString2?: string,
  uom: moment.unitOfTime.Diff = 'days',
  isUTC: boolean = true
) {
  // if (dateString1 && dateString2) return null;

  if (isUTC) {
    const utcDate1 = moment.utc(dateString1);
    const utcDate2 = moment.utc(dateString2);

    return utcDate1.diff(utcDate2, uom);
  }

  const date1 = moment(dateString1);
  const date2 = moment(dateString2);

  return date1.diff(date2, uom);
}
