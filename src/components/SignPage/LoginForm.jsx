import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { LOGIN_USER } from "../../graphqls/mutations";
import auth from "../auth";

function LoginForm(props) {
  // console.log("render form login 2222222");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN_USER);
  // if (loading) return <h1>Loading...</h1>;
  // if (error) return <p>Error :(</p>;

  function handleSubmit(event) {
    event.preventDefault();
    // console.log("email : " + email, "password :" + password);
    login({ variables: { email: email, password: password } })
      .then((res) => {
        // console.log(res.data.logIn.jwt);
        console.log(res);
        if (res.data.logIn.isSuccess) {
          auth.login(() => {
            props.history.push("/app");
          });
          localStorage.setItem("token", res.data.logIn.jwt);
        } else {
          alert(res.data.logIn.message);
          // alert("Login Failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleChange(event) {
    // console.log(event.target.value);
    if (event.target.name === "email") setEmail(event.target.value);
    if (event.target.name === "password") setPassword(event.target.value);
    // else setPassword(event.target.value);
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
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => props.onCloseForm()}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              <div className="modal-body">
                <div className="form-title text-center">
                  <h4>Login</h4>
                </div>
                <div className="d-flex flex-column text-center">
                  <ValidatorForm
                    onSubmit={(event) => handleSubmit(event)}
                    onError={(errors) => console.error(errors)}
                  >
                    <div
                      className="form-group"
                      style={{ paddingBottom: "10px" }}
                    >
                      <TextValidator
                        className="form-control"
                        label="Email"
                        onChange={(event) => handleChange(event)}
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
                        onChange={(event) => handleChange(event)}
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
                  Not a member yet?{""}
                  <a
                    href="#a"
                    className="text-info"
                    onClick={() => props.switchForm(true)}
                  >
                    Register
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

export default LoginForm;
