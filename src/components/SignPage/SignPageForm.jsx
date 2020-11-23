import React, { useState } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function SignPageForm(props) {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegisterForm, setIsOpenRegisterForm] = useState(false);

  function onCloseForm() {
    // setIsOpenLogin(false);
    // setIsOpenRegisterForm(false);
    <Redirect to="/" />;
  }
  function switchForm(value) {
    setIsOpenLogin(!value);
    setIsOpenRegisterForm(value);
  }
  return (
    <div className="body">
      <div className="container">
        <Link to="/login">
          <button
            // onClick={() => setIsOpenLogin(true)}
            type="button"
            className="btn btn-action btn-info btn-round"
          >
            Login
          </button>
        </Link>

        {isOpenLogin && (
          <LoginForm
            {...props}
            onCloseForm={onCloseForm}
            switchForm={switchForm}
          />
        )}
        {isOpenRegisterForm && (
          <RegisterForm onCloseForm={onCloseForm} switchForm={switchForm} />
        )}
      </div>
    </div>
  );
}
export default SignPageForm;
