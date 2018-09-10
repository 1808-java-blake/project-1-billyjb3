import * as React from 'react';
import '../page-styles.css';
import {EmployeeHeader} from '../header-components/employee-header-component';
import {TicketWindow} from '../data-components/ticket-window/ticket-window-component';
import {NewTicket} from '../data-components/new-ticket/new-ticket-component';
import {NewTicketState} from '../data-components/new-ticket/new-ticket-component';

interface IState
{
    data: {}[];
}

export class EmployeeTickets extends React.Component<any, IState>
{
    constructor(props: any)
    {
        super(props);
        this.state = {
            data: [ ]
        }
        this.submitTicket = this.submitTicket.bind(this);
        this.setData();
    }

    public render()
    {
        const headers = ["ID", "Amount", "Date Submitted", "Date Resolved", "Resolved By", "Type", "Description", "Status"];

        console.log("Employee Tickets this.state.data: "+this.state.data);
        return(
            <div className="pageContainer">
                <EmployeeHeader/>
                <div className="pageBackground"></div>
                <div className="pageContent">
                    <NewTicket submitTicket={this.submitTicket}/>
                    <TicketWindow headers={headers} data={this.state.data} rowClicked={this.rowClicked}/>
                </div>
            </div>
        )
    }

    public submitTicket(state: NewTicketState)
    {
        const userString = localStorage.getItem("user");
        if(userString)
        {
            const user = JSON.parse(userString);
            const userid = user.ers_users_id;
            const ticket = {
                amount: state.amount,
                description: state.description,
                author: userid,
                type: state.reimbType
            }
            fetch("http://localhost:3001/er_router/new-ticket", {
                body: JSON.stringify(ticket),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST"
            })
            .then(resp => {
                if(resp.status === 200)
                {
                    alert("Ticket Submitted");
                    this.setData();
                }
                else
                {
                    alert("Unable to create new ticket");
                }
            })
        }
    }

    public rowClicked(id: number)
    {
        alert(id);
    }

    public setData()
    {
        const userString = localStorage.getItem("user");
        if(userString)
        {
            fetch("http://localhost:3001/er_router/user-reimbursements", {
            body: userString,
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
            })
            .then(resp => {
                if(resp.status === 200)
                {
                    return resp.json();
                }
                else
                {
                    alert("could not retrieve your reimbursements!");
                }
                throw Error("Username or Password were incorrect");
            })
            .then(data => {
                const formated = [];
                for(let i = 0; i < data.length; i++)
                {
                    const reimb = {
                        id: data[i].reimb_id,
                        amount: data[i].reimb_amount,
                        submitted: data[i].reimb_submitted.substring(0, 10),
                        resolved: data[i].reimb_resolved,
                        resolver: data[i].resolver_firstname + " " + data[i].resolver_lastname,
                        type: data[i].reimb_type,
                        description: data[i].reimb_description,
                        status: data[i].reimb_status
                    }
                    formated.push(reimb);
                }
                this.setState({
                    data: formated
                })
            })

        }
        else
        {
            alert("no user logged In!!");
        }
        
    }
}