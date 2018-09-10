import * as React from 'react';
import './ticket-user-styles.css';

interface TicketUserProps
{
    data: {};
    setReimbStatus: (reimbId: number, statusId: number) => void;
}

export class TicketUser extends React.Component<TicketUserProps, any>
{
    public render()
    {
        const buttons = [];
        if(this.props.data["ticketStatus"] === "pending")
        {
            buttons.push(<button onClick={() => this.props.setReimbStatus(this.props.data["ticketId"], 1)} className="managerButton approve">Approve</button>);
            buttons.push(<button onClick={() => this.props.setReimbStatus(this.props.data["ticketId"], 2)} className="managerButton deny">Deny</button>);
        }
        return (
            <div className="ticketUserDiv">
                <div>
                    <h2>{this.props.data["employeeName"]}</h2>
                    <p>Employee id: {this.props.data["employeeId"]}</p>
                    <p>Employee Username: {this.props.data["employeeUsername"]}</p>
                    <p>Employee Email: {this.props.data["employeeEmail"]}</p>
                </div>
                <div>
                    <h2>Ticket {this.props.data["ticketId"]}</h2>
                    <p>Amount:{this.props.data["ticketAmount"]}</p>
                    <p>Type:{this.props.data["ticketType"]}</p>
                    <p>Status:{this.props.data["ticketStatus"]}</p>
                    <p>Description:{this.props.data["ticketDescription"]}</p>
                    {buttons}
                </div>
            </div>
        )
    }
}