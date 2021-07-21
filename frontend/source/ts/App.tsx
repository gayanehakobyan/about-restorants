import * as React from "react"
import * as ReactDOM from "react-dom"
import {BrowserRouter, Route} from "react-router-dom";
import "../sass/main.scss"

const App = React.lazy(() => import("./components/Main"));


ReactDOM.render((
    <React.Suspense fallback={null}>
        <React.Suspense fallback={null}>
            <BrowserRouter >
                <Route path="/" component={App}/>
            </BrowserRouter>
        </React.Suspense>
    </React.Suspense>), document.getElementById("root"))