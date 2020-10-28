import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/HomePage";
import { Layout } from "./components/Layout";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ProtectedRoute } from "./components/protected.route";
import { ProtectedBackRoute } from "./components/protectedBack.route";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://10.1.16.186:8080/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Switch>
            <ProtectedBackRoute exact path="/" component={HomePage} />
            <ProtectedRoute exact path="/app" component={Layout} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
