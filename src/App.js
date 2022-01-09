import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Loader from "./components/Loader/Loader";
import Provider from "./components/Provider";

//lazy loading
const Home = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./components/Home/Home")), 1000);
  });
});
const Bank = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./components/Bank/bank")), 1000);
  });
});

const App = () => {
  return (
    <Router>
      <Provider>
        <Suspense fallback={<Loader isloading={true} />}>
          <Switch>
            <Route exact path="/all-banks" component={Home} />
            <Route exact path="/bank-details/:ifsc_code" component={Bank} />
            <Redirect from="/" to="/all-banks" />
          </Switch>
        </Suspense>
      </Provider>
    </Router>
  );
};

export default App;
