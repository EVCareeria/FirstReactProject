import React, {Component} from 'react';
import './App.css';

class LoginsEdit extends Component {
    constructor(props) {
        super(props); 
        this.state = {Loginskohde: [], LoginId: '', Firstname: '', Lastname: '', Email: '', Username: '', Password: '', AccesslevelID: ''}
        this.handleChangeLoginID = this.handleChangeLoginID.bind(this);
        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeLastname = this.handleChangeLastname.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeAccesslevelID = this.handleChangeAccesslevelID.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    dismiss() {
        this.props.unmountMe();
    }

    handleChangeLoginID(event) {
        var syöte = event.target.value;
        this.setState({...this.state, LoginId: syöte.toUpperCase()});
    }

    handleChangeFirstname(event) {
        var syöte = event.target.value;
        this.setState({...this.state, Firstname: syöte});
    }

    handleChangeLastname(event) {
        var syöte = event.target.value;
        this.setState({...this.state, Lastname: syöte});
    }

    handleChangeEmail(event) {
        var syöte = event.target.value;
        this.setState({...this.state, Email: syöte});
    }

    handleChangeUsername(event) {
        var syöte = event.target.value;
        this.setState({...this.state, Username: syöte});
    }

    handleChangePassword(event) {
        var syöte = event.target.value;
        this.setState({...this.state, Password: syöte});
    }

    handleChangeAccesslevelID(event) {
        var syöte = event.target.value;
        this.setState({...this.state, AccesslevelID: syöte});
    }

    handleSubmit(event) {
        alert('Muokattava käyttäjä Debuggaus' + this.state.LoginId);
        event.preventDefault();
        this.PutMethod();
    }

    componentDidMount() {
        this.setState({
            LoginId: this.props.Loginskohde.loginId,
            Firstname: this.props.Loginskohde.firstname,
            Lastname: this.props.Loginskohde.lastname,
            Email: this.props.Loginskohde.email,
            Username: this.props.Loginskohde.userName,
            Password: this.props.Loginskohde.passWord,
            AccesslevelID: this.props.Loginskohde.accesslevelID
        });
    }

    PutMethod() {
        const User = {      LoginId: this.state.LoginId,
                            Firstname: this.state.Firstname,
                            Lastname: this.state.Lastname,
                            Email: this.state.Email,
                            Username: this.state.Username,
                            Password: this.state.Password,
                            AccesslevelID: this.state.AccesslevelID};

        const UserJson = JSON.stringify(User);
        const apiUrl= 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/Logins/' + this.state.LoginId;
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: UserJson
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                console.log(`Serverin vastaus: ${success}.`);
                if (success) {
                    console.log('Pyyntö käyttäjän päivityksestä tehty -----');
                    this.dismiss();
                }
            });
    }

    render() {
        return (
            <form className="boxEditForm" onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.LoginId} title="Käyttäjätunnus tähän!" placeholder="LoginID" onChange={this.handleChangeLoginID} />
                <input type="text" value={this.state.Firstname} placeholder="Firstname" onChange={this.handleChangeFirstname} />
                <input type="text" value={this.state.Lastname} placeholder="Lastname" onChange={this.handleChangeLastname} />
                <input type="text" value={this.state.Email} placeholder="Email" onChange={this.handleChangeEmail} />
                <input type="text" value={this.state.Username} placeholder="Username" onChange={this.handleChangeUsername} />
                <input type="text" value={this.state.Password} placeholder="Password" onChange={this.handleChangePassword} />
                <input type="text" value={this.state.AccesslevelID} placeholder="AccesslevelID" onChange={this.handleChangeAccesslevelID} />
                <div className="radio">
                    <label>Mitkä ovat käyttäjän käyttöoikeudet</label>
                    <br />
                    <label>
                        <input type="radio" name="AccesslevelID" value="0" checked={this.state.accesslevelID === 0 ? "checked" : null} onChange={this.handleChangeAccesslevelID}></input>
                        Perusoikeudet
                    </label>
                    <br />
                    <label>
                    <input type="radio" name="AccesslevelID" value="1" checked={this.state.accesslevelID === 1 ? "checked" : null} onChange={this.handleChangeAccesslevelID}></input>
                        Kattavat oikeudet
                    </label>
                    <br />
                    <label>
                    <input type="radio" name="AccesslevelID" value="2" checked={this.state.accesslevelID === 1 ? "checked" : null} onChange={this.handleChangeAccesslevelID}></input>
                        Vastuu oikeudet
                    </label>
                </div>
                <br />
                <button type="submit">Suorita muutokset</button>
            </form>
        );
    }

}

export default LoginsEdit;