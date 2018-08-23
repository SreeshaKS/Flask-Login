import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Segment, Grid, Header, Image, Menu, Icon } from 'semantic-ui-react';

let loginPromptStyle = {
    'height': window.innerHeight * 0.2,
    'width': window.innerWidth * 0.2
}

export default class LoginPrompt extends Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: 'home' }
    }
    render() {
        const { activeItem } = this.state
        return (
            // <Grid centered padded>
            <Grid.Column>
                <Segment raised style={loginPromptStyle}>
                    <Header as='h2' icon textAlign='center'>
                        <Icon name='user' circular />
                        <Header.Content>
                            Please Login To Proceed
                            </Header.Content>
                    </Header>
                </Segment>
            </Grid.Column>
            // </Grid>
        );
    }
}