import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 

function Square(props){
  let cor = null;
  if (props.value === 'X'){
      {cor = 'blue'};
  }else{
      {cor = 'red'};
  }    
  return(
    <button className="square" style={{color:cor}} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  reset = () => {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
    })
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    if(calculaWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  } 

  renderSquare(i) {
    return(
      <Square
          value = {this.state.squares[i]}
          onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculaWinner(this.state.squares);
    let status;
    if(winner){
        if(winner === 'Velha'){
          status = 'VELHA!!';
        }else{
          status = 'Vencedor: '+ winner;
        }
    }else{
      status = 'Próxima Jogada: '+(this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>  
        <button 
              onClick={this.reset}
              style={{border:"0", 
                      width:"162px",
                      "border-radius": "4px",
                      height:"30px", 
                      background:"#0099ff",
                      color:"#FFF"}}>
                REINICIAR
        </button>
      </div>
    );
  }
}

class Game extends React.Component {
 
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />  
        </div>
      </div>
    );
  }
}
  
function calculaWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]

  for(let i=0; i < lines.length; i++){
    const[a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] & squares[a] === squares[c]){
      return squares[a];
    }
  }
  if(!squares.includes(null)) return "Velha";
  return null;
}
  
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);