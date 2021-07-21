// import React, {useState} from "react";
// import { IListProps } from "types/components/list/IList";
// import GoogleMapComponent from "../map/Map";
//
// const List: React.FunctionComponent<IListProps> = (props: IListProps): JSX.Element =>
// {
//     const [list, useList] = useState(null)
//
//     console.log("fght", props)
//
//
//     React.useEffect(() => {
//         getList();
//     }, [])
//
//
//     const onItemClick = (id:string) => {
//         props.history.push(`/${id}`)
//     }
//
//
//     const getList = async () =>
//     {
//         try {
//             const res = await fetch('/restorants/list', {
//               method: 'get',
//             //   body: JSON.stringify({ email, password }),
//               headers: {'Content-Type': 'application/json'}
//             });
//             const list = await res.json();
//             console.log(list);
//             if (list.errors) {
//
//                 //es pah@ nayels kareli a errors shprtel
//                 console.log(list.errors);
//             }
//             if (list.data) {
//               console.log("mtav front getrestorantsList", list.data)
//               useList(list.data)
//             }
//           }
//           catch (err) {
//             console.log(err);
//           }
//     };
//
//
//
//     return (
//
//
//
//     );
//
// };
//
// export default List;