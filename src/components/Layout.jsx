import React from "react";
import auth from "./auth";

export const Layout = (props) => {
  return (
    <div className="layout container ">
      <button
        className="btn btn-info btn-round"
        onClick={() => {
          auth.logout(() => {
            props.history.push("/");
          });
        }}
      >
        Logout
      </button>
      <h1>App Layout Private</h1>
    </div>
  );
};
