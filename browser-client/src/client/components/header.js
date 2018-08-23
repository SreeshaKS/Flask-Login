import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Segment, Grid, Header, Image, Menu, Button } from 'semantic-ui-react';
import LoginPopup from './LoginPopupCard';
import FetchAPI from '../apis'
import config from '../../config'

let headerStyle = {
    "height": 70,
    "width": window.innerWidth
}

export default class AppHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render() {
        const { activeItem } = this.state
        const isLoggedIn = this.props.isLoggedIn;
        const { onLogIn, onLogOut } = this.props.callbacks;
        return (
            <Segment style={headerStyle} raised>
                <Grid centered >
                    <Grid.Row centered columns={2}>
                        <Grid.Column floated='right' width={9}>
                            <Header as='h1'>
                                {' '}Dashboard
                            </Header>
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <Menu compact secondary borderless stackable position='right'>
                                <Menu.Menu position='right'>
                                    <Menu.Item width={1}>
                                        <LoginPopup
                                            isLoggedIn={isLoggedIn}
                                            onLogOut={onLogOut}
                                            buttonColor="blue"
                                            buttonContent={isLoggedIn ? "Logout" : "Login"}
                                            forgotPassword="https://www.google.com"
                                            onSubmit={(event, data, onValidated) => onLogIn(data, onValidated)} />
                                    </Menu.Item>
                                </Menu.Menu>
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}