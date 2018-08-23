import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Container, Segment, Icon, Header } from 'semantic-ui-react';
import AppHeader from './components/header';
import MainPage from './components/mainPage';
import FetchAPI from './apis';
import config from '../config';

let loginPromptStyle = {
    'height': window.innerHeight * 0.2,
    'width': window.innerWidth * 0.2
}

let items = [
    {
        itemName: 'home',
        itemID: 'home',
        itemIcon: 'home'
    },
    {
        itemName: 'thirdParty',
        itemID: 'thirdParty',
        itemIcon: 'users'
    }
];

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            error: null,
            debtorData: null
        }
    }
    setInitalState = (data,isLoggedIn) => {
        this.setState({
            data
            ,isLoggedIn
        });
    }
    callbacks = {
        onLogIn: (data,onValidated) => {
            FetchAPI
                .post(
                    config.serverAuthority + config.PATH_LOGIN
                    , {
                        username: data.username,
                        password: data.password
                    }
                    , (e, d) => {
                        console.log('test',e,d)
                        if (!e) {
                            if (d.ok == 'true') {
                                onValidated("success", 'Logged In', 'Proceed')
                                this.setInitalState(d,true);
                            } else {
                                onValidated("error", d, 'Password or username is wrong')
                                //let error = { 'code': d.status, 'message': d.statusText }
                            }
                        } else {
                            onValidated("error", 'Error', JSON.stringify(d) + JSON.stringify(e));
                            //let error = { 'code': d.status || '', 'message': (d.statusText) || JSON.stringify(d) + JSON.stringify(e) }
                        }
                    }, {
                        'content-type': 'application/json'
                    });
        },
        onLogOut: () => FetchAPI.get(config.serverAuthority + config.PATH_LOGOUT, {}, (e, d) => this.setState({ isLoggedIn: false})),
        
    }
    componentDidMount() {
        // /s!this.state.isLoggedIn ? this.callbacks.onLogIn() : ''
    }
    render() {
        let { isLoggedIn,data } = this.state;
        console.log('LoggedIn',isLoggedIn)
        return (
            <div>
                <Grid centered fluid columns={1}>
                    <Grid.Row centered>
                        <AppHeader isLoggedIn={isLoggedIn} callbacks={this.callbacks} />
                    </Grid.Row>
                    {isLoggedIn ?
                        <Grid.Row centered columns={2}>
                            <MainPage
                                items={items}
                                user={data}
                                isLoggedIn={isLoggedIn}
                                callbacks={this.callbacks}
                            />
                        </Grid.Row> :
                        <Grid.Row centered>
                            <Segment raised style={loginPromptStyle}>
                                <Header as='h2' icon textAlign='center'>
                                    <Icon name='user' circular />
                                    <Header.Content>
                                        Please Login To Proceed
                                </Header.Content>
                                </Header>
                            </Segment>
                        </Grid.Row>}
                </Grid>
            </div>
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('app')
);