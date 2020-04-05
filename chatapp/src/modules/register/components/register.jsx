import React, { Component } from 'react';
import { Button, Input } from '../../../components';
import { Form, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Confirm from './confirm';

export default class Register extends Component {
  state = {
    status: false
  }

  render() {
    if (this.state.status) {
      return <Confirm />
    }
    
    const { 
      values, 
      errors, 
      touched, 
      handleSubmit, 
      handleChange, 
      handleBlur,
      isSubmitting 
    } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Item 
          validateStatus={ !touched.email ? '' : errors.email ? 'error' : 'success'}
          help={!touched.email ? '': errors.email} 
          hasFeedback>

          <Input
            name="email"
            size="large"
            className="input__large"
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="E-Mail"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
           />
        </Form.Item>
      
        <Form.Item 
          validateStatus={ !touched.username ? '' : errors.username ? 'error' : 'success'} 
          hasFeedback 
          help={!touched.username ? '': errors.username}>
          <Input
            size="large"
            name="username"
            className="input__large"
            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={values.username}
            onChange={handleChange}
            placeholder="Логин"
          />
        </Form.Item>

        <Form.Item>
          <Input
            size="large"
            name="firstname"
            className="input__large"
            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={values.firstname}
            onChange={handleChange}
            placeholder="Имя"
          />
        </Form.Item>

        <Form.Item>
          <Input
            size="large"
            name="lastname"
            className="input__large"
            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={values.lastname}
            onChange={handleChange}
            placeholder="Фамилия"
          />
        </Form.Item>

        <Form.Item 
          validateStatus={ !touched.password ? '' : errors.password ? 'error' : 'success'} 
          hasFeedback 
          help={!touched.password ? '': errors.password} >

          <Input
            name="password"
            size="large"
            className="input__large"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Пароль"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
        </Form.Item>

        <Form.Item
          validateStatus={!touched.confirm ? '' : errors.confirm ? 'error' : 'success'}
          hasFeedback
          help={!touched.confirm ? '': errors.confirm}
          >
          <Input
            name="confirm"
            size="large"
            className="input__large"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Повторить пароль"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirm}
          />
        </Form.Item>
      
        <Form.Item>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || errors.email || errors.password}    
            className='button__large' 
            type='primary' 
            size='large' >
              Зарегистрироваться
          </Button>
        </Form.Item>

        <Link className='register__link' to='/login'>Войти в аккаунт</Link>
      </Form>
    );
  }
}