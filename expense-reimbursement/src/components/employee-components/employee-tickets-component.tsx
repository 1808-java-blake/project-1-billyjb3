import * as React from 'react';
import '../page-styles.css';
import {EmployeeHeader} from '../header-components/employee-header-component';
import {TicketWindow} from '../data-components/ticket-window/ticket-window-component';
import {NewTicket} from '../data-components/new-ticket/new-ticket-component';

export class EmployeeTickets extends React.Component
{
    public render()
    {
        const headers = ["ID", "Amount", "Date Submitted", "Date Resolved", "Resolved By", "Type", "Status"];

        return(
            <div className="pageContainer">
                <EmployeeHeader/>
                <div className="pageBackground"></div>
                <div className="pageContent">
                    <NewTicket/>
                    <TicketWindow headers={headers}/>
                </div>
            </div>
        )
    }
}