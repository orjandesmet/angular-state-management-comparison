import { isNullOrUndefined } from 'util';

export interface DateTimeSeconds {
  seconds: number;
  nanoSeconds: number;
}

export function createDateTimeSeconds(seconds: number = 0, nanoSeconds: number = 0): DateTimeSeconds {
  return {
    seconds,
    nanoSeconds,
  };
}

export function convertDateToSeconds(dateTime: Date): DateTimeSeconds {
  if (isNullOrUndefined(dateTime)) {
    return null;
  } else {
    const timeInMS = dateTime.getTime();
    return createDateTimeSeconds(timeInMS / 1000, timeInMS % 1000 * 1000);
  }
}

export function convertSecondsToMS(dateTimeSeconds: DateTimeSeconds): number {
  if (isNullOrUndefined(dateTimeSeconds)) {
    return null;
  }
  return dateTimeSeconds.seconds * 1000 + dateTimeSeconds.nanoSeconds / 1000;
}

export function convertSecondsToDate(dateTimeSeconds: DateTimeSeconds): Date {
  if (isNullOrUndefined(dateTimeSeconds)) {
    return null;
  }
  const timeInMS = convertSecondsToMS(dateTimeSeconds);
  return new Date(timeInMS);
}
