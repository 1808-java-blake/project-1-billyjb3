import * as React from 'react';
import '../page-styles.css';
import {EmployeeHeader} from '../header-components/employee-header-component';
import {TicketWindow} from '../data-components/ticket-window/ticket-window-component';
import {NewTicket} from '../data-components/new-ticket/new-ticket-component';

// interface EmployeeData
// {
//     id: number;
//     amount: number;
//     submitted: string;
//     resolved: string;
//     resolvedBy: string;
//     type: string;
//     status: string;
// }
interface IState
{
    data: any[];
}

export class EmployeeTickets extends React.Component<any, IState>
{
    constructor(props: any)
    {
        super(props);
        this.state = {
            data: [ ]
        }
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
        const userString = localStorage.getItem("user");
        if(userString)
        {
            const user = JSON.parse(userString);
            alert(user.ers_users_id);
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
                console.log(data);
                console.log(data.length);
                this.setState({
                    data
                })
            })

        }
        else
        {
            alert("no user logged In!!");
        }
        
    }
}