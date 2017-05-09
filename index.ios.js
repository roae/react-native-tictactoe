/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

function Square(props){
  return(
    <TouchableHighlight style={styles.button} onPress={props.onPress}>
      <Text style={styles.mark}>{ props.value }</Text>
    </TouchableHighlight>
  );
}

class Board extends Component{
  renderSquare(i){
    return <Square value={this.props.squares[i]} onPress={() => this.props.onPress(i)} />
  }

  render(){  
    return(
      <View>
        <View style={styles.row}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>
        <View style={styles.row}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>
        <View style={styles.row}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </View>
      </View>
    )
  }
}

export default class Game extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  jumpTo(move){
    this.setState({
      stepNumber: move,
      xIsNext: (move % 2) ? false : true,
    })
  }

  handlePress(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if(calculateWinner(squares) || squares[i]){
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner  = calculateWinner(current.squares);
    const moves   = history.map((step, move) => {
      const desc = move ? `Move # ${move}` : "Game Start";

      return(
        <Text key={move} onPress={() => this.jumpTo(move)}>{desc}</Text>
      );
    });
    let   player  = (this.state.xIsNext) ? "X" : "O";
    let   status;

    if(winner){
      status = `Winner: ${winner}`;
    }else{
      status = `Next player: ${player}`;
    }

    return (
      <View style={styles.wrapper}>
        <View>
          <Board squares={current.squares} onPress={(i) => this.handlePress(i)} />
        </View>
        <View>
          <Text style={styles.status}>{status}</Text>
          <View>
            {moves}
          </View>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  status: {
    marginBottom: 10,
    textAlign: "center"
  },
  row: {
    flexDirection: "row",
  },
  button: {
    borderWidth: 1,
    borderColor: "#000",
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  mark: {
    fontSize: 50,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: ("bold")
  }
});

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

AppRegistry.registerComponent('Game', () => Game);
