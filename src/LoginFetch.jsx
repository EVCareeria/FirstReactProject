import React, { Component } from 'react';
import './App.css';
import Helpit from './Helpit';
import LoginsAdd from './LoginsAdd';
import LoginsEdit from './LoginsEdit';
import Md5Salaus from './Md5Salaus';

class LoginFetch extends Component {

  constructor(props) {
    super(props);
    console.log("LoginsFetch-komponentti: constructor");
    this.state = { 
        kayttaja: [], 
        start: 0,
        take: 5,
        visible: "table",
        lastname: "",
        renderChildAdd: true,
        renderChildEdit: true,
        yksiKayttaja: [],
        loginId: '',
        LoginIDDel: '',
        LoginIDDelName: ''      
    }; //Luodaan Logins -olio (taulukko)
    this.handleChangeLastname = this.handleChangeLastname.bind(this);
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
        startvalue = startvalue-5;
    }
    this.setState({
        start: startvalue,
        take: 5
    }, this.handleSubmit);
  }

  handleClickNext = (event) => {
    this.setState({
        start: this.state.start+5,
        take: 5
    }, this.handleSubmit);

  }

  handleChangeLastname(event) {
    let sukunimi = event.target.value;
    this.setState({lastname: sukunimi},
    this.handleSubmit);
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

  handleClickEdit = (dataObjekti, event) => {
    this.setState({
      yksiKayttaja: dataObjekti,
      visible: "editform",
      renderChildEdit: true
    })
  }

  handleClickDelete = (poistettava, event) => {
    this.setState({
      LoginIDDel: poistettava,
      visible: "deleteform",
    })
  }

  handlePerformDelete() {
    this.NWDeleteRestApista();
  }

  ResetDeleteDone() {
    this.setState({
      LoginIDDel: '',
      LoginIDDelName: ''
    })
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  HaeNWRestApista() {
    console.log("LoginsFetch-komponentti: componentDidMount");
    let uri ="";
    if (this.state.lastname !== "") 
    {
      uri = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/logins/r?lastname='+this.state.lastname+'&limit='+this.state.take;

    }else
    {
      uri = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/logins/r?offset='+this.state.start+'&limit='+this.state.take;
    }
    console.log("HaeOmaRestistä logins " + uri);
    fetch(uri) 
    .then(response => response.json())
    .then(json => {
        console.log(json, "HaeNWRestApista");
        this.setState({ kayttaja: json }); //Viedään tulosjoukko (json) setState-komennolla asiakkaat -olioon
    });
  }

  NWDeleteRestApista() {
    let apiUrl = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/logins/' + this.state.LoginIDDel;
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
    console.log("LoginFetch-komponentti: render");
    let viesti = "NW Logins-rivejä:" + this.state.kayttaja.length;
    let Logintaulukko = [];
    let tHeaders = "";
    if (this.state.kayttaja.length > 0) {
        tHeaders = <tr><th>LoginID</th><th>Username</th><th>Firstname</th><th>Lastname</th><th>Password</th></tr>
        for (let index = 0; index < this.state.kayttaja.length; index++) {
            const element = this.state.kayttaja[index];
            Logintaulukko.push(<tr key={element.userName}>
            <td>{element.loginId}</td>
            <td>{element.userName}</td>
            <td>{element.firstname}</td>
            <td>{element.lastname}</td>
            <Md5Salaus salattava={element.passWord}/>
            <td><button onClick={this.handleClickEdit.bind(this, element)}>Muokkaus</button></td>
            <td><button onClick={this.handleClickDelete.bind(this, element.loginId)}>Poista</button></td>
            </tr>);
      }
    }

    let Poistotaulukko = [];
    let PoistotHeaders = "";

    if (this.state.kayttaja.length > 0) {
      PoistotHeaders = <tr><th>LoginID</th><th>Username</th><th>Firstname</th><th>Lastname</th><th>Password</th></tr>
        for (let index = 0; index < this.state.kayttaja.length; index++) {
            const element = this.state.kayttaja[index];
            Poistotaulukko.push(<tr key={element.userName}>
            <td>{element.loginId}</td>
            <td>{element.userName}</td>
            <td>{element.firstname}</td>
            <td>{element.lastname}</td>
            <Md5Salaus salattava={element.passWord}/>
            </tr>);
      }
    }
    else {
      viesti = "Ladataan tietoja Northwind-tietokannasta..."
    }
    if (this.state.visible === "table") {
        return (<div className="box4">
      <h1>Käyttäjien hallinta</h1>
      <p>{viesti}</p>
      <input type="text" placeholder="Sukunimi haku!" value={this.state.lastname} onChange={this.handleChangeLastname} />
      <button onClick={this.handleClickHelp}>Näytä opaste</button>
      <button onClick={this.handleClickAdd}>Lisää Käyttäjä</button>
      <button onClick={this.handleClickPrev}>Edelliset</button>
      <button onClick={this.handleClickNext}>Seuraavat</button>
      <table class="table table-dark" id = "t01"><thead>{tHeaders}</thead><tbody>{Logintaulukko}</tbody></table>
    </div>
    );
    } else if (this.state.visible === "addform") {
      return (<div className="box5">
        <h1>Käyttäjien lisäys</h1>
        <div>
        <button onClick={this.handleClickHelp}>Näytä opaste</button>
        <button onClick={this.handleClickTable}>Selaa Käyttäjiä</button>
        </div>
    
        {this.state.renderChild ? <LoginsAdd unmountMe={this.handleChildUnmount} /> : null}
        </div>
      );
    }
    else if (this.state.visible === "deleteform") {
        
      return (<div className="box5">
        <h1>Käyttäjän poisto</h1>
        <h5>Poistettavan käyttäjän ID</h5>  
        <input type="text" placeholder="Poistettava ID" value={this.state.LoginIDDel}/>
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
        <h1>Käyttäjien muokkausikkuna</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa Käyttäjiä</button>
        </div>
        {this.state.renderChildEdit ? <LoginsEdit Loginskohde={this.state.yksiKayttaja} unmountMe={this.handleChildUnmountEdit} /> : null}
      </div>);
    }
    else if (this.state.visible === "help") {
      return (<div className="helpBox">
        <h1> Opasteet </h1>
        <button onClick={this.handleClickAdd}>Lisää Käyttäjä</button>
        <button onClick={this.handleClickTable}>Selaa Käyttäjiä</button>
        <Helpit moduli="LoginFetch" />
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
export default LoginFetch;

