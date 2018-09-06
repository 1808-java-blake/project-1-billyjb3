import * as React from 'react';
//import {TicketTD} from './ticket-td';

interface IProps
{
    data: {};
    rowClicked: (id: number) => void;
}

export const TicketDataRow: React.StatelessComponent<IProps> = (props) =>
{
    const {data, rowClicked} = props;
    let columns:any = [];
    Object.keys(data).map((key) => {
        console.log("key: "+key)
        columns.push(<td>{data[key]}</td>);
    })

    return (
        <tr onClick={() => rowClicked(data["id"])}>{columns}</tr>
    )
}