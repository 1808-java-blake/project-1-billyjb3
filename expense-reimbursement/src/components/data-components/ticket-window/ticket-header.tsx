import * as React from 'react';

interface IProps
{
    text: string;
}

export const TicketTH: React.StatelessComponent<IProps> = (props) => {
    const {text} = props;
    return(
        <th>{text}</th>
    )
}