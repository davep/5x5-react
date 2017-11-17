// -*- mode: rjsx -*-

//////////////////////////////////////////////////////////////////////
// Import modules.
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

//////////////////////////////////////////////////////////////////////
// Utility functions.

const times   = max => Array( max ).fill( 0 ).map( ( _, i ) => i );
const array2d = ( x, y, fill ) => Array( x ).fill( fill ).map( _ => Array( y ).fill( fill ) );

//////////////////////////////////////////////////////////////////////
// Main components.

// Single cell in the game.
const Cell = props => (
    <span className={"cell " + ( props.game[ props.line ][ props.col ] ? "on" : "off" )}></span>
);

// Row of cells in the game.
const Row = props => (
    <div className="row">
      {times( 5 ).map( n => <Cell key={n} line={props.line} col={n} game={props.game} /> )}
    </div>
);

// The main board.
const Board = props => times( 5 ).map( n => <Row key={n} line={n} game={props.game} /> );

// Holds/displays the game state.
class Game extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {
            game: array2d( 5, 5, false )
        };
    }

    render() {
        return (
            <Board game={this.state.game}/>
        );
    }
}

// Main app wrapper.
const App = props => (
    <div>
      <Game />
    </div>
);

//////////////////////////////////////////////////////////////////////
// Render the app.
ReactDOM.render(
  <App />,
  document.getElementById( "root" )
);
