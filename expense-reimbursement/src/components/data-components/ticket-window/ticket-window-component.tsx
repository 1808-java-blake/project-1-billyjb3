import * as React from 'react';
import './ticket-window-styles.css';
import {TicketTH} from "./ticket-header";
import {TicketDataRow} from './ticket-data-row';


interface IProps
{
    rowClicked: (id: number) => void;
    headers: string[];
    data: {}[];
}

export class TicketWindow extends React.Component<IProps, any>
{
    public render()
    {
        const header = []; 
        for(let i = 0; i < this.props.headers.length; i++)
        {
            console.log("ignore this; linting bullshit workaround "+i);
            header.push(<TicketTH text={this.props.headers[i]}/>);
        }

        const rows = [];
        for(let i = 0; i < this.props.data.length; i++)
        {
            rows.push(<TicketDataRow rowClicked={this.props.rowClicked} data={this.props.data[i]}/>);
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
}