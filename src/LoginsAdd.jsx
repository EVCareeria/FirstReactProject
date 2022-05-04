import React, {Component} from 'react';
import './App.css';

class LoginsAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {loginId: '', userName: '', firstname: '', lastname: '', email: '', passWord: '', accesslevelID: ''};
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeLastname = this.handleChangeLastname.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleChangeUsername(event) {
        var syöte = event.target.value;
        this.setState({...this.state, userName: syöte});
    }

    handleChangePassword(event) {
        var syöte = event.target.value;
        this.setState({...this.state, passWord: syöte});
    }

    handleChangeFirstname(event) {
        var syöte = event.target.value;
        this.setState({...this.state, firstname: syöte});
    }

    handleChangeLastname(event) {
        var syöte = event.target.value;
        this.setState({...this.state, lastname: syöte});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.InsertoiKantaan();
    }

    InsertoiKantaan(){
        const kayttaja = {userName: this.state.userName,
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        passWord: this.state.passWord}

        const kayttajaJSON = JSON.stringify(kayttaja);


        console.log("kayttajaJSON = " + kayttajaJSON);
        const apiUrl='https://webapiharjoituskoodiazure.azurewebsites.net/nw/logins';
        fetch(apiUrl, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
              
            },
            body: kayttajaJSON
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                console.log('Response from server: ${success}.');
                if (success) {
                }
            });
    }

  render() {
    return (
        <form className="boxAdd" onSubmit={this.handleSubmit}>
            <input type="text" title="Syötä kayttajatunnus" placeholder="Username" onChange={this.handleChangeUsername} />
            <input type="text" placeholder="Firstname" onChange={this.handleChangeFirstname} />
            <input type="text" placeholder="Lastname" onChange={this.handleChangeLastname} />
            <input type="text" placeholder="Password" onChange={this.handleChangePassword} />
            <br/>
            <button type="submit">Tallenna uusi kayttaja!</button>
        </form>
    );
  }
}

export default LoginsAdd;
