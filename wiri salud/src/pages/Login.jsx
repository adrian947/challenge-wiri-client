import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthProvider";
import { useForm } from "./../hooks/useForm";
// import { Alert } from "../Components/Alert";

export const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const initialForm = {
    email: "rumania@rumania.com",
    password: "holamundo",
  };

  const [values, handleInputChange, reset] = useForm(initialForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    reset();
    const resp = await loginUser(values);

    if (resp) navigate("/layout");
  };

  return (
    <div className='layout-container'>
      <main className='auth'>
        <div className='auth__formContainer'>
          {/* {alert.msg && <Alert alert={alert} />} */}
          <img
            src='https://wiri.la/static/media/logo.2dd585668426aa81b057bd026cb89956.svg'
            alt='logo wiri'
          />
          <form className='auth__form' onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder='Email'
              className='auth__input'
              name='email'
              onChange={handleInputChange}
              value={values.email}
            />
            <input
              type='password'
              placeholder='Contraseña'
              className='auth__input'
              name='password'
              onChange={handleInputChange}
              value={values.password}
            />
            <input
              type='submit'
              value='iniciar sesión'
              className='auth__button'
            />
          </form>
          <Link to='/register'>
            <p className='auth__p'>¿Aún no tienes cuenta?</p>
          </Link>
        </div>
      </main>
    </div>
  );
};
