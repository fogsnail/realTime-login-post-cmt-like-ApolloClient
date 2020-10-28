import { gql, useMutation } from "@apollo/client";
import React from "react";
import auth from "./auth";

const LOGOUT_USER = gql`
  mutation {
    logout {
      isSuccess
      message
    }
  }
`;

export const Layout = (props) => {
  const [setLogout] = useMutation(LOGOUT_USER);

  return (
    <div className="body body-private">
      <button
        className="btn btn-info btn-round"
        onClick={() => {
          setLogout().then((res) => {
            console.log(res);
            auth.logout(() => {
              props.history.push("/");
            });
          });
        }}
      >
        Logout
      </button>
      <h1>App Layout Private</h1>
    </div>
  );
};
