// -*- mode: rjsx -*-

//////////////////////////////////////////////////////////////////////
// Import modules.
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

//////////////////////////////////////////////////////////////////////
// Constants.
const GRID_SIZE = 5;

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
      {times( GRID_SIZE ).map( n => <Cell key={n} line={props.line} col={n} game={props.game} onClick={props.onClick} /> )}
    </div>
);

// Shows the number of moves.
const Status = props => (
    <p>Moves: {props.moves}</p>
);

// The main board.
const Board = props => (
    <div className="board">
      {times( GRID_SIZE ).map( n => <Row key={n} line={n} game={props.game} onClick={props.onClick} /> )}
    </div>
);

// Toggle a single cell.
const toggle = ( game, x, y ) => game[ x ][ y ] = !game[ x ][ y ];

// Make a move on the game.
const makeMove = ( game, x, y ) => {
    if ( x > 0 ) toggle( game, x - 1, y );
    if ( y > 0 ) toggle( game, x, y - 1 );
    toggle( game, x, y );
    if ( x < ( GRID_SIZE - 1 ) ) toggle( game, x + 1, y );
    if ( y < ( GRID_SIZE - 1 ) ) toggle( game, x, y + 1 );
    return game;
};

// Return an initial game state.
const initialGameState = () => makeMove( array2d( GRID_SIZE, GRID_SIZE, false ), 2, 2 );

// Show the reset button.
const Reset = props => <button onClick={() => props.reset()}>Reset</button>;

// Holds/displays the game state.
class Game extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {
            game: initialGameState(),
            moves: 0
        };
    }

    gameMove( x, y ) {
        this.setState( {
            game: makeMove( this.state.game, x, y ),
            moves: this.state.moves + 1
        } );
    }

    reset() {
        this.setState( {
            game: initialGameState(),
            moves: 0
        } );
    }

    render() {
        return (
            <div className="game">
              <Status moves={this.state.moves} />
              <Board game={this.state.game} onClick={( x, y ) => this.gameMove( x, y )} />
              <div className="buttons">
                <Reset game={this.state.game} reset={() => this.reset()} />
              </div>
            </div>
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
