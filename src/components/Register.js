import { useState } from "react";
import { Link } from "react-router-dom"

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister(email, password)
  }


  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form
        noValidate
        className="auth__form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <input
          required
          className="auth__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          required
          minLength={8}
          className="auth__input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handleChangePassword}
        />
        <button
          className="auth__button"
          type="submit">
          Зарегистрироваться
        </button>
        <p className="auth__subtitle">
          Уже зарегистрированы? {""}
          <Link className="auth__link" to="/sign-in">
            Войти
          </Link>
        </p>
      </form>
    </div>
  )
}
export default Register