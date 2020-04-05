import React from 'react';
import PropTypes from 'prop-types';
import { Input as BaseInput } from 'antd';
import classNames from "classnames";

import './input.scss';

const Input = props => {
  return <BaseInput {...props} className={classNames('input', props.className)} />;
}

Input.propTypes = {
  className: PropTypes.string
};

export default Input;