import * as React from 'react';
import './ticket-window-styles.css';
// import {TicketTD} from './ticket-td';
import {TicketTH} from "./ticket-header";
import {TicketDataRow} from './ticket-data-row';


interface IProps
{
    rowClicked: (id: number) => void;
    headers: string[];
    data: {}[];
}

export const TicketWindow: React.StatelessComponent<IProps> = (props) =>
{
    const {headers, data, rowClicked} = props;
    const header = []; 
    for(let i = 0; i < headers.length; i++)
    {
        console.log("ignore this; linting bullshit workaround "+i);
        header.push(<TicketTH text={headers[i]}/>);
    }

    const rows = [];
    for(let i = 0; i < data.length; i++)
    {
        rows.push(<TicketDataRow rowClicked={rowClicked} data={data[i]}/>);
    }

    return (
        <div className="ticketsDiv">
            <h2>Tickets</h2><hr/><br/>
            <table className="ticketTable">
                <tr>
                    {header}
                </tr>
                {rows}
            </table>
        </div>
    )
}