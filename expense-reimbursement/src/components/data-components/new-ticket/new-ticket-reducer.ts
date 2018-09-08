import * as types from './new-ticket-action';
import {NewTicketState} from './new-ticket-component';

const initialState: NewTicketState = {
    amount: 0,
    description: "",
    reimbType: 1
}

export const newTicketReducer = (state = initialState, action: any) =>
{
    const type = action.type;
    if(type === types.AMOUNT)
    {
        return {
            ...state,
            amount: action.amount
        };
    }
    else if(type === types.REIMB_TYPE)
    {
        return {
            ...state,
            reimbType: action.reimbType
        };
    }
    else if(type === types.DESCRIPTION)
    {
        return {
            ...state,
            description: action.description
        };
    }
    else
    {
        return state;
    }
}