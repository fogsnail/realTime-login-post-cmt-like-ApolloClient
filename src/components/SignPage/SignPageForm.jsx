import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function SignPageForm(props) {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegisterForm, setIsOpenRegisterForm] = useState(false);

  function onCloseForm() {
    setIsOpenLogin(false);
    setIsOpenRegisterForm(false);
  }
  function switchForm(value) {
    setIsOpenLogin(!value);
    setIsOpenRegisterForm(value);
  }
  return (
    <div className="body">
      <div className="container">
        <button
          onClick={() => setIsOpenLogin(true)}
          type="button"
          className="btn btn-info btn-round"
        >
          Login
        </button>
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
