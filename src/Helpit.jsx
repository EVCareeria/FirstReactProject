import React, {Component} from 'react';
import './App.css';
class Helpit extends Component {
    render() {
        if (this.props.moduli==="viestit") {
            return(
                <div>
                    <p>Minäpä kerron miten Viestit-ohjelmaa käytetään...</p>  
                </div>         
            );
        } else if (this.props.moduli==="AnalogWatch") {
            return(
                <div>
                    <p>Minäpä kerron miten AnalogWatch-ohjelmaa käytetään...</p>  
                </div>          
            );
        }
            else if (this.props.moduli==="LoginFetch") {
                return(
                    <div>
                        <p>Täällä voit lisätä ja hakea softan käyttäjiä!</p>
                    </div>
                );
            }
             else if (this.props.moduli==="NWCustomerFetch") {
                return(
                    <div>
                        <p>Voit hakea asiakkaita ja muokata niiden perustietoja</p>  
                    </div>          
                );
            }
    else if (this.props.moduli ==="NWPrudctsFetch") {
        return(
            <div>
                <p>Täällä voit muokata, poistaa sekä lisätä tuotteita tietokantaan</p>
            </div>
        )
    }
            else {
            return(
                <div>
                    <p>Helppiä ei löydy</p>  
                </div>          
            );
        }
    }
}
export default Helpit;
