import React from 'react';
import { Icon } from 'antd';
import './confirm.scss';

const Confirm = () => {
  return (
    <section className='confirm'>
       <Icon 
        className='confirm__icon'
        type='info-circle' 
        theme='twoTone' />

        <h3>Подтвердите свой аккаунт</h3>
        <p>
          На Вашу почту отправлено письмо с ссылкой для подтверждения аккаунта
        </p> 
    </section>
  )
}

export default Confirm;