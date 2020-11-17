import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Link, Redirect, Route } from "react-router-dom";
import { REGISTER_USER } from "../../graphqls/mutations";

function RegisterForm(props) {
  // console.log("render form login 2222222");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [registerUser] = useMutation(REGISTER_USER);
  //   if (loading) return <h1>Loading...</h1>;
  //   if (error) return <p>Error :(</p>;
  console.log(props.history);
  function handleSubmit(event) {
    event.preventDefault();
    console.log(
      firstName,
      lastName,
      "email : " + email,
      "password :" + password,
      passwordConfirm
    );

    if (password === passwordConfirm) {
      registerUser({
        variables: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
      })
        .then((res) => {
          console.log(res);
          // props.history.push("/dmnadmnsa");
          // <Redirect from="register" to="/" />;
          // history.push()
          
          if (res.data.register.isSuccess === true){
            alert("Register successfully.");
            props.history.push("/login")
          }

          else {
            alert(res.data.register.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else alert("Password confirmation must match Password !");
  }

  function handleChange(event) {
    // console.log(event.target.value);
    if (event.target.name === "firstName") setFirstName(event.target.value);
    if (event.target.name === "lastName") setLastName(event.target.value);
    if (event.target.name === "email") setEmail(event.target.value);
    if (event.target.name === "passwordConfirm")
      setPasswordConfirm(event.target.value);
    if (event.target.name === "password") setPassword(event.target.value);
    // else setPassword(event.target.value);
  }

  return (
    <div className="body">
      <div className="modal__overlay"></div>
      <div className="container">
        <div>
          <div className="modal-dialog modal-dialog-centered " role="document">
            <div className="modal-content">
              <div className="modal-header border-bottom-0">
                <Link to="/">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </Link>
              </div>

              <div className="modal-body">
                <div className="form-title text-center">
                  <h4>Register here</h4>
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
                        label="First Name"
                        onChange={(event) => handleChange(event)}
                        name="firstName"
                        type="text"
                        value={firstName}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ paddingBottom: "10px" }}
                    >
                      <TextValidator
                        className="form-control"
                        label="Last Name"
                        onChange={(event) => handleChange(event)}
                        name="lastName"
                        type="text"
                        value={lastName}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </div>
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
                    <div
                      className="form-group"
                      style={{ paddingBottom: "10px" }}
                    >
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

                    <div className="form-group" style={{ height: "60px" }}>
                      <TextValidator
                        className="form-control"
                        label="Confirm Password"
                        onChange={(event) => handleChange(event)}
                        name="passwordConfirm"
                        value={passwordConfirm}
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
                      Register
                    </button>
                  </ValidatorForm>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <div className="signup-section">
                  Back to{" "}
                  <Link to="/login">
                    <p className="text-info">Login</p>
                  </Link>
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

export default RegisterForm;
