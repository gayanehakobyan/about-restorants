import {RouteComponentProps} from "react-router";

export interface IHomeProps extends RouteComponentProps
{

}

export interface IHomeState
{
    list: IListData[];
    selectedRestorantIndex: number;
}


export interface IListData
{
    name: string;
    address: string;
    _id: string;
    map_address: string;
    rate: number;
    center:string[];
}