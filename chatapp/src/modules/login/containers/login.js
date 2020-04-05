import Login from '../components/login';
import { withFormik } from 'formik';
import { message } from 'antd';
import { userActions} from 'redux/actions';
import store from 'redux/store';

export default withFormik({
  mapPropsToValues: () => {
    const {user} = store.getState().user;
  
    return {
      login: user ? user.username : ''
    }
  },
  validate: values => {
    let errors = {};

    if (!values.login) {
      errors.login = 'Введите логин';
    } else if (
      /^$|\s+/.test(values.login)
      // !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i.test(values.login)
    ) {
      errors.login = 'Некорректный логин';
    }

    if (!values.password) {
      errors.password = 'Введите пароль'
    } else if (
      // !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!_$%@#£€*?&]{8,}$/.test(values.password)
      /^$|\s+/.test(values.password)
    ) {
      errors.password = 'Некорректный пароль';
    }

    return errors;
  },
  handleSubmit: (values, { setSubmitting }) => {
    return store.dispatch(userActions.loginUser(values)).then(
      () => setSubmitting(false)
    ).catch(() => {
      setSubmitting(false);
      message.error('Неправильный логин или пароль')
    });
  }
})(Login);


