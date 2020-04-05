import React from 'react';
import PropTypes from 'prop-types';
import { Button as BaseButton } from 'antd';
import classNames from "classnames";

import './button.scss';

const Button = props => {
  return <BaseButton {...props} className={classNames('button', props.className)} />;
}

Button.propTypes = {
  className: PropTypes.string
};

export default Button;