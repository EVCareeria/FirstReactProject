import React, {Component, useCallback} from 'react';
import './App.css';

class TypicodeFetch extends Component {

    constructor(props) {
        super(props);
        console.log("TypicodeFetch: Constructor");
        this.state = {
            todos: [],
            recordcount: 0,
            start: 0,
            end: 10,
            page: 1,
            limit: 10,
            userId: ""
        };
        this.handleChangeUserId = this.handleChangeUserId.bind(this);
    }

    componentDidMount() {
        console.log("TypicodeFetch: componentDidMount");
        this.HaeTypicodesta();
    } 

    handleClickPrev = (event) => {
        let pagenumber = this.state.page;
        if (pagenumber > 0) {
            pagenumber = pagenumber-1;
        }
        this.setState({
            page: pagenumber,
        },this.handleSubmit);
    }

    handleClickNext = (event) => {
      this.setState({page: this.state.page+1}, this.handleSubmit);
    }

    handleChangeUserId(event) {
        let arvo = event.target.value;
        this.setState({userId: arvo}, this.handleSubmit);
    }

    handleSubmit() {
        console.log("Handle submit käynnistetty!");
        this.HaeTypicodesta();
    }
    

    HaeTypicodesta() {
        //let uri = 'https://jsonplaceholder.typicode.com/todos';
        let uri="";
        if (this.state.userId !== "") {
            uri = 'https://jsonplaceholder.typicode.com/todos?userId='+this.state.userId+'&_page='+this.state.page+'&limit='+this.state.limit;
        } else  {
            uri = 'https://jsonplaceholder.typicode.com/todos?_page='+this.state.page+'&limit='+this.state.limit;
        }
    
        console.log("HaeTypicodesta " + uri);
        fetch(uri)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({ todos: json, recordcount: json.length});
            });
    }

    componentWillUnmount() {
        console.log("TypicodeFetch: componentWillUnmountssa");
    }

    render() {
        console.log("TypicodeFetch: renderissä");
        let viesti = "Rivejä " + this.state.recordcount;

        let taulukko = [];
        if (this.state.todos.length > 0) {
          for (let index = 0; index < this.state.todos.length; index++) {
            const element = this.state.todos[index];
            taulukko.push(<tr key={element.id}>
              <td>{element.id}</td>
              <td>{element.userId}</td>
              <td>{element.title}</td>
              <td>{element.completed}</td>
            </tr>);
          }
        }
        else {
          viesti = "Ladataan tietoja Typicoden API:sta..."
        }

        return (
        <div className="App">
            <h3>{viesti}</h3>
            <input type="text" placeholder="Anna userId" title="Ohjelma hakee tiedot antamallasi käyttäjäkoodilla" value={this.state.userId} onChange={this.handleChangeUserId}/>
            <button onClick={this.handleClickPrev}>Edellinen</button>
            <button onClick={this.handleClickNext}>Seuraava</button>
            <table id="t01"><tbody>{taulukko}</tbody></table>
        </div>
        );
    }
}

export default TypicodeFetch;
