import React, { Component } from 'react';
import './App.css';
import Helpit from './Helpit';
import NWProductsAdd from './NWProductsAdd';
import NWProductsEdit from './NWProductsEdit';

class NWProductsFetch extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        Tuotteet: [], 
        start: 0,
        take: 10,
        visible: "table",
        category: '',
        renderChildAdd: true,
        renderChildEdit: true,
        ValittuTuote: [],
        ProductId: '',
        ProductIdDel: ''   
    }; 
    this.handleChangeCategoryID = this.handleChangeCategoryID.bind(this);
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

  handleChangeCategoryID(event) {
    let Kategoria = event.target.value;
    this.setState({category: Kategoria
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
      yksiTuote: dataObj,
      visible: "editform",
      renderChildEdit: true
    })
  }

  handleClickDelete = (poistettava, event) => {
    this.setState({
      ProductIdDel: poistettava,
      visible: "deleteform",
    })
  }

  handlePerformDelete() {
    this.NWDeleteRestApista();
  }

  ResetDeleteDone() {
    this.setState({
      ProductIdDel: '',
    })
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  HaeNWRestApista() {
    let uri ="";
    if (this.state.category !== "") 
    {
      uri = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/products/r?producttype='+this.state.category+'&limit='+this.state.take;
    }else
    {
      uri = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/products/r?offset='+this.state.start+'&limit='+this.state.take;
    }
    fetch(uri)
    .then(response => response.json())
    .then(json => {
        this.setState({ Tuotteet: json }); //Viedään tulosjoukko (json) setState-komennolla asiakkaat -olioon
    });
  }

  NWDeleteRestApista() {
    let apiUrl = 'https://webapiharjoituskoodiazure.azurewebsites.net/nw/products/' + this.state.ProductIdDel;
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
    console.log("NWProductsFetch-komponentti: render");
    let viesti = "NW Tuote-rivejä:" + this.state.Tuotteet.length;
    let taulukko = [];
    let tHeaders = "";
    
    if (this.state.Tuotteet.length > 0) {
        //Luodaan taulukon otsikot
        tHeaders = <tr><th>ProductID</th><th>Productname</th><th>Unit price</th><th>CategoryID</th><th>Muokkaus</th><th>Poista</th></tr>
        for (let index = 0; index < this.state.Tuotteet.length; index++) {
            const element = this.state.Tuotteet[index];
            taulukko.push(<tr key={element.productId}>
            <td>{element.productId}</td>
            <td>{element.productName}</td>
            <td>{element.unitPrice}</td>
            <td>{element.categoryId}</td>
            <td><button onClick={this.handleClickEdit.bind(this, element)}>Muokkaa</button></td>
            <td><button onClick={this.handleClickDelete.bind(this, element.productId)}>Poista</button></td>
            </tr>);
      }
    }

    let Poistotaulukko = [];
    let PoistotHeaders = "";
    
    if (this.state.Tuotteet.length > 0) {
      //Luodaan taulukon otsikot
      PoistotHeaders = <tr><th>ProductID</th><th>Productname</th><th>Unit price</th><th>CategoryID</th></tr>
      for (let index = 0; index < this.state.Tuotteet.length; index++) {
          const element = this.state.Tuotteet[index];
          Poistotaulukko.push(<tr key={element.productId}>
          <td>{element.productId}</td>
          <td>{element.productName}</td>
          <td>{element.unitPrice}</td>
          <td>{element.categoryId}</td>
          </tr>);
      }
    }
    else {
      viesti = "Ladataan tietoja Northwind-tietokannasta..."
    }
    if (this.state.visible === "table") {
        return (<div className="box4">
      <h1>Tuotehaku</h1>
      <p>{viesti}</p>
        <select  onChange={this.handleChangeCategoryID} value={this.state.category}>
            <option value='' >Valitse kategoria</option>
            <option value="Beverages">Beverages</option>
            <option value="Condiments">Condiments</option>
            <option value="Confections">Confections</option>
            <option value="Dairy Products">Dairy Products</option>
            <option value="Grains/Cereals">Grains/Cereals</option>
            <option value="Meat/Poultry">Meat/Poultry</option>
            <option value="Produce">Produce</option>
            <option value="Seafood">Seafood</option>
        </select>
      <button onClick={this.handleClickHelp}>Näytä opaste</button>
      <button onClick={this.handleClickAdd}>Lisää tuote</button>
      <button onClick={this.handleClickPrev}>Edelliset</button>
      <button onClick={this.handleClickNext}>Seuraavat</button>
      <table class="table table-dark" id = "t01"><thead>{tHeaders}</thead><tbody>{taulukko}</tbody></table>
    </div>
    );
    } else if (this.state.visible === "addform") {
      return (<div className="box5">
        <h1>Tuotteiden lisäys</h1>
        <div>
        <button onClick={this.handleClickHelp}>Näytä opaste</button>
        <button onClick={this.handleClickTable}>Selaa tuotteita</button>
        </div>
        {/* <NWCustomerAdd /> */}
        {this.state.renderChild ? <NWProductsAdd unmountMe={this.handleChildUnmount} /> : null}
        </div>
      );
    } 
    else if (this.state.visible === "deleteform") {

      return (<div className="box5">
        <h1>Tuotteiden poisto</h1>
        <h5>Poistettavan tuotteen ID</h5>
        <input type="text" placeholder="Poistettava ID" value={this.state.ProductIdDel} />
        <div>
        <button onClick={this.handleClickHelp}>Näytä opaste</button>
        <button onClick={this.handleClickTable}>Selaa tuotteita</button>
        <button onClick={this.handlePerformDelete}>Vahvista poisto</button>
        <table class="table table-dark" id = "t01"><thead>{PoistotHeaders}</thead><tbody>{Poistotaulukko}</tbody></table>
        </div>
      </div>
      );
      
    }
    else if (this.state.visible === "editform") {
      return (<div className="boxEdit">
        <h1>Tuotteiden muokkausikkuna</h1>
        <div>
          <button onClick={this.handleClickHelp}>Näytä opaste</button>
          <button onClick={this.handleClickTable}>Selaa tuotteita</button>
        </div>
        {this.state.renderChildEdit ? <NWProductsEdit TuoteLista={this.state.yksiTuote} unmountMe={this.handleChildUnmountEdit} /> : null}
      </div>);
    }
    else if (this.state.visible === "help") {
      return (<div className="helpBox">
        <h1> Opasteet </h1>
        <button onClick={this.handleClickAdd}>Lisää tuote</button>
        <button onClick={this.handleClickTable}>Selaa tuotteita</button>
        <Helpit moduli="NWPrudctsFetch" />
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
export default NWProductsFetch;

