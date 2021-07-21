import * as React from "react";
import { IMainProps } from "types/Main";
import {Redirect, Route, Switch} from "react-router-dom";

const Home = React.lazy(() => import("./home/Home"));
const PageDetails =  React.lazy(() => import("./page/PageDetails"))


const Main: React.FunctionComponent<IMainProps> = (props: IMainProps): JSX.Element =>
{
    return (
        <section className="main-content">
            <Switch>
                <Route path={`/`}  exact component={Home}/>
                <Route path={`/:id`} component={PageDetails}/>
                 <Redirect to={`${props.match.url}`}/>
            </Switch>
        </section>

    );

};

export default Main;
