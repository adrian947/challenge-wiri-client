import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthProvider";
import { useForm } from "./../hooks/useForm";
import { Alert } from "../components/Alert";
import { PushSpinner } from "react-spinners-kit";

export const Login = () => {
  const navigate = useNavigate();
  const { loginUser, loading, alert } = useContext(AuthContext);

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
          {alert.msg && <Alert alert={alert} />}
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
            <button type='submit' className='auth__button'>
              {!loading ? (
                "iniciar sesión"
              ) : (
                <span style={{ margin: "0px" }} className='spinner_container'>
                  <PushSpinner size={20} color='#FFF' />
                </span>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
