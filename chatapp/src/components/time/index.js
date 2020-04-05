import React from 'react';
import PropTypes from 'prop-types';
import formatDistance  from 'date-fns/formatDistance';
import formatDate from 'date-fns/format';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInYear from 'date-fns/differenceInYears';
import ruLocale from 'date-fns/locale/ru';

const Time = ({timeStamp, format}) => {
    const date = new Date(timeStamp);
    const now = new Date();
    
    const formattedDate =  
      differenceInYear(now, date) > 5 || differenceInMinutes(now, date) < 5 ? 
      formatDistance(date, now, {addSuffix: true, locale: ruLocale}) :
      formatDate(date, format, {locale: ruLocale})

    return (<span>{formattedDate}</span>)
}

export default Time;

Time.propTypes = {
    timeStamp: PropTypes.string,
    format: PropTypes.string
}

Time.defaultProps = {
    format: 'dd MMMM yyyy HH:mm'
}