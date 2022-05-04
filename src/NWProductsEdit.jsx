import React, {Component} from 'react';
import './App.css';

class NWProductsEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TuoteLista: [], ProductID: '', ProductName: '', SupplierID: '', CategoryID: '', QuantityPerUnit: '', UnitPrice: '', UnitsInStock: '', UnitsOnOrder:'', ReorderLevel: '', Discontinued: null, ImageLink: ''
        }
        this.changeProductID = this.changeProductID.bind(this);
        this.changeProductName = this.changeProductName.bind(this);
        this.changeUnitPrice = this.changeUnitPrice.bind(this);
        this.changeCategoryID = this.changeCategoryID.bind(this);
        this.changeQuantityPerUnit = this.changeQuantityPerUnit.bind(this);
        this.ChangeUnitsInStock = this.ChangeUnitsInStock.bind(this);
        this.changeUnitsOnOrder = this.changeUnitsOnOrder.bind(this);
        this.changeReorderLevel = this.changeReorderLevel.bind(this);
        this.changeProductDiscontinnued = this.changeProductDiscontinnued.bind(this);
        this.changeImageLink = this.changeImageLink.bind(this);
        this.changeSupplierID = this.changeSupplierID.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    dismiss() {
        this.props.unmountMe();
    }

    changeProductID(event) {
        var syöte = event.target.value;
        this.setState({...this.state, ProductID: syöte.ToUpper()});
    }

    changeProductName(event) {
        var syöte = event.target.value;
        this.setState({...this.state, ProductName: syöte});
    }

    changeUnitPrice(event) {
        var syöte = event.target.value;
        this.setState({... this.state, UnitPrice: syöte});
    }

    changeCategoryID(event) {
        var syöte = event.target.value;
        this.setState({...this.state, CategoryID: syöte});
    }

    changeQuantityPerUnit(event) {
        var syöte = event.target.value;
        this.setState({...this.state, QuantityPerUnit: syöte});
    }

    ChangeUnitsInStock(event) {
        var syöte = event.target.value;
        this.setState({...this.state, UnitsInStock: syöte});
    }

    changeUnitsOnOrder(event) {
        var syöte = event.target.value;
        this.setState({...this.state, UnitsOnOrder: syöte});
    }

    changeReorderLevel(event) {
        var syöte = event.target.value;
        this.setState({...this.state, ReorderLevel: syöte});
    }

    changeProductDiscontinnued(event) {
        var syöte = event.target.value;
        this.setState({...this.state, Discontinued: syöte});
    }

    changeImageLink(event) {
        var syöte = event.target.value;
        this.setState({...this.state, ImageLink: syöte});
    }

    changeSupplierID(event) {
        var syöte = event.target.value;
        this.setState({...this.state, SupplierID: syöte});
    }

    handleSubmit(event) {
        alert('Muokattava asiakas' + this.state.ProductID);
        event.preventDefault();
        this.setState({Discontinued: ''})
        this.PutMethod();
    }



    componentDidMount () {
        this.setState({
            ProductID: this.props.TuoteLista.productId,
            ProductName: this.props.TuoteLista.productName,
            SupplierID: this.props.TuoteLista.supplierId,
            CategoryID: this.props.TuoteLista.categoryId,
            QuantityPerUnit: this.props.TuoteLista.quantityPerUnit,
            UnitPrice: this.props.TuoteLista.unitPrice,
            UnitsInStock: this.props.TuoteLista.unitsInStock,
            UnitsOnOrder: this.props.TuoteLista.unitsOnOrder,
            ReorderLevel: this.props.TuoteLista.reorderLevel,
            Discontinued: this.props.TuoteLista.discontinued,
            ImageLink: this.props.TuoteLista.imageLink
        });
    }

    PutMethod() {
        const Tuote = {
            ProductID: this.state.ProductID,
            ProductName: this.state.ProductName,
            SupplierID: this.state.SupplierID,
            CategoryID: this.state.CategoryID,
            QuantityPerUnit: this.state.QuantityPerUnit,
            UnitPrice: this.state.UnitPrice,
            UnitsInStock: this.state.UnitsInStock,
            UnitsOnOrder: this.state.UnitsOnOrder,
            ReorderLevel: this.state.ReorderLevel,
            Discontinued: this.state.Discontinued,
            ImageLink: this.state.ImageLink};

        const TuoteJson = JSON.stringify(Tuote);
        const apiUrl = 'https://localhost:5001/nw/products/' + this.state.ProductID;
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: TuoteJson
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                console.log(`Serverin vastaus: ${success}.`);
                if (success) {
                    this.dismiss();
                }
            });
    }

    render() {
        return(
            <form className="boxEditForm" onSubmit={this.handleSubmit}>
                <input type="Text" value={this.state.ProductID} title="TuoteTiedot" placeholder="Anna tähän tuoteID" onChange={this.changeProductID} />
                <input type="Text" value={this.state.ProductName} placeholder="Anna tähän tuotenimi" onChange={this.changeProductName} />
                <input type="Text" value={this.state.UnitPrice} placeholder="Anna tähän tuotteen hinta" onChange={this.changeUnitPrice} />
                <input type="Text" value={this.state.CategoryID} placeholder="Anna tähän Tuotteen categoria" onChange={this.changeCategoryID} />
                <input type="Text" value={this.state.QuantityPerUnit} placeholder="Anna tähän tuotteiden määrä" onChange={this.changeQuantityPerUnit} />
                <input type="Text" value={this.state.UnitsInStock} placeholder="Anna tähän tuotteen varasto tilanne" onChange={this.ChangeUnitsInStock} />
                <input type="Text" value={this.state.UnitsOnOrder} placeholder="Anna tähän Tilausten määrä" onChange={this.changeUnitsOnOrder} />
                <input type="Text" value={this.state.ReorderLevel} placeholder="Anna tähän uudelleen tilaukset" onChange={this.changeReorderLevel} />
                <input type="Text" value={this.state.ImageLink} placeholder="Löytyykö tuotekuvaa" onChange={this.changeImageLink} />
                <input type="Text" value={this.state.SupplierID} placeholder="Anna tähän Toimittaja" onChange={this.changeSupplierID} />
                <input type="text" value ={this.state.Discontinued} placeholder="Onko tuote poistunut myynnistä"></input>
                <div className="radio">
                    <label>Onko tuotteen toimitus lopetettu</label>
                    <br />
                    <label>
                        <input type="radio" name="Discontinued" value="false" checked={this.state.Discontinued === 0 ? "checked" : null} onChange={this.changeProductDiscontinnued}></input>
                        EI
                    </label>
                    <br />
                    <label>
                    <input type="radio" name="Discontinued" value="true" checked={this.state.Discontinued === 1 ? "checked" : null} onChange={this.changeProductDiscontinnued}></input>
                        KYLLÄ
                    </label>
                </div>
                <br />
                <button type="submit">Suorita muutokset</button>
            </form>
        );
    }
}

export default NWProductsEdit;