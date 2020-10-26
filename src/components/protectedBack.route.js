import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export const ProtectedBackRoute = ({ component: Component, ...rest }) => {
  console.log(rest);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated() === false) {
          return <Component {...props} />;
        } else {
          //   console.log(props.location);
          //   console.log("adgfagjhdajhg");
          return (
            <Redirect
              to={{
                pathname: "/app",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
