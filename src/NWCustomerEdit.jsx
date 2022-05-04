import React, {Component} from 'react';
import './App.css';

class NWCustomerEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {asiakasObj: [], CustomerId: '', CompanyName: '', ContactName: '', ContactTitle: '', Address: '', PostalCode: '', City: '', Country: '', Phone: '', Fax: ''}
        this.handleChangeCustomerID = this.handleChangeCustomerID.bind(this);
        this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
        this.handleChangecontactName = this.handleChangecontactName.bind(this);
        this.handleChangeContactTitle = this.handleChangeContactTitle.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleChangephone = this.handleChangephone.bind(this);
        this.handleChangeFax =  this.handleChangeFax.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    dismiss() {
        this.props.unmountMe();
    }

    handleChangeCustomerID(event) {
        var syöte = event.target.value;
        this.setState({...this.state, CustomerId: syöte.toUpperCase()});
    }

    handleChangeCompanyName(event) {
        var syöte = event.target.value;
        this.setState({...this.state, CompanyName: syöte});
    }

    handleChangecontactName(event) {
        var syöte = event.target.value;
        this.setState({...this.state, ContactName: syöte});
    }

    handleChangeContactTitle(event) {
        var syöte = event.target.value;
        this.setState({...this.state, ContactTitle: syöte});
    }

    handleChangeAddress(event) {
        var syöte = event.target.value;
        this.setState({...this.state, Address: syöte});
    }

    handleChangePostalCode(event) {
        var syöte = event.target.value;
        this.setState({...this.state, PostalCode: syöte});
    }

    handleChangeCity(event) {
        var syöte = event.target.value;
        this.setState({...this.state, City: syöte});
    }

    handleChangeCountry(event) {
        var syöte = event.target.value;
        this.setState({...this.state, Country: syöte});
    }

    handleChangephone(event) {
        var syöte = event.target.value;
        this.setState({...this.state, Phone: syöte});
    }

    handleChangeFax(event) {
        var syöte = event.target.value;
        this.setState({...this.state, Fax: syöte});
    }

    handleSubmit(event) {
        alert('Muokattava asiakas' + this.state.CustomerId);
        event.preventDefault();
        this.PutMethod();
    }


    componentDidMount() {
        console.log("NWCustomer Edit: " + this.props.asiakasObj.CustomerId);
        this.setState({
            CustomerId: this.props.asiakasObj.customerId,
            CompanyName: this.props.asiakasObj.companyName,
            ContactName: this.props.asiakasObj.contactName,
            ContactTitle: this.props.asiakasObj.contactTitle,
            Address: this.props.asiakasObj.address,
            PostalCode: this.props.asiakasObj.postalCode,
            City: this.props.asiakasObj.city,
            Country: this.props.asiakasObj.country,
            Phone: this.props.asiakasObj.phone,
            Fax: this.props.asiakasObj.fax
        });
    }



    PutMethod() {
        const asiakas = {   CustomerId: this.state.CustomerId,
                            CompanyName: this.state.CompanyName,
                            ContactName: this.state.ContactName,
                            ContactTitle: this.state.ContactTitle,
                            Address: this.state.Address,
                            PostalCode: this.state.PostalCode,
                            City: this.state.City,
                            Country: this.state.Country,
                            Phone: this.state.Phone,
                            Fax: this.state.Fax};

        const asiakasJson = JSON.stringify(asiakas);
        const apiUrl= 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/Customer/' + this.state.CustomerId;
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: asiakasJson
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                console.log(`Serverin vastaus: ${success}.`);
                if (success) {
                    console.log('Pyyntö asiakkaan päivityksestä tehty -----');
                    this.dismiss();
                }
            });
    }

    render() {
        return (
            <form className="boxEditForm" onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.CustomerId} title="Asiakastunnus tähän!" placeholder="CustomerID" onChange={this.handleChangeCustomerID} />
                <input type="text" value={this.state.CompanyName} placeholder="CompanyName" onChange={this.handleChangeCompanyName} />
                <input type="text" value={this.state.ContactName} placeholder="contactName" onChange={this.handleChangecontactName} />
                <input type="text" value={this.state.ContactTitle} placeholder="ContactTitle" onChange={this.handleChangeContactTitle} />
                <input type="text" value={this.state.Address} placeholder="Address" onChange={this.handleChangeAddress} />
                <input type="text" value={this.state.PostalCode} placeholder="PostalCode" onChange={this.handleChangePostalCode} />
                <input type="text" value={this.state.City} placeholder="City" onChange={this.handleChangeCity} />
                <input type="text" value={this.state.Country} placeholder="Country" onChange={this.handleChangeCountry} />
                <input type="text" value={this.state.Phone} placeholder="phone" onChange={this.handleChangephone} />
                <input type="text" value={this.state.Fax} placeholder="Fax" onChange={this.handleChangeFax} />
                <br />
                <button type="submit">Suorita muutokset</button>
            </form>
        );
    }


}

export default NWCustomerEdit;