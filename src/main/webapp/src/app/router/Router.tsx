import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "../components/home/Home";
import NotFound from "../components/error/NotFound";
import Navbars from "../components/home/Navbars";
import Login from "../components/member/Login";
import SignUp from "../components/member/SignUp";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbars />
      <br />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/auth/login" component={Login} exact />
        <Route path="/auth/sign-up" component={SignUp} exact />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
