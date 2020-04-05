import { withFormik } from 'formik';
import Register from '../components/register';
import { userActions} from 'redux/actions';
import { message } from 'antd';
import { withRouter } from 'react-router';
import store from 'redux/store';

export default withFormik({
  mapPropsToValues: () => ({email: '', password: '', username: '', confirm: ''}),
  validate: values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Введите email';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Некорректный email';
    }

    if (!values.password) {
      errors.password = 'Введите пароль'
    } else if (
      /^$|\s+/.test(values.password)
      ) {
      errors.password = 'Некорректный пароль';
    }

    if (values.password.length < 6) {
      errors.password = 'Слишком короткий пароль';
    }

    if (values.confirm && values.password !== values.confirm) {
      errors.confirm = 'Пароли не совпадают';
    }

    return errors;
  },
  handleSubmit: (values, { setSubmitting, setErrors, props }) => {
    return store.dispatch(userActions.registerUser(values))
      .then(() => {
        setSubmitting(false);
        const errors = store.getState().user.errors;
        
        if (errors) {
          setErrors(errors);
          return; 
        }
        
        props.history.push('/im');
        message.success('Registration success');
      });
  }
})(withRouter(Register));

