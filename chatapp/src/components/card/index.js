import React from 'react';
import PropTypes from 'prop-types';
import { Card as BaseCard } from 'antd';
import classNames from "classnames";

import './card.scss';

const Card = props => {
  return <BaseCard {...props} className={classNames('card', props.className)} />;
}

Card.propTypes = {
  className: PropTypes.string
};

export default Card;