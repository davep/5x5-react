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
    <span
      className={"cell " + ( props.game[ props.line ][ props.col ] ? "on" : "off" )}
      onClick={ () => props.onClick( props.line, props.col )}>
    </span>
);

// Row of cells in the game.
const Row = props => (
    <div className="row">
      {times( 5 ).map( n => <Cell key={n} line={props.line} col={n} game={props.game} onClick={props.onClick} /> )}
    </div>
);

// The main board.
const Board = props => times( 5 ).map( n => <Row key={n} line={n} game={props.game} onClick={props.onClick} /> );

// Toggle a single cell.
const toggle = ( game, x, y ) => game[ x ][ y ] = !game[ x ][ y ];

// Make a move on the game.
const makeMove = ( game, x, y ) => {
    if ( x > 0 ) toggle( game, x - 1, y );
    if ( y > 0 ) toggle( game, x, y - 1 );
    toggle( game, x, y );
    if ( x < 4 ) toggle( game, x + 1, y );
    if ( y < 4 ) toggle( game, x, y + 1 );
    return game;
}

// Holds/displays the game state.
class Game extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {
            game: makeMove( array2d( 5, 5, false ), 2, 2 )
        };
    }

    gameMove( x, y ) {
        this.setState( { game: makeMove( this.state.game, x, y ) } );
    }

    render() {
        return (
            <Board game={this.state.game} onClick={( x, y ) => this.gameMove( x, y )} />
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
