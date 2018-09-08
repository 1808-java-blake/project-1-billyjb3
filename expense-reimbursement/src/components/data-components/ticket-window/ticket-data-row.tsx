import * as React from 'react';

interface IProps
{
    data: {};
    rowClicked: (id: number) => void;
}

export class TicketDataRow extends React.Component<IProps, any>
{
    constructor(props: IProps)
    {
        super(props);
    }

    public render()
    {
        let columns:any = [];
        Object.keys(this.props.data).map((key) => {
            console.log("key: "+key)
            columns.push(<td>{this.props.data[key]}</td>);
        })

        return (
            <tr className="dataRow" onClick={() => this.props.rowClicked(this.props.data["id"])}>{columns}</tr>
        )
    }
    
}