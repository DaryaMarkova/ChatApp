import React, { Component } from 'react';
import { Button, Input } from '../../../components';
import { Form, Icon } from 'antd';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  render() {
    const { 
      values, 
      errors, 
      touched, 
      handleChange, 
      handleBlur, 
      handleSubmit, 
      isSubmitting
    } = this.props;

    return (
      <Form>
        <Form.Item 
          validateStatus={ !touched.login ? '' : errors.login ? 'error' : 'success'} 
          help={!touched.login ? '': errors.login}>

          <Input
            name="login"
            size="large"
            className="input__large"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Логин"
            value={values.login}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>
      
        <Form.Item 
          validateStatus={ !touched.password ? '' : errors.password ? 'error' : 'success'} 
          help={!touched.password ? '': errors.password}>

          <Input
            name="password"
            size="large"
            className="input__large"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Пароль"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>
      
        <Form.Item>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || errors.login || errors.password} 
            className='button__large' type='primary' size='large'>Вход
          </Button>
        </Form.Item>

        <Link className='register__link' to='/register'>Зарегистрироваться</Link>
      </Form>
    );
  }
}