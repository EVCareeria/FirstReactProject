import React, { Component } from 'react';
import './App.css';
import Helpit from './Helpit';
import NWCustomerAdd from './NWCustomerAdd';
import NWCustomerEdit from './NWCustomerEdit';

class NWCustomerFetch extends Component {

  constructor(props) {
    super(props);
    console.log("NWCustomerFetch-komponentti: constructor");
    this.state = { 
        asiakkaat: [], 
        start: 0,
        take: 10,
        visible: "table",
        country: "",
        renderChildAdd: true,
        renderChildEdit: true,
        yksiAsiakas: [],
        customerId: '',
        CustomeridDel: ''   
    }; //Luodaan asiakkaat -olio (taulukko)
    this.handleChangeCountryId = this.handleChangeCountryId.bind(this);
    this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this);
    this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
    this.handlePerformDelete = this.handlePerformDelete.bind(this);
  }

  handleChildUnmountAdd(){
    this.setState({renderChildAdd: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleChildUnmountEdit(){
    this.setState({renderChildEdit: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleClickPrev = (event) => {
    let startvalue = this.state.start;
    if (startvalue > 0) {
        startvalue = startvalue-10;
    }
    this.setState({
        start: startvalue,
        take: 10
    }, this.handleSubmit);
  }

  handleClickNext = (event) => {
    this.setState({
        start: this.state.start+10,
        take: 10
    }, this.handleSubmit);

  }

  handleChangeCountryId(event) {
    let MaaId = event.target.value;
    this.setState({country: MaaId
    },this.handleSubmit);
  }

  handleSubmit() {
    this.HaeNWRestApista();
  }

  handleClickHelp = () => {
    this.setState({visible: "help"});
  }

  handleClickAdd = () => {
    this.setState({visible: "addform", renderChild: true});
  }

  handleClickTable = () => {
    this.setState({visible: "table"});
  }

  handleClickEdit = (dataObj, event) => {
    this.setState({
      yksiAsiakas: dataObj,
      visible: "editform",
      renderChildEdit: true
    })
  }

  handleClickDelete = (poistettava, event) => {
    this.setState({
      CustomeridDel: poistettava,
      visible: "deleteform",
    })
  }

  handlePerformDelete() {
    this.NWDeleteRestApista();
  }

  ResetDeleteDone() {
    this.setState({
      CustomeridDel: '',
    })
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  HaeNWRestApista() {
    console.log("NWCustomerFetch-komponentti: componentDidMount");
    let uri ="";
    if (this.state.country !== "") 
    {
      uri = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/customer/r?country='+this.state.country+'&limit='+this.state.take;
    }else
    {
      uri = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/customer/r?offset='+this.state.start+'&limit='+this.state.take;
    }
    console.log("HaeOmaRestistä " + uri);
    fetch(uri)
    .then(response => response.json())
    .then(json => {
        console.log(json, "HaeNWRestApista");
        this.setState({ asiakkaat: json }); //Viedään tulosjoukko (json) setState-komennolla asiakkaat -olioon
    });
  }

  NWDeleteRestApista() {
    let apiUrl = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/customer/' + this.state.CustomeridDel;
    fetch(apiUrl, {
      method: "DELETE",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: null
  }).then((response) => response.json())
      .then((json) => {
          const success = json;
          if (success) {
              this.ResetDeleteDone();
          }
      });
  }


  componentDidMount() {
    this.HaeNWRestApista();
  }

  render() {
    console.log("NWCustomerFetch-komponentti: render");
    let viesti = "NW Customers-rivejä:" + this.state.asiakkaat.length;
    let taulukko = [];
    let tHeaders = "";
    
    if (this.state.asiakkaat.length > 0) {
        //Luodaan taulukon otsikot
        tHeaders = <tr><th>customerId</th><th>companyName</th><th>contactName</th><th>Countryname</th><th>Muokkaus</th><th>Poista</th></tr>
        for (let index = 0; index < this.state.asiakkaat.length; index++) {
            const element = this.state.asiakkaat[index];
            taulukko.push(<tr key={element.customerId}>
            <td>{element.customerId}</td>
            <td>{element.companyName}</td>
            <td>{element.contactName}</td>
            <td>{element.country}</td>
            <td><button onClick={this.handleClickEdit.bind(this, element)}>Muokkaa</button></td>
            <td><button onClick={this.handleClickDelete.bind(this, element.customerId)}>Poista</button></td>
            {/* <td><button onClick={this.handleClickDelete.bind(this, element)}>Poista</button></td> */}
            </tr>);
      }
    }

    let Poistotaulukko = [];
    let PoistotHeaders = "";
    
    if (this.state.asiakkaat.length > 0) {
        //Luodaan taulukon otsikot
        PoistotHeaders = <tr><th>customerId</th><th>companyName</th><th>contactName</th><th>Countryname</th></tr>
        for (let index = 0; index < this.state.asiakkaat.length; index++) {
            const element = this.state.asiakkaat[index];
            Poistotaulukko.push(<tr key={element.customerId}>
            <td>{element.customerId}</td>
            <td>{element.companyName}</td>
            <td>{element.contactName}</td>
            <td>{element.country}</td>
            {/* <td><button onClick={this.handleClickDelete.bind(this, element)}>Poista</button></td> */}
            </tr>);
      }
    }
    else {
      viesti = "Ladataan tietoja Northwind-tietokannasta..."
    }
    if (this.state.visible === "table") {
        return (<div className="box4">
      <h1>Tietokantahaku</h1>
      <p>{viesti}</p>
      <input type="text" placeholder="Maannimi tähän kiitos!" value={this.state.country} onChange={this.handleChangeCountryId} />
      <button onClick={this.handleClickHelp}>Näytä opaste</button>
      <button onClick={this.handleClickAdd}>Lisää asiakas</button>
      <button onClick={this.handleClickPrev}>Edelliset</button>
      <button onClick={this.handleClickNext}>Seuraavat</button>
      <table class="table table-dark" id = "t01"><thead>{tHeaders}</thead><tbody>{taulukko}</tbody></table>
    </div>
    );
    } else if (this.state.visible === "addform") {
      return (<div className="box5">
        <h1>Asiakkaiden lisäys</h1>
        <div>
        <button onClick={this.handleClickHelp}>Näytä opaste</button>
        <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        <NWCustomerAdd />
        {/* {this.state.renderChild ? <NWCustomerAdd unmountMe={this.handleChildUnmount} /> : null} */}
        </div>
      );
    } 
    else if (this.state.visible === "deleteform") {
        
      return (<div className="box5">
        <h1>Asiakastietojen poisto</h1>
        <h5>Poistettavan asiakkaan ID</h5>
        <input type="text" placeholder="Poistettava ID" value={this.state.CustomeridDel}/>
        <div>
        <button onClick={this.handleClickHelp}>Näytä opaste</button>
        <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        <button onClick={this.handlePerformDelete}>Vahvista poisto</button>
        <table class="table table-dark" id = "t01"><thead>{PoistotHeaders}</thead><tbody>{Poistotaulukko}</tbody></table>
        </div>
        
      </div>
      );
      
    }
    else if (this.state.visible === "editform") {
      return (<div className="boxEdit">
        <h1>Asiakastietojen muokkausikkuna</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        </div>
        {this.state.renderChildEdit ? <NWCustomerEdit asiakasObj={this.state.yksiAsiakas} unmountMe={this.handleChildUnmountEdit} /> : null}
      </div>);
    }
    else if (this.state.visible === "help") {
      return (<div className="helpBox">
        <h1> Opasteet </h1>
        <button onClick={this.handleClickAdd}>Lisää asiakas</button>
        <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
        <Helpit moduli="NWCustomerFetch" />
      </div>
      );
    } else { 
      return( <div>
        <h1> Jotain varmaan hajosi!</h1>
      </div>
     );
    }
    
  }
}
export default NWCustomerFetch;

