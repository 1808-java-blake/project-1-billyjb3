import * as React from 'react';
import './new-ticket-styles.css';
import {connect} from 'react-redux';
import * as ticketActions from './new-ticket-action';
// import {RouteComponentProps} from 'react-router';

export interface IState
{
    amount: number,
    reimbType: string,
    description: string
}

// interface IProps extends RouteComponentProps<{}>, IState
// {
//     updateAmount: (amount: number) => any,
//     updateReimbType: (reimbType: string) => any,
//     updateDescription: (description: string) => any
// }


export class NewTicket extends React.Component
{
    constructor(props: any)
    {
        super(props);
    }

    public render()
    {
        // const {amount, reimbType, description} = this.props;
        return(
            <div className="ticketInputDiv pt2">
                <h2>Submit New Ticket</h2><hr/>
                <div className="inputGrid mt1">
                    <div className="inputBox">
                        <p>Type:</p>
                        <select className="ticketInput">
                            <option>Lodging</option>
                            <option>Travel</option>
                            <option>Food</option>
                            <option>Other</option>
                        </select><hr/>
                    </div>
                    <div className="inputBox">
                        <p>Amount:</p>
                        <input className="ticketInput" type="text"  /><hr/>
                    </div>
                    <div className="inputBox">
                        <p>Description:</p>
                        <input type="text" className="ticketInput" /><hr/>
                    </div>
                    <div className="inputBox">
                        <button className="button">Submit</button>
                    </div>
                </div>
            </div>
        )
    }

    public amountChanged(e: any)
    {
        // this.props.updateAmount(e.target.value);
    }

    public typeChanged(e: any)
    {
        // this.props.updateReimbType(e.target.value);
    }

    public descriptionChanged(e: any)
    {
        // this.props.updateDescription(e.targer.value);
    }
}

const mapStateToProps = (state: any) => (state.newTicketReducer);
const mapDispatchToProps = {
    updateAmount: ticketActions.updateAmount,
    updateReimbType: ticketActions.updateReimbType,
    updateDescription: ticketActions.updateDescription
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTicket);