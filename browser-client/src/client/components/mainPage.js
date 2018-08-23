import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Segment, Grid, Header, Image } from 'semantic-ui-react';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'home',
            userData:this.props.user
        }
    }
    componentWillReceiveProps(nP) {
        this.setState({ userData: nP.user });
    }
    render() {
        let { userData } = this.state;
        console.log('data',userData)
            return (
                <Grid centered padded>

                    {
                        userData.userData.map((e,i)=>{
                            return (
                                <Grid.Column key={i} color='blue' width={2}>
                                    {e}
                                </Grid.Column>
                            )
                        })
                    }
                </Grid>
            );
    }
}