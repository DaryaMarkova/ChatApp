import isToday from 'date-fns/isToday';
import format from 'date-fns/format';

export const getFormattedDate = (createdAt) => {
  if (isToday(createdAt)) {
      return format(createdAt, 'HH:mm');
  }

  return format(createdAt, 'dd/MM/yyyy');
}

export const convertToPlayerTime = (time) => {
  const hours = parseInt(time / 3600);
  const minutes = parseInt( (time - hours*3600) / 60);
  const seconds = parseInt( (time - hours*3600 - minutes*60));

  const padLeft = (value) => value < 10 ? `0${value}` : value;

  if (hours > 0 ) {
    return `${padLeft(hours)}:${padLeft(minutes)}:${padLeft(seconds)}`;
  } else {
    return `${padLeft(minutes)}:${padLeft(seconds)}`;
  }
}