import React, {Component} from 'react';
import './App.css';

class NWCustomerAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {CustomerID: '', CompanyName: '', ContactName: '', ContactTitle: '', Address: '', Phone: '', Fax: ''};
        this.handleChangeCustomerID = this.handleChangeCustomerID.bind(this);
        this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
        this.handleChangeContactName = this.handleChangeContactName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChangeCustomerID(event) {
        var syöte = event.target.value;
        this.setState({...this.state, CustomerID: syöte.toUpperCase()});
    }

    handleChangeCompanyName(event) {
        var syöte = event.target.value;
        this.setState({...this.state, CompanyName: syöte});
    }

    handleChangeContactName(event) {
        var syöte = event.target.value;
        this.setState({...this.state, ContactName: syöte});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.InsertoiKantaan();
    }

    InsertoiKantaan(){
        const asiakas = {CustomerID: this.state.CustomerID,
                        CompanyName: this.state.CompanyName,
                        ContactName: this.state.ContactName,
                        ContactTitle: this.state.ContactTitle,
                        Address: this.state.Address,
                        Phone: this.state.Phone,
                        Fax: this.state.Fax};

        const asiakasJSON = JSON.stringify(asiakas);


        console.log("asiakasJson = " + asiakasJSON);
        const apiUrl='https://webapiharjoituskoodiazure.azurewebsites.net/nw/customer';
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: asiakasJSON
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
            <input type="text" title="Syötä asiakastunnus" placeholder="CustomerID" onChange={this.handleChangeCustomerID} />
            <input type="text" placeholder="CompanyName" onChange={this.handleChangeCompanyName} />
            <input type="text" placeholder="ContactName" onChange={this.handleChangeContactName} />
            <br/>
            <button type="submit">Tallenna uusi asiakas!</button>
        </form>
    );
  }
}

export default NWCustomerAdd;
