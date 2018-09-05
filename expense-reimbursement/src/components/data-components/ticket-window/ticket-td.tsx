import * as React from 'react';

interface IProps
{
    text: string;
}

export const TicketTD: React.StatelessComponent<IProps> = (props) => {
    const {text} = props;
    return(
        <td>{text}</td>
    )
}