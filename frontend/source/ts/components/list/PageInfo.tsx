// import React, {useState} from "react";
// import { IPageInfoProps } from "types/components/list/IPageInfo";
// import {IMainProps} from "../../../../types/Main";
// import {Route, Switch} from "react-router-dom";
//
// const Main: React.FunctionComponent<IMainProps> = (props: IMainProps): JSX.Element =>
// {
//
//
//     const [info, useInfo] = useState(null)
//
//     React.useEffect(() => {
//         getInfo();
//     }, [])
//
//
//
//
//     console.log("main")
//     return (
//         <section className="main-content">
//             <Switch location={this.props.history.location}>
//                 <Route path={`/`}  exact component={Home}/>
//                 <Route path={`/:id`} component={PageDetails}/>
//                 {/* <Redirect to={`${this.props.match.url}`}/> */}
//             </Switch>
//         </section>
//
//     );
//
// };
//
// export default Main;