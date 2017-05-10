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
  constructor(props) {
    super(props);
  
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  handlePress(i){
    const squares = this.state.squares.slice();

    if(calculateWinner(squares) || squares[i]){
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i){
    return <Square value={this.state.squares[i]} onPress={() => this.handlePress(i)} />
  }

  render(){
    const winner  = calculateWinner(this.state.squares);
    let   player  = (this.state.xIsNext) ? "X" : "O";
    let   status;

    if(winner){
      status = `Winner: ${winner}`;
    }else{
      status = `Next player: ${player}`;
    }

    return(
      <View>
        <Text style={styles.status}>{status}</Text>
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
  render() {
    return (
      <View style={styles.wrapper}>
        <View>
          <Board />
        </View>
        <View>
          
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
