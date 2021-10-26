import {BrowserRouter, Route, Switch} from "react-router-dom";
import NotFound from "../components/error/NotFound";
import Home from "../components/home/Home";
import Navbars from "../components/home/Navbars";
import SignUp from "../components/member/SignUp";
import Login from "../components/member/Login";
import Counter from "../components/counter/Counter";
import Register from "../components/member/Register";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbars />
      <br />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/counter" component={Counter} exact />
        <Route path="/auth/login" component={Login} exact />
        <Route path="/auth/sign-up" component={SignUp} exact />
        <Route path="/auth/register" component={Register} exact />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;