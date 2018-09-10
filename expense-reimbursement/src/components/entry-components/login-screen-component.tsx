import * as React from 'react';
import {Link} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import './entry-styles.css';

interface IState
{
    credentials: {
        password: string, 
        username: string
    }
}
export class LoginScreen extends React.Component<RouteComponentProps<{}>, IState>
{
    constructor(props: any)
    {
        super(props);
        this.state = {
            credentials: {
                password: "",
                username: ""
            }
        }
    }

    public render()
    {
        return(
            <div className="loginScreen">
                <div className="boxHeader">
                    <h2>Employee Login</h2>
                </div>
                <div className="loginMain">
                    <div className="inputGroup">
                        <p className="loginLabels">Username:</p>
                        <input className="loginInput" type="text" onChange={this.usernameChanged}/><hr/>
                        <p className="loginLabels">Password:</p>
                        <input className="loginInput" type="password" onChange={this.passwordChanged}/><hr/>
                        <button onClick={this.login} className="entryButton mt7">Login</button>
                    </div>
                    <div className="optionsGroup">
                        <Link to="/register" className="options">
                            <p className="options">register</p>
                        </Link><br/>
                        
                    </div>
                </div>
            </div>
        )
    }

    public usernameChanged = (e: any) =>
    {
        this.setState({
            ...this.state,
            credentials: {
                ...this.state.credentials,
                username: e.target.value
            }
        });
    }

    public passwordChanged = (e: any) =>
    {
        this.setState({
            ...this.state,
            credentials: {
                ...this.state.credentials,
                password: e.target.value
            }
        })
    }

    public login = () =>
    {
        fetch("http://localhost:3001/er_router/login", {
            body: JSON.stringify(this.state.credentials),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST"
        })
        .then(resp => {
            if(resp.status === 401)
            {
                alert("Invalid Username or Password");
            }
            else if(resp.status === 200)
            {
                return resp.json();
            }
            throw Error("Username or Password were incorrect");
        })
        .then(resp => {
            localStorage.setItem("user", JSON.stringify(resp))
            const userRole = resp.user_role_id;
            if(userRole)
            {
                if(userRole === 1)
                {
                    this.props.history.push("/employee-home");
                }
                else if(userRole === 2)
                {
                    this.props.history.push("/manager-home");
                }
            }
            
        })
        .catch(err => {
            console.log(err);
        })
    }
}