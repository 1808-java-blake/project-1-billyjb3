import * as React from 'react';
import {ManagerHeader} from '../header-components/manager-header-component';
import '../page-styles.css';
import {TicketWindow} from '../data-components/ticket-window/ticket-window-component';
import {TicketUser} from '../data-components/ticket-user-info/ticket-user-component';

interface ManagerState
{
    data: {}[];
    selectedTicket: {};
}

export class ManagerTickets extends React.Component<any, ManagerState>
{
    constructor(props: any)
    {
        super(props);
        this.state = {
            data: [],
            selectedTicket: {},
        }
        this.rowClicked = this.rowClicked.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.setData("all");
    }

    public render()
    {
        const headers = ["ID", "Amount", "Author", "Date Submitted", "Date Resolved", "Resolved By", "Type", "Description", "Status"];
        return (
            <div className="pageContainer">
                <ManagerHeader/>
                <div className="pageBackground"></div>
                <div className="pageContent">
                    <div className="sectionTitle"><br/><h2>Employee Ticket</h2><hr/><br/></div>
                    <TicketUser data={this.state.selectedTicket} setReimbStatus={this.setStatus}/>
                    <div className="sectionTitle"><h2>Tickets</h2><hr/><br/></div>
                    <select onChange={this.setFilter}>
                        <option value="all">all</option>
                        <option value="pending">pending</option>
                        <option value="approved">approved</option>
                        <option value="denied">denied</option>
                    </select>
                    <TicketWindow headers={headers} data={this.state.data} rowClicked={this.rowClicked}/>
                </div>
            </div>
        )
    }

    public setFilter(e: any)
    {
        this.setData(e.target.value);
    }

    public setStatus(ticketId: number, statusId: number)
    {
        const userString = localStorage.getItem("user");
        if(userString)
        {
            const user = JSON.parse(userString);
            const userId = user["ers_users_id"];
            alert(userId);
            const body = {ticketId: ticketId, statusId: statusId, managerId: userId};
            fetch("http://localhost:3001/er_router/set-reimbursement-status", {
                body: JSON.stringify(body),
                credentials: "include",
                headers: {
                    "Content-Type":"application/json"
                },
                method: "POST"
            })
            this.setData("all");
            this.rowClicked(this.state.selectedTicket["ticketId"]);
        }
    }

    public rowClicked(ticketId: number)
    {
        const id = {reimb_id: ticketId};
        fetch("http://localhost:3001/er_router/reimbursement-by-id", {
            body: JSON.stringify(id),
            credentials: "include",
            headers: {
                "Content-Type":"application/json"
            },
            method: "POST"
        })
        .then(resp => {
            if(resp.status === 200)
            {
                return resp.json();
            }
            throw Error("Could not retrieve reimbursement by id");
        })
        .then(ticket => {
            const data = {
                employeeName: ticket[0].author_firstname + " " + ticket[0].author_lastname,
                employeeId: ticket[0].author_id,
                employeeUsername: ticket[0].author_username,
                employeeEmail: ticket[0].author_email,
                ticketId: ticket[0].reimb_id,
                ticketAmount: ticket[0].reimb_amount,
                ticketType: ticket[0].reimb_type,
                ticketStatus: ticket[0].reimb_status,
                ticketDescription: ticket[0].reimb_description
            }
            this.setState({
                ...this.state,
                selectedTicket: data
            })
        })
    } 

    public setData(filter: string)
    {

        let url = "http://localhost:3001/er_router/reimbursements"
        if(filter == "approved")
        {
            url = "http://localhost:3001/er_router/approved-reimbursements";
        }
        else if(filter == "denied")
        {
            url = "http://localhost:3001/er_router/denied-reimbursements";
        }
        else if(filter == "pending")
        {
            url = "http://localhost:3001/er_router/pending-reimbursements";
        }

        fetch(url, {
            credentials: "include",
            headers: {
                "Content-Type":"application/json"
            },
            method: "GET"
        })
        .then(resp => {
            if(resp.status === 200)
            {
                return resp.json();
            }
            throw Error("Could not retrieve reimbursement data")
        })
        .then(data => {
            const formated = [];
                for(let i = 0; i < data.length; i++)
                {
                    const reimb = {
                        id: data[i].reimb_id,
                        amount: "$"+data[i].reimb_amount,
                        author: data[i].author_firstname + " " + data[i].author_lastname,
                        submitted: data[i].reimb_submitted.substring(0, 10),
                        resolved: data[i].reimb_resolved,
                        resolver: data[i].resolver_firstname + " " + data[i].resolver_lastname,
                        type: data[i].reimb_type,
                        description: data[i].reimb_description,
                        status: data[i].reimb_status
                    }
                    if(reimb.resolved)
                    {
                        reimb.resolved = reimb.resolved.substring(0,10);
                    }
                    formated.push(reimb);
                }
                this.setState({
                    data: formated
                })
        })       
    }
}