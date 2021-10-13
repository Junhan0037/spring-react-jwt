import {BrowserRouter, Switch, Route} from "react-router-dom";
import NotFound from "../components/error/NotFound";
import Home from "../components/home/Home";
import Navbars from "../components/home/Navbars";
import CounterApp from "../components/counter/CounterApp";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbars />
      <br />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/counter" component={CounterApp} exact />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;