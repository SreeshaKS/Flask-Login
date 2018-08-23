import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Popup,Button, Form, Message,Segment ,Grid ,Image, Container, Card , Divider ,Icon, Input} from 'semantic-ui-react';


class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errType: null,
            header:'',
            content:''
        };
    } 
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    handleValidation(errType,header,content) {
            this.setState({
                errType,
                header,
                content
            });
    }
    renderFormElements(errType,header,content){
        if(errType=="error")
            return (
                <div>
                    <Form.Input focus placeholder='User Name' name='username' onChange={this.handleChange}/>
                    <Message error header={header} content={content} />
                    <Form.Input placeholder='Password' name='password' type='password' onChange={this.handleChange}/>
                    <Form.Button color={this.props.buttonColor} content='Login' />
                </div>
            );
        else if(errType=="warning")
            return (
                <div>
                    <Form.Input focus placeholder='User Name' name='username' onChange={this.handleChange}/>
                    <Message warning header={header} content={content} />
                    <Form.Input placeholder='Password' name='password' type='password' onChange={this.handleChange}/>
                    <Form.Button color={this.props.buttonColor} content='Login' />
                </div>
            );
        else if(errType=="success")
            return (
                <div>
                    <Form.Input success placeholder='User Name' name='username' onChange={this.handleChange}/>
                    <Message success header={header} content={content} />
                    <Form.Input placeholder='Password' name='password' type='password' onChange={this.handleChange}/>
                    <Form.Button color={this.props.buttonColor} content='Login'/>
                </div>
            );
        return (
            <div>
                <Form.Input placeholder='User Name' name='username' onChange={this.handleChange}/>
                <Form.Input placeholder='Password' name='password' type='password' onChange={this.handleChange}/>
                <Form.Button color={this.props.buttonColor} content='Login' />
            </div>
        );
    }
    renderForm(errType,header,content){
        if(errType)
            if(errType=="error")
                return (
                    <Form error onSubmit={ () => this.props.onSubmit(null,{'username':this.state.username,'password':this.state.password},this.handleValidation.bind(this)) }>
                        {this.renderFormElements(errType,header,content)}
                    </Form>
                );
            else if(errType=="warning")
                return (
                    <Form warning onSubmit={ () => this.props.onSubmit(null,{'username':this.state.username,'password':this.state.password},this.handleValidation.bind(this)) }>
                        {this.renderFormElements(errType,header,content)}
                    </Form>
                );
           
        return (
            <Form success onSubmit={ () => this.props.onSubmit(null,{'username':this.state.username,'password':this.state.password},this.handleValidation.bind(this)) }>
                {this.renderFormElements(errType,header,content)}
            </Form>
        );  
    }
    render() {
        const {errType,header,content} = this.state;
        return (
            <Grid columns='equal'>
                <Grid.Row centered columns={1}>
                    <Grid.Column verticalAlign='middle'>    
                        <Image centered rounded height='150' width='150' src='' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered columns={1}>
                    <Grid.Column verticalAlign='middle'>
                       {this.renderForm(errType,header,content)}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered columns={1}>
                    <Grid.Column verticalAlign="middle">
                    <a href={this.props.forgotPassword} >Forgot Password ?</a> 
                    </Grid.Column>
                </Grid.Row >
            </Grid>
        )
    }
}

class LoginCard extends React.Component{
    constructor(props){
        super(props);
    }  
    render(){
        return (
                <Grid >
                    <Grid.Row centered columns={1}>
                        <Grid.Column verticalAlign='middle'>  
                            {/* <Card extra={<LoginForm onSubmit={this.props.onSubmit} onValidated={this.props.onValidated} forgotPassword={this.props.forgotPassword}/>} /> */}
                            <LoginForm buttonColor={this.props.buttonColor} onSubmit={this.props.onSubmit} onValidated={this.props.onValidated} forgotPassword={this.props.forgotPassword}/>
                        </Grid.Column>
                    </Grid.Row >
                 </Grid> 
        )
    }
}

class LoginPopup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoggedIn:this.props.isLoggedIn
        }
    }
    componentDidMount(){
        this.setState({
            isLoggedIn:this.props.isLoggedIn
        });
    }
    componentWillReceiveProps(nP){
        this.setState({
            isLoggedIn:nP.isLoggedIn
        });
    }
    render(){
        if(this.state.isLoggedIn){
            return (
                <Button onClick={this.props.onLogOut} color={this.props.buttonColor} content={this.props.buttonContent} />
            )
        }else{
            return (
                <Popup
                    trigger={<Button color={this.props.buttonColor} content={this.props.buttonContent} />}
                    content={<LoginCard buttonColor={this.props.buttonColor} onSubmit={this.props.onSubmit} onValidated={this.props.onValidated} forgotPassword={this.props.forgotPassword}/>}
                    on='click'
                    position='bottom right'
                />
            )
        }
    }
}
export default LoginPopup;