import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "../components/home/Home";
import SignUp from "../components/member/SignUp";
import NotFound from "../components/error/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/auth/sign-up" component={SignUp} exact />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
