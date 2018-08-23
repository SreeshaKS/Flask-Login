import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Message, Input, Label, Modal, Icon, Card, Segment, Grid, Header, Image, Button } from 'semantic-ui-react';
import config from '../../config'
import FetchAPI from '../apis'

let rechargeAmount = '';
class RechargeModal extends Component {
    constructor(props) {
        super(props)
    }
    onChange = (e, d, shouldSubmit = false) => shouldSubmit ? this.props.onSubmit(e, rechargeAmount) : rechargeAmount = d.value
    render() {
        return (
            <Modal open={this.props.open} trigger={this.props.trigger} basic size='small'>
                <Header icon='archive' content='Enter Recharge Amount' />
                <Modal.Content>
                    <p></p>
                    <Input type="number" onChange={this.onChange} labelPosition='right' type='text' placeholder='Amount'>
                        <Label basic>Rp</Label>
                        <input />
                    </Input>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.props.onCancel} basic color='red' inverted>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button onClick={(e, d) => this.onChange(e, d, true)} color='green' inverted>
                        <Icon name='checkmark' /> Request
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            debtorData: this.props.debtorData,
            rechargeAmount: '',
            modalOpen: false,
            isRechargeCancelled: false,
        }
    }
    componentWillReceiveProps(nP) {
        this.setState({
            user: nP.user,
            debtorData: nP.debtorData
        });
    }
    onRechargeClick = (e, d) => {

    }
    onRechargeCancel = (e, d) => this.setState({ isRechargeCancelled: true })
    onRechargeRequestSubmit = (e, rechargeAmount) =>
        FetchAPI
            .post(config.serverAuthority + '/requestRecharge'
                , {
                    userID: this.state.user.userID,
                    Debtor_strName: this.state.debtorData.Debtor_strName,
                    Debtor_strId: this.state.debtorData.Debtor_strId,
                    Recharge_IntAmount: rechargeAmount
                }
                , (e, d) => {
                    if (!e) {
                        let { debtorData } = this.state;
                        d.ok ? debtorData.isRechargeRequested = true
                            : debtorData.isRechargeRequested = false
                        debtorData.rechargeAmount = rechargeAmount;
                        this.setState({ rechargeAmount: rechargeAmount, debtorData: debtorData, modalOpen: false })
                    }
                }
                , { 'content-type': 'application/json' });
    onRechargeRequestCancelled = () => this.setState({ modalOpen: false })
    render() {
        let { Debtor_strName, Debtor_curConsumed, Debtor_curLimit, Debtor_strMailId, rechargeAmount, Debtor_curBalance, isRechargeRequested } = this.state.debtorData;
        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <Card>
                        <Card.Content>
                            <Card.Header>
                                {Debtor_strName}
                            </Card.Header>
                            <Card.Meta>
                                {Debtor_strMailId}
                            </Card.Meta>
                            <Card.Description>
                                Current Limit : {Debtor_curLimit.toLocaleString()}
                                <br />
                                Balance : {Debtor_curBalance.toLocaleString()}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <RechargeModal
                                    trigger={<Button size="tiny" onClick={() => this.setState({ modalOpen: true })} disabled={isRechargeRequested} basic color='green'>{isRechargeRequested ? "Recharge Requested" : "Request recharge"}</Button>}
                                    onSubmit={this.onRechargeRequestSubmit}
                                    onCancel={this.onRechargeRequestCancelled}
                                    open={this.state.modalOpen}
                                />
                                {/* <br/>
                                <Button basic size="tiny" color='red'>Refresh Status</Button> */}
                            </div>
                            {isRechargeRequested ?
                                <Message warning>
                                    <Message.Header>Recharge Requested for Rp {rechargeAmount}</Message.Header>
                                    {/* <p>Click to cancel request</p>  <Button onClick={this.onRechargeCancel} size="mini" primary color='red'>Cancel</Button> */}
                                </Message>
                                : ''}
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
        );
    }
}