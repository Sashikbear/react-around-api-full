import { Link } from 'react-router-dom';
import Header from './Header';
import * as validate from '../utils/validateForm';
import useForm from '../utils/useForm';
function Login({ name, onLogin }) {
  const { handleChange, onSubmit, values, errors, isErrorFree } = useForm(
    validate.validateLoginInfo
  );
  const handleSubmit = (e) => {
    onSubmit(e);
    if (isErrorFree) {
      onLogin(values.email, values.password);
    }
  };
  return (
    <>
      <Header linkTo={'/signup'} linkText={'Sign up'} />
      <main className='main'>
        <form
          name={`form-${name}`}
          className='selected-form form'
          onSubmit={handleSubmit}
        >
          <h2 className='form__title'>Log in</h2>
          <input
            id='email-input'
            name='email'
            className='form__input form__input_type_email selected-input'
            type='email'
            placeholder='Email'
            value={values.email}
            onChange={handleChange}
            required
          />
          <span
            className={`popup__error ${errors.email && 'popup__error_visible'}`}
          >
            {errors.email}
          </span>
          <input
            id='password-input'
            name='password'
            className='form__input form__input_type_password selected-input'
            type='password'
            placeholder='Password'
            minLength='8'
            value={values.password}
            onChange={handleChange}
            required
          />
          <span
            className={`popup__error ${
              errors.password && 'popup__error_visible'
            }`}
          >
            {errors.password}
          </span>

          <button
            type='submit'
            onClick={handleSubmit}
            className='form__button selected-button'
          >
            Log in
          </button>
          <Link
            className='form__link'
            to={'/signup'}
            style={{ textDecoration: 'inherit' }}
          >
            Not a member yet? Sign up here!
          </Link>
        </form>
      </main>
    </>
  );
}
export default Login;
