import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  concat,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { AppLayout } from "./components/AppLayout";
import { ProtectedRoute } from "./components/protected.route";
import { ProtectedBackRoute } from "./components/protectedBack.route";
import LoginForm from "./components/SignPage/LoginForm";
import RegisterForm from "./components/SignPage/RegisterForm";
import SignPageForm from "./components/SignPage/SignPageForm";

// import { machineId, machineIdSync } from "node-machine-id";
//  subcription

// import { machineId, machineIdSync } from "node-machine-id";

const wsLink = new WebSocketLink({
  uri: `ws:/10.1.16.189:4000/graphql`,
  options: {
    reconnect: true,
  },
  credentials: "include",
});

const httpLink = new HttpLink({
  uri: "http://10.1.16.189:4000/graphql",
  // cache: new InMemoryCache(),
  credentials: "include",
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}` || null,
    },
  });
  // console.log(operation)
  // console.log(forward(operation))
  return forward(operation);
  // .map(res =>{
  //   var a = operation.getContext();
  //   var b = a.context.headers.get(
  //     'Host',
  //   );
  //   console.log(b)
  // })
});

const client = new ApolloClient({
  // link: splitLink,
  link: concat(authMiddleware, splitLink),
  cache: new InMemoryCache(),
});

function App() {
  // console.log(machineIdSync(true));

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Switch>
            <ProtectedBackRoute exact path="/" component={SignPageForm} />
            <ProtectedRoute exact path="/app" component={AppLayout} />
            <ProtectedBackRoute exact path="/login" component={LoginForm} />
            <ProtectedBackRoute
              exact
              path="/register"
              component={RegisterForm}
            />
            <Route path="*" component={() => "404 NOT FOUND 😂😂😂😂😂"} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
