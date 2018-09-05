import * as React from 'react';
import {TicketTD} from './ticket-td';

interface IProps
{
    data: string[]
}

export const TicketDataRow: React.StatelessComponent<IProps> = (props) =>
{
    const {data} = props;
    let columns = [];
    for(let i = 0; i < data.length; i++)
    {
        columns.push(<TicketTD text={data[i]}/>);
    }
    return (
        <tr>{columns}</tr>
    )
}