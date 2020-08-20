import React from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp'

export default class WhitepaperForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailMailchimpErrorMsg: '',
            emailCheckErrorMsg: '',
            emailSuccessMsg: '',
            serverError: '',
            showServerError: false,
            showCheckError: false,
            showMailchimpError: false,
            showSuccess: false,
            checked: false
        };
    }

    _handleCheckboxChange () {
        if (this.state.showCheckError && !this.state.checked){
            this._resetCheckError();
        }
        this.setState({checked: !this.state.checked});
    }

    _showCheckError(text) {
        this.setState({
            showCheckError: true,
            emailCheckErrorMsg: text
        });
    }

    _showMailchimpError(text) {
        this.setState({
            showMailchimpError: true,
            emailMailchimpErrorMsg: text
        });
    }

    _showServorErrorMsg(){
        this.setState({
            serverError: 'Keine Verbindung mit dem Server möglich. Bitte zu einem anderen Zeitpunkt erneut probieren.',
            showServerError: true
        });
    }

    _resetCheckError(){
        this.setState({
            showCheckError: false,
            emailCheckErrorMsg: ''
        });
    }

    _resetMailchimpMessage(){
        if (this.state.showMailchimpError || this.state.showSuccess){
            this.setState({
                showMailchimpError: false,
                emailMailchimpErrorMsg: '',
                showSuccess: false,
                emailSuccessMsg: ''
            });
        } 
    }

    _resetServerError(){
        //console.log('reset');
        if (this.state.showServerError){
            this.setState({
                serverError: '',
                showServerError: false
            });
        }
    }

    _showSuccessMessage(text){
        this.setState({
            showSuccess: true,
            emailSuccessMsg: text
        });
    }

    _handleSubmit = e => {
        this._resetServerError();
        this._resetMailchimpMessage();
        e.preventDefault();
        if (this.state.checked){
            addToMailchimp(this.refs.emailItem.value, {'group[19049][1]': '1'}) 
            .then(data => {
                if (data.result === 'error') {
                    this._showMailchimpError(data.msg);
                }else{
                    this._showSuccessMessage(data.msg);
                }
            })
            .catch(() => {
                this._showServorErrorMsg();
            })
        }else{
            this._showCheckError('Bitte bestätigen sie die Bedingungen.');
        }
    }

    render() {
        return (
            <div className="contact-form">
                <div className="contact-form-wrapper">
                    <div className="contact-form-name" style={{width: '100%'}}>
                        <form onSubmit={this._handleSubmit}>
                            <h3 style={{marginTop: '-10px'}} >Real Experts Newsletter</h3>
                            <input
                                style={{width: '70%'}}
                                placeholder="E-Mail Addresse"
                                name="email"
                                ref="emailItem"
                                type="text"
                                onChange={this._resetMailchimpMessage.bind(this)}
                            />
                            <div style={{color: '#ed6a14'}} dangerouslySetInnerHTML={{__html: this.state.emailMailchimpErrorMsg}} />
                            <div style={{width: '100%'}} style={{display: 'flex', paddingTop: '10px',  alignItems: 'flex-start'}}>
                                <input onChange={this._handleCheckboxChange.bind(this)} style={{width: '80px'}} id={this.id} type="checkbox" autocomplete="off" />
                                <label htmlFor={this.id}>Mit Ihrer Kontaktaufnahme stimmen Sie den Datenschutzbestimmungen dieser Website nach EU-DSGVO zu und, dass Sie von Real Experts Network GmbH Marketingmaterialien per E-Mail erhalten, die nach Ansicht von Real Experts Network GmbH zu Ihrer Anfrage passen.</label>
                            </div>
                            <div style={{ color: '#ed6a14' }}>
                                {this.state.emailCheckErrorMsg}
                            </div>
                            <button type="submit" className="button-round-blue">Abonnieren</button>
                            <div style={{ color: '#ed6a14' }}>
                                {this.state.serverError}
                            </div>
                            <div style={{ color: '#2db7bc' }}>
                                {this.state.emailSuccessMsg}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
