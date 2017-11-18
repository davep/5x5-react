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
const flatten = a => a.reduce( ( a, b ) => a.concat( b ), [] );

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
    <p>Moves: {props.moves}. On: {props.on}. Off: {props.off}.</p>
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

// Show the reset button.
const Reset = props => <button onClick={() => props.reset()}>Reset</button>;

// Count how many cells are turned on.
const countOn = game => flatten( game ).reduce( ( total, cell ) => total + ( cell ? 1 : 0 ), 0 );

// Return an initial game.
const initialGame = () => makeMove( array2d( GRID_SIZE, GRID_SIZE, false ), 2, 2 );

// Return an initial game state.
const initialGameState = () => {
    let game = initialGame();
    return {
        game: game,
        moves: 0,
        on: countOn( game )
    };
};

// Holds/displays the game state.
class Game extends React.Component {

    constructor( props ) {
        super( props );
        this.state = initialGameState();
    }

    gameMove( x, y ) {
        const game = makeMove( this.state.game, x, y );
        this.setState( {
            game: game,
            moves: this.state.moves + 1,
            on: countOn( game )
        } );
    }

    reset() {
        this.setState( initialGameState() );
    }

    render() {
        return (
            <div className="game">
              <Status moves={this.state.moves} on={this.state.on} off={( GRID_SIZE * GRID_SIZE ) - this.state.on} />
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
    <Game />
);

//////////////////////////////////////////////////////////////////////
// Render the app.
ReactDOM.render(
  <App />,
  document.getElementById( "root" )
);
