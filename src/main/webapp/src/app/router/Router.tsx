import {BrowserRouter, Switch, Route} from "react-router-dom";
import NotFound from "../components/error/NotFound";
import Home from "../components/home/Home";
import Navbars from "../components/home/Navbars";
import CounterApp from "../components/counter/CounterApp";
import SignUp from "../components/member/SignUp";
import Login from "../components/member/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbars />
      <br />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/counter" component={CounterApp} exact />
        <Route path="/auth/login" component={Login} exact />
        <Route path="/auth/sign-up" component={SignUp} exact />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;