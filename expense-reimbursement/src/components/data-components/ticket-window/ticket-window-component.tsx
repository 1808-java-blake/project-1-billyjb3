import * as React from 'react';
import './ticket-window-styles.css';
// import {TicketTD} from './ticket-td';
import {TicketTH} from "./ticket-header";

interface IProps
{
    headers: string[],
    // data: [{}]
}

export const TicketWindow: React.StatelessComponent<IProps> = (props) => {
    const {headers} = props;
    const header = []; 
    for(let i = 0; i < headers.length; i++)
    {
        console.log(i);
        header.push(<TicketTH text={headers[i]}/>);
    }

    return (
        <div className="ticketsDiv">
            <table className="ticketTable">
                <tr>
                    {header}
                </tr>
                <tr>
                    <td>1</td>
                    <td>200$</td>
                    <td>12-05-2003</td>
                    <td>12-07-2003</td>
                    <td>Jimmy John</td>
                    <td>Travel</td>
                    <td>Resolved</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>200$</td>
                    <td>12-05-2003</td>
                    <td>12-07-2003</td>
                    <td>Jimmy John</td>
                    <td>Travel</td>
                    <td>Resolved</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>200$</td>
                    <td>12-05-2003</td>
                    <td>12-07-2003</td>
                    <td>Jimmy John</td>
                    <td>Travel</td>
                    <td>Resolved</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>200$</td>
                    <td>12-05-2003</td>
                    <td>12-07-2003</td>
                    <td>Jimmy John</td>
                    <td>Travel</td>
                    <td>Resolved</td>
                </tr>
            </table>
        </div>
    );
}