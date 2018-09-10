import * as React from 'react';
import './new-ticket-styles.css';
import {connect} from 'react-redux';
import * as ticketActions from './new-ticket-action';

export interface NewTicketState
{
    amount: number,
    reimbType: number,
    description: string
}

interface IProps
{
    submitTicket: (state: NewTicketState) => void;
}

export class NewTicket extends React.Component<IProps ,NewTicketState>
{
    constructor(props: any)
    {
        super(props);
        this.state = {
            amount: 0,
            reimbType: 1,
            description: ""
        }
    }

    public render()
    {
        return(
            <div className="ticketInputDiv pt2">
                <h2>Submit New Ticket</h2><hr/>
                <div className="inputGrid mt1">
                    <div className="inputBox">
                        <p>Type:</p>
                        <select id="typeSelect" className="ticketInput" onChange={this.typeChanged}>
                            <option value="1">Lodging</option>
                            <option value="2">Travel</option>
                            <option value="3">Food</option>
                            <option value="4">Other</option>
                        </select><hr/>
                    </div>
                    <div className="inputBox">
                        <p>Amount:</p>
                        <input className="ticketInput" type="text" onChange={this.amountChanged}/><hr/>
                    </div>
                    <div className="inputBox">
                        <p>Description:</p>
                        <input type="text" className="ticketInput" onChange={this.descriptionChanged}/><hr/>
                    </div>
                    <div className="inputBox">
                        <button className="button" onClick={() => this.props.submitTicket(this.state)}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }

    public amountChanged = (e: any) =>
    {
        const value = e.target.value;
        this.setState({
            ...this.state,
            amount: value
        })
    }

    public typeChanged = (e: any) =>
    {
        const value = e.target.options[e.target.selectedIndex].value;
        this.setState({
            ...this.state,
            reimbType: value
        })
    }

    public descriptionChanged = (e: any) =>
    {
        const value = e.target.value;
        this.setState({
            ...this.state,
            description: value
        })
    }
}

const mapStateToProps = (state: any) => (state.newTicketReducer);
const mapDispatchToProps = {
    updateAmount: ticketActions.updateAmount,
    updateReimbType: ticketActions.updateReimbType,
    updateDescription: ticketActions.updateDescription
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTicket);