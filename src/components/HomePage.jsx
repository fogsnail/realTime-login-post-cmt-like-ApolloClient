import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import auth from "./auth";
import { gql } from "@apollo/client";

const SET_LOGIN = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(data: { email: $email, password: $password }) {
      isSuccess
      jwt
      message
    }
  }
`;

function HomePage(props) {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
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
        {isOpenLogin ? <LoginForm {...props} /> : ""}
      </div>
    </div>
  );
}

export default HomePage;

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    console.log("email : " + email, "password :" + password);

    auth.login(() => {
      props.history.push("/app");
    });
  }

  function handleChange(event, type) {
    // console.log(event.target.value);
    if (type === "email") setEmail(event.target.value);
    else setPassword(event.target.value);
  }

  return (
    <div className="body">
      <div className="modal__overlay"></div>
      <div className="container">
        <div
        // className="modal fade"
        // id="loginModal"
        // tabIndex={-1}
        // role="dialog"
        // aria-labelledby="exampleModalLabel"
        // aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered " role="document">
            <div className="modal-content">
              <div className="modal-header border-bottom-0">
                {/* <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                // onClick={() => setisOpenLogin(true)}
              >
                <span aria-hidden="true">×</span>
              </button> */}
              </div>

              <div className="modal-body">
                <div className="form-title text-center">
                  <h4>Login</h4>
                </div>
                <div className="d-flex flex-column text-center">
                  <ValidatorForm
                    onSubmit={() => handleSubmit()}
                    onError={(errors) => console.error(errors)}
                  >
                    <div
                      className="form-group"
                      style={{ paddingBottom: "10px" }}
                    >
                      <TextValidator
                        className="form-control"
                        label="Email"
                        onChange={(event) => handleChange(event, "email")}
                        name="email"
                        type="text"
                        value={email}
                        validators={["required", "isEmail"]}
                        errorMessages={[
                          "this field is required",
                          "email is not valid",
                        ]}
                      />
                    </div>

                    <div className="form-group" style={{ height: "60px" }}>
                      <TextValidator
                        className="form-control"
                        label="Password"
                        onChange={(event) => handleChange(event, "password")}
                        name="password"
                        value={password}
                        type="password"
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-info btn-block btn-round"
                      // type="button"
                      // className="close"
                    >
                      Login
                    </button>
                  </ValidatorForm>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <div className="signup-section">
                  Not a member yet?
                  <a href="#a" className="text-info">
                    Sign Up
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
