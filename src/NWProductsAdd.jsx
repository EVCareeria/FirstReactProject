import React, {Component} from 'react';
import './App.css';

class NWProductsAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TuoteLista: [], ProductID: '', ProductName: '', SupplierID: '', CategoryID: '', QuantityPerUnit: '', UnitPrice: '', UnitsInStock: '', UnitsOnOrder:'', ReorderLevel: '', Discontinnued: '', ImageLink: ''
        }
        this.changeProductName = this.changeProductName.bind(this);
        this.changeUnitPrice = this.changeUnitPrice.bind(this);
        this.changeCategoryID = this.changeCategoryID.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    changeProductName(event) {
        var syöte = event.target.value;
        this.setState({...this.state, ProductName: syöte});
    }

    changeUnitPrice(event) {
        var syöte = event.target.value;
        this.setState({...this.state, UnitPrice: syöte});
    }

    changeCategoryID(event) {
        var syöte = event.target.value;
        this.setState({...this.state, CategoryID: syöte});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.InsertoiKantaan();
    }

    InsertoiKantaan(){
        const tuote = { ProductName: this.state.ProductName,
                        UnitPrice: this.state.UnitPrice,
                        CategoryID: this.state.CategoryID};

        const tuoteJSOn = JSON.stringify(tuote);


        console.log("tuotejson = " + tuoteJSOn);
        const apiUrl='https://webapiharjoituskoodiazure.azurewebsites.net/nw/products';
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: tuoteJSOn
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                console.log(`Response from server: ${success}.`);
                if (success) {
                }
            });
    }

  render() {
    return (
        <form className="boxAdd" onSubmit={this.handleSubmit}>
            <input type="text" title="Syötä tuotetunnus" placeholder="Productname" onChange={this.changeProductName} />
            <input type="text" placeholder="Unitprice" onChange={this.changeUnitPrice} />
            <br />
            <select placeholder="Category"  onChange={this.changeCategoryID}>
            <option value='' >Valitse kategoria</option>
            <option value="1">Beverages</option>
            <option value="2">Condiments</option>
            <option value="3">Confections</option>
            <option value="4">Dairy Products</option>
            <option value="5">Grains/Cereals</option>
            <option value="6">Meat/Poultry</option>
            <option value="7">Produce</option>
            <option value="8">Seafood</option>
        </select>
            <br/>
            <button type="submit">Tallenna uusi tuote!</button>
        </form>
    );
  }
}

export default NWProductsAdd;
