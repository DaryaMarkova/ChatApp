import React from 'react';
import { Card } from './../../components';
import { Login } from './../../modules/login';
import { Register } from '../../modules/register';
import { Route, Switch } from 'react-router-dom';
import './auth.scss';

class Auth extends React.Component {
  render() {
    return (
      <div className='auth'>
        <div className='auth__header'>
          <Switch>
            <Route 
              path={'/register'} 
              render={() => (
                <>
                  <h2>Регистрация</h2>
                  <p>Регистрация необходима для входа в чат</p> 
                </>
              )} />

            <Route 
              path={'/login'}  
              render={() => (
                <>
                  <h2>Войти в аккаунт</h2>
                  <p>Пожалуйста, войдите в свой аккаунт</p> 
                </>
              )} />

          </Switch>
        </div>
        <div className='auth__content'>
          <Card className='card__shadowed'>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Card>
        </div>
      </div>
    );
  }
};
export default Auth;