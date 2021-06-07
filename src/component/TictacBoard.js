import React, {Component} from 'react';
import styles from './TictacBoard.css';



class TictacBoard extends Component {
    initialState = {
        currentPlayer : 0,
        value : {
            '00' : '',
            '01' : '',
            '02' : '',
            '10' : '',
            '11' : '',
            '12' : '',
            '20' : '',
            '21' : '',
            '22' : ''
        },
        winner : ''
    };
    state = this.initialState;
    winnerDivStyles = styles.winner + ',' + styles.noDisplay;
    playAgainStyles = styles.noDisplay;
    boardItems = [];
    createBoardDivs() {
        this.boardItems  = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let key = i.toString() + j.toString();
                this.boardItems.push(<div xaxis={i} yaxis={j} key={i.toString() + j.toString()}
                                          onClick={this.showValue}>{this.state.value[key]}</div>);
            }
        }
        return this.boardItems;
    }

    showValue = (event) => {

        let xAxis = event.target.getAttribute("xaxis");
        let yAxis = event.target.getAttribute("yaxis");
        let keyToChange = xAxis + yAxis;

        const newValue = {...this.state.value};
        newValue[keyToChange] = this.state.currentPlayer ? '0' : '1';
        this.setState((prevState) => {
            return {
                currentPlayer: prevState.currentPlayer ? 0 : 1,
                value: newValue
            }
        });
        this.checkWinner(xAxis, yAxis, newValue[keyToChange], newValue);
    };
    checkWinner(xAxis, yAxis, currentValue, values) {
        let allValues = {...values};
        let currentX = Number.parseInt(xAxis);
        let currentY = Number.parseInt(yAxis);
        let won = true;
        let x = 0, y = 0;
        while(x >= 0 && x < 3) {
            if(allValues[x.toString() + yAxis] !== currentValue) {
                won = false;
                break;
            }
            x++;
        }
        if(!won) {
            won = true;
            while(y >= 0 && y < 3) {
                if(allValues[xAxis + y.toString()] !== currentValue) {
                    won = false;
                    break;
                }
                y++
            }

        }
        if(!won && xAxis === yAxis) {
            won = true;
            x = 0;
            y = 0;
            while(x < 3 && y < 3) {
                if(allValues[x.toString() + y.toString()] !== currentValue) {
                    won = false;
                    break;
                }
                x++;
                y++;
            }
        }
        if(!won && (currentX + currentY === 2)) {
            won = true;
          for(let i = 0; i < 3; i++) {
              for(let j = 0; j < 3; j++) {
                  if(i + j === 2) {
                      if(allValues[i.toString() + j.toString()] !== currentValue) {
                          won = false;
                          break;
                      }
                  }
              }
          }
        }
        if(won) {
            this.setState({winner : `The winner of this game is ${currentValue}`});
            this.winnerDivStyles = styles.winner;
            this.playAgainStyles = "";
        }


    }
    resetBoard = () => {
       this.setState(this.initialState);
       this.winnerDivStyles = styles.winner + ',' + styles.noDisplay;
       this.playAgainStyles = styles.noDisplay;
    }

    render() {
        return (
            <React.Fragment>
                <div className={styles.container}>
                    {this.createBoardDivs()}
                </div>
                <div className={this.winnerDivStyles}>{this.state.winner}</div>
                <button className={this.playAgainStyles} onClick={this.resetBoard}>Play again?</button>
            </React.Fragment>

        );
    }

}

export default TictacBoard;
