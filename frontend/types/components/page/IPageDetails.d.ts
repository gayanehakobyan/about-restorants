import {RouteComponentProps} from "react-router";

export interface IPageDetailsProps extends RouteComponentProps
{

}


export interface IItemDetails
{
    feedback: string[];
    rate: number;
    name: string
}
