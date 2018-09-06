import * as React from 'react';
import '../page-styles.css';
import {EmployeeHeader} from '../header-components/employee-header-component';
import {TicketWindow} from '../data-components/ticket-window/ticket-window-component';
import {NewTicket} from '../data-components/new-ticket/new-ticket-component';

interface EmployeeData
{
    id: number;
    amount: number;
    submitted: string;
    resolved: string;
    resolvedBy: string;
    type: string;
    status: string;
}
interface IState
{
    data: EmployeeData[];
}

export class EmployeeTickets extends React.Component<any, IState>
{
    constructor(props: any)
    {
        super(props);
        this.setData();
    }

    public render()
    {
        const headers = ["ID", "Amount", "Date Submitted", "Date Resolved", "Resolved By", "Type", "Status"];

        return(
            <div className="pageContainer">
                <EmployeeHeader/>
                <div className="pageBackground"></div>
                <div className="pageContent">
                    <NewTicket/>
                    <TicketWindow headers={headers} data={this.state.data} rowClicked={this.rowClicked}/>
                </div>
            </div>
        )
    }

    public rowClicked(id: number)
    {
        alert(id);
    }

    public setData()
    {

    }
}