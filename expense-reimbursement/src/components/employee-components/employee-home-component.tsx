import * as React from 'react';
import {EmployeeHeader} from '../header-components/employee-header-component';
import '../page-styles.css';

export class EmployeeHome extends React.Component
{
    public render()
    {
        return(
            <div className="pageContainer">
                <EmployeeHeader/>
                <div className="pageBackground"></div>
                <div className="pageContent">
                    <p>HOME!</p>
                </div>
            </div>
        )
    }
}